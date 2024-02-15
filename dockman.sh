#!/bin/bash
set -e

usage () {
    echo
    echo "usage:  dockman.sh [options] [command] [parameters]"
    echo
    echo "options:"
    echo "    -d, --debug    Debug this shell script an any shell scripts invoked by this one."
    echo "    -h, --help     Show command usage."
    echo
    echo "commands:"
    echo "    b, build       Builds project containers into Docker images. This acts on all containers if the service parameter is not specified."
    echo "    d, down        Powers down containers and removes volumes. This acts on all containers if the service parameter is not specified."
    echo "    k, kill        Kills all Docker containers running on the system."
    echo "    p, purge       Removes all Docker containers and images from the system."
    echo "    p, prune       Removes all dangling Docker images, networks, volumes, etc. from the system."
    echo "    s, stop        Stops all running containers"
    echo "    u, up          Spins up containers. This acts on all containers if the service parameter is not specified."
    echo
    echo "parameters:"
    echo "    s, service  Specify the docker service to apply commands to."
    echo
    echo "----------------------------------------------------------------"
    echo
}

commands=()
options=()
parameters=()
while [[ ${#} -gt 0 ]]; do
    if [[ ${1} == "-"* ]] || [[ ${1} == "--"* ]]; then
        options+=(${1})
    elif [[ ${1} == *"="* ]]; then
        parameters+=(${1})
    else
        commands+=(${1})
    fi
    shift
done

process_options () {
    for option in ${options[@]}; do
        case ${option} in
            -d | --debug )
                export PS4='+(${BASH_SOURCE}:${LINENO}): ${FUNCNAME[0]:+${FUNCNAME[0]}(): }'
                set -ex
            ;;

            -h | --help )
                usage
                exit
            ;;
        esac
    done
}

process_parameters () {
    for parameter in ${parameters[@]}; do
        case ${parameter} in
            s=* | service=* )
                service="${parameter#*=}"
            ;;
        esac
    done
}

set_environment_variables () {
    if [ -f .env ]
    then
        export $(cat .env | sed 's/#.*//g' | xargs)
    fi
}

process_options
process_parameters
set_environment_variables


build_containers () {
    echo "Building containers"
    docker compose build
    if [[ -z ${1} ]]; then
        docker compose build
    else
        docker compose build ${1}
    fi
}

down_containers () {
    echo "Downing containers"
    if [[ -z ${1} ]]; then
        docker compose down --volumes
    else
        docker-compose rm -s -v ${1} <<< "y"
    fi
}

kill_containers() {
    containers=$(docker ps -a -q)
    if [[ ${containers} != "" ]]; then
        echo "Killing containers"
        docker kill $(docker ps -q)
    else
        echo "No containers to kill"
    fi
}

prune_docker() {
    docker system prune -f -a
    docker system prune -f -a --volumes
}

remove_containers() {
    containers=$(docker ps -a -q)
    if [[ ${containers} != "" ]]; then
        echo "Removing containers"
        docker rm -f ${containers}
    else
        echo "No containers to remove"
    fi
}

remove_images() {
    images=$(docker images -a -q)
    if [[ ${images} != "" ]]; then
        echo "Removing images"
        docker rmi -f ${images} 2> /dev/null
    else
        echo "No images to remove"
    fi
}

stop_containers () {
    containers=$(docker ps -q)
    if [[ ${containers} != "" ]]; then
        echo "Stopping containers"
        docker stop ${containers}
    else
        echo "No containers to stop"
    fi
}

up_containers () {
    echo "Upping containers"
    if [[ -z ${1} ]]; then
        docker compose up <<< "y"
    else
        docker compose up ${1} <<< "y"
    fi
}


if [[ ${#commands[@]} -eq 0 ]]; then
    usage
    echo "No commands found"
    echo
    exit
fi

case ${commands[0]} in
    b | build )
        build_containers ${service}
    ;;

    d | down )
        down_containers ${service}
    ;;

    k | kill )
        kill_containers
    ;;

    p | purge )
        stop_containers
        remove_containers
        remove_images
        prune_docker
    ;;

    p | prune )
        stop_containers
        prune_docker
    ;;

    s | stop )
        stop_containers
    ;;

    u | up )
        down_containers ${service}
        up_containers ${service}
    ;;

    * )
        usage
        echo "${commands[0]} is not a valid command"
        echo
        exit
    ;;
esac

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import dts from 'rollup-plugin-dts';
import css from 'rollup-plugin-import-css';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/components/index.ts',
    output: [
      // {
      //   dir: './dist/cjs/components/',
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      {
        dir: './dist/esm/components/',
        format: 'esm',
        sourcemap: true,
        // preserveModules: true,
        // preserveModulesRoot: 'src/components',
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      resolve(),
      json(),
      svgr(),
      css(),
      vanillaExtractPlugin(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      // terser(),
    ],
  },
  {
    input: 'src/theme/index.ts',
    output: [
      // {
      //   dir: './dist/cjs/theme/',
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      {
        dir: './dist/esm/theme/',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      resolve(),
      json(),
      css(),
      vanillaExtractPlugin(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      // terser(),
    ],
  },
  {
    input: 'src/components/index.ts',
    output: [{ file: 'dist/types/components.d.ts', format: 'es' }],
    plugins: [svgr(), typescript({ tsconfig: './tsconfig.json' }), dts()],
  },
  {
    input: 'src/theme/index.ts',
    output: [{ file: 'dist/types/theme.d.ts', format: 'es' }],
    plugins: [typescript({ tsconfig: './tsconfig.json' }), dts()],
  },
];

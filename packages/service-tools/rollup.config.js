import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import terser from '@rollup/plugin-terser';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      // {
      //   file: packageJson.exports['.'].require,
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      {
        file: packageJson.exports['.'].import,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      resolve(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      // terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [typescript({ tsconfig: './tsconfig.json' }), dts()],
  },
];

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import babel from "rollup-plugin-babel";
// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/utils.js",
      format: "cjs", // immediately-invoked function expression — suitable for <script> tags
      exports: "named"
    },
    {
      file: `dist/utils.es.js`,
      format: "esm"
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    babel({
      exclude: "node_modules/**"
    }),
    production && terser() // minify, but only in production
  ]
};
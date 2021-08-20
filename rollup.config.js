// https://codesandbox.io/s/171hk?file=/rollup.config.js:205-212

// Universal
import path from "path";

// JS
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import alias from "@rollup/plugin-alias";
import nodeResolve  from "@rollup/plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';

// Serve
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// SCSS
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const projectRoot = path.resolve(__dirname, ".");

export default {
  input: './src/js/index.ts',
  output: {
    file: './www/js/bundle.esm.js',
    format: 'esm',
    // format: 'cjs',
    // sourcemap: true
  },
  plugins: [
    typescript(),
    //  https://github.com/thgh/rollup-plugin-scss
    scss({
      processor: () => postcss([autoprefixer()]),
      // includePaths: [
      //   path.join(__dirname, '../../node_modules/'),
      //   'node_modules/'
      // ],
      output: './www/css/bundle.css',
    }),
    alias({
      '@': __dirname + '/src/main'
    }),
    // alias({
    //   entries: [
    //     {
    //       find: "@",
    //       replacement: `${path.resolve(projectRoot, "src")}`
    //     }
    //   ],
    //   customResolver: resolve({
    //     extensions: [".js", ".jsx", ".vue"]
    //   })
    // }),
    vuePlugin({
      target: 'browser',
      // compileTemplate: true, // Explicitly convert template to render function
      // defaultLang: { script: 'ts' },
    }),
    nodeResolve(),
    commonjs(),
    // babel({
    //   exclude: 'node_modules/**',
    //   extensions: ['.js', '.jsx', '.vue'],
    //   babelHelpers: 'runtime'
    //   // babelHelpers: 'bundled'
    // }),
    // replace({
    //   // 'include': './src/main.js',
    //   'preventAssignment': true,
    //   // 'process.env.NODE_ENV': JSON.stringify( 'production' )
    //   // 'process.env.NODE_ENV': JSON.stringify( production ? 'production' : 'development' ),
    // }),

    !production && serve({
      contentBase: 'www',
      host: 'localhost',
      port: 3000,
      open: true,
    }),
    !production && livereload(),
    // minify, but only in production
    production && terser()
  ],
  watch: {
    include: [
      './src/**/*',
      './www/**/*'
    ],
  }
}

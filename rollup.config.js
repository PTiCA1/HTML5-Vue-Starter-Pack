import path from 'path'
import del from 'rollup-plugin-delete'

// JS
import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

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

export default {
  input: './src/js/main.js',
  output: {
    file: './www/js/bundle.esm.js',
    format: 'esm',
    sourcemap: !production
  },
  plugins: [
    del({ targets: [
      'www/css/*',
      'www/js/*',
      'www/img/*'
    ] }),

    // https://www.npmjs.com/package/rollup-plugin-scss
    scss({
      output: './www/css/bundle.css',
      outputStyle: production ? 'compressed' : null,
      sourceMap: !production,
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/'
      ]
    }),

    replace({
      'process.env.NODE_ENV': JSON.stringify( production ? 'production' : 'development' ),
      'preventAssignment': true
    }),

    vue(),

    babel({ babelHelpers: 'bundled' }),

    nodeResolve(),

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

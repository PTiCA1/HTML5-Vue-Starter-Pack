import path from 'path'
import del from 'rollup-plugin-delete'

// JS
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
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
import stylelint from 'rollup-plugin-stylelint';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/scripts/main.ts',
  output: {
    file: './www/js/bundle.esm.js',
    format: 'esm',
    sourcemap: !production,
    plugins: production && [terser()]
  },
  plugins: [
    del({ targets: [
      'www/css/*',
      'www/js/*',
      'www/img/*'
    ] }),
    alias({
      entries: [
        { find: '@', replacement: __dirname + '/src/scripts' },
        { find: '@@', replacement: __dirname + '/src/' },
        { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
      ]
    }),
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
    stylelint({
      plugins: [
        "stylelint-scss"
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( production ? 'production' : 'development' ),
      'preventAssignment': true,
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false,
    }),
    vue(),
    resolve(),
    babel({
      babelHelpers: 'bundled' ,
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    !production && serve({
      contentBase: 'www',
      host: 'localhost',
      port: 3000,
      open: true,
    }),
    !production && livereload(),
    // minify and clean, but only in production
    production && [strip()],
  ],
  watch: {
    include: [
      './src/**/*',
      './www/**/*'
    ],
  }
}

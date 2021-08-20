// https://codesandbox.io/s/171hk?file=/rollup.config.js:205-212


// JS
import { terser } from 'rollup-plugin-terser';

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
    // sourcemap: true
  },
  plugins: [
    //  https://github.com/thgh/rollup-plugin-scss
    scss({
      processor: () => postcss([autoprefixer()]),
      // includePaths: [
      //   path.join(__dirname, '../../node_modules/'),
      //   'node_modules/'
      // ],
      output: './www/css/bundle.css',
    }),

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

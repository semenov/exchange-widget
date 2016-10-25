import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


export default {
    entry: 'src/main.js',
    dest: 'dist/bundle.js',
    plugins: [
        babel(),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
            extensions: [ '.js', '.json' ],
            preferBuiltins: false

        }),
        commonjs()
    ],
    format: 'iife'
};

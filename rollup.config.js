import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // Node Module
    {
        input:   './src/index.js',
        output:  {
            file:    './dist/index.js',
            format:  'cjs',
            name:    'LoaderIO',
            exports: 'named',
        },
        plugins: [
            resolve(),
            commonjs(),
        ]
    },
];

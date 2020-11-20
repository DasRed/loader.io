import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {terser} from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';

const babelOptionsES5 = {
    babelHelpers: 'runtime',
    babelrc:      false,
    presets:      [
        [
            "@babel/env",
            {
                targets:     '> 0.25%, not dead, ie 11',
                useBuiltIns: 'usage',
                corejs:      3,
            }
        ]
    ],
    exclude:      [/\/core-js\//],
    plugins:      [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-transform-runtime',
            {useESModules: true},
        ],
    ],
};

const babelOptionsES2018 = {
    babelHelpers: 'bundled',
    babelrc:      false,
    plugins:      [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-class-properties',
    ],
};

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // ES2015 Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/index.min.js',
            format:    'iife',
            name:      'LoaderIO',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            commonjs(),
            clear({targets: ['./dist']}),
            babel(babelOptionsES5),
            terser(),
        ]
    },
    // ES2015 None-Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/index.js',
            format:    'iife',
            name:      'LoaderIO',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(babelOptionsES5),
        ]
    },
    // ES Modules Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/index.esm.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(babelOptionsES2018),
            terser(),
        ]
    },
    // ES Modules None-Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/index.esm.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(babelOptionsES2018),
        ]
    },
    // Node Module
    {
        input:   './src/index.js',
        output:  {
            file:    './dist/index.cjs.js',
            format:  'cjs',
            name:    'LoaderIO',
            exports: 'default',
        },
        plugins: [
            resolve(),
            commonjs(),
        ]
    },
];

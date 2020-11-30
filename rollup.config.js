import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import {builtinModules} from 'module';
import {dependencies} from './package.json';

export default [
    {
        input:    './src/index.js',
        output:   {
            dir:                 './dist/',
            format:              'cjs',
            exports:             'named',
            sourcemap:           false,
            preserveModules:     true,
            preserveModulesRoot: 'src',
        },
        external: [...builtinModules, ...Object.keys(dependencies)],
        plugins:  [
            clear({targets: ['./dist/']}),
            copy({
                targets: [
                    {
                        src:  './src/index.d.ts',
                        dest: './dist'
                    },
                ]
            })
        ]
    },
];

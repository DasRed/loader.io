import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import {builtinModules} from 'module';
import {dependencies} from './package.json';

export default {
    input:    './src/index.js',
    output:   [
        {
            file:    './dist/index.cjs',
            format:  'cjs',
            exports: 'named',
        },
        {
            file:    './dist/index.mjs',
            format:  'es',
            exports: 'named',
        },
    ],
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
        }),
    ]
};

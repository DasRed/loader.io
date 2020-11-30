import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'

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
        external: ['node-fetch', 'qs'],
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

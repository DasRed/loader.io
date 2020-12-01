import clear from 'rollup-plugin-clear';
import es2cjs from 'rollup-es2cjs-fix';
import {builtinModules} from 'module';
import {dependencies} from './package.json';

export default {
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
        es2cjs(),
    ]
};

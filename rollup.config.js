import clear from 'rollup-plugin-clear'
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
        {
            renderChunk: function (source) {
                const matches = /(exports(?:\['default']|\.default)) = (.*);/gi.exec(source);
                if (matches) {
                    const pos = source.indexOf('exports.');

                    source = source.substring(0, pos) + `module.exports = exports = ${matches[2]};\n\n` + source.substring(pos);
                }
                return source;
            }
        },
    ]
};

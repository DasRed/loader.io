import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import {builtinModules} from 'module';
import {dependencies} from './package.json';
import babel from '@rollup/plugin-babel';

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
        //babel({babelHelpers: 'bundled'}),
        //{
        //    renderChunk: function (source) {
        //        const lines = source.split('\n');
        //        for (let i = 0; i < lines.length; i++) {
        //            const line    = lines[i];
        //            const matches = /^(exports(?:\['default']|\.default)) = (.*);$/.exec(line);
        //            if (matches) {
        //                lines[i] = 'module.exports = exports = ' + matches[2] + ';\n' +
        //                    'Object.defineProperty(exports, "__esModule", { value: true });\n' +
        //                    matches[1] + ' = exports;';
        //                break;
        //            }
        //        }
        //        return lines.join('\n');
        //    }
        //}
    ]
};

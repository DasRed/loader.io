export default [
    {
        input:  './src/index.js',
        output: {
            dir:                 './dist/',
            format:              'cjs',
            exports:             'named',
            sourcemap:           false,
            preserveModules:     true,
            preserveModulesRoot: 'src',
        }
    },
    //{
    //    input:  './src/index.js',
    //    output: {
    //        file:      './dist/index.js',
    //        format:    'cjs',
    //        name:      'LoaderIO',
    //        exports:   'named',
    //        sourcemap: false,
    //    }
    //},
];

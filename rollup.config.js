import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.mjs',
    output: {
        file: 'dist/server.js',
        format: 'cjs'
    },
    external: [
        'fs',
        'telegraf/context.js',
        ...Object.keys(require('./package.json').dependencies)
    ],
    plugins: [
        commonjs(),
    ],
};

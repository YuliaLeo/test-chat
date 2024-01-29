const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: "none",
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'module',
    },
    experiments: {
        outputModule: true,
    },
};
const path = require('path');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // development: Output SourceMap.
    // production:  Optimisation.
    mode: 'development',

    context: src, //TODO:何か調べる
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: dist,  // Directory Name.
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: [
                    'ts-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ]
    },
    devServer: {
        contentBase: dist,
        inline: true,
        hot: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.html'),
          filename: 'index.html',
          inject: 'body' //TODO:何か調べる
        })
    ]
};

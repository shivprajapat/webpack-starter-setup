const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DEFAULT_DEV_SERVER_PROXY_TARGET = 'https://jjaann.co.kr';

const DEV_SERVER_PROXY_TARGET = process.env.WEBPACK_DEV_SERVER_PROXY_TARGET || DEFAULT_DEV_SERVER_PROXY_TARGET;

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash   ].js'
    },
    // 

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        server: {
            type: 'https',
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        allowedHosts: 'all',
        static: __dirname,
        client: {
            logging: 'warn',
        },
        proxy: {
            '/': {
                secure: false,
                target: DEV_SERVER_PROXY_TARGET,
                headers: {
                    Host: new URL(DEV_SERVER_PROXY_TARGET).host,
                },
            },
        }
    },
    // 
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack App",
            filename: "index.html",
            template: "src/template.html"
        })
    ]
}

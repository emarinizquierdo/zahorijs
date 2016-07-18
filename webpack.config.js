var resolve = require('path').resolve
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {

    if (env.admin) {

        return {
            entry: './admin/index.js',
            output: {
                filename: 'zahorijs.editor.js',
                path: resolve(__dirname, 'dist/editor')
            },
            plugins: [
                new webpack.ProvidePlugin({
                    riot: 'riot'
                }),
                new ExtractTextPlugin("main.editor.css", {
                    allChunks: true
                })
            ],
            module: {
                loaders: [{
                    test: /\.html$/,
                    loader: "html"
                }, {
                    test: /\.tag$/,
                    loader: 'riotjs-loader'
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                }]
            },

            stats: {
                // Configure the console output
                colors: false,
                modules: true,
                reasons: true
            },

            failOnError: false, // don't report error to grunt if webpack find errors
            // Use this if webpack errors are tolerable and grunt should continue

            watch: true, // use webpacks watcher
            // You need to keep the grunt process alive

            keepalive: true, // don't finish the grunt task
            // Use this in combination with the watch option

            inline: true // embed the webpack-dev-server runtime into the bundle
                // Defaults to false
        }

    } else {
        return {
            entry: {
                library: './library/js/app.js',
                app: './app/js/app.js'
            },
            output: {
                filename: '[name]/app.js',
                path: resolve(__dirname, 'dist'),
                pathinfo: !env.prod,
            },
            context: resolve(__dirname, 'src'),
            devtool: env.prod ? 'source-map' : 'eval',
            bail: env.prod,
            plugins: [
                new webpack.ProvidePlugin({
                    riot: 'riot'
                }),
                new ExtractTextPlugin("main.editor.css", {
                    allChunks: true
                })
            ],
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                }, {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }, {
                    test: /\.css$/,
                    loader: 'style!css'
                }, {
                    test: /\.html$/,
                    loader: "html"
                }, {
                    test: /\.tag$/,
                    loader: 'riotjs-loader'
                }]
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            devServer: {
                proxy: {
                    '/api': {
                        target: 'http://localhost:3000',
                    },
                    '/auth': {
                        target: 'http://localhost:3000'
                    }
                },
                historyApiFallback: {
                    index: '/src/index.html',
                    rewrites: [{
                        from: /^((?!editor).)*$/,
                        to: '/index.html'
                    }]
                }
            }
        }
    }
}

const webpack = require('webpack');
const project = require('./project.config');
const {appEntry} = require('./paths')
const APP_PUBLIC_PATH = project.client.basePath;
const { manifestPlugin, SASS_LOADER, CSS_LOADER, POSTCSS_LOADER } = require("./webpack.modules");


module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'web',
    entry: [
        '@babel/polyfill',
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=${APP_PUBLIC_PATH}__hot_reload&reload=true`,
        appEntry
    ],
    output: {
        filename: 'js/[name].[hash].js',
        path: project.paths.public(),
        publicPath: APP_PUBLIC_PATH
    },

    resolve: {
        modules: [
            'node_modules',
            project.paths.base()
        ],
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // Allows to compile the client code in development when there are ts errors
                    transpileOnly: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    CSS_LOADER,
                    POSTCSS_LOADER,
                    'resolve-url-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    CSS_LOADER,
                    POSTCSS_LOADER,
                    'resolve-url-loader',
                    SASS_LOADER
                ]
            },
            {
                test: /\.woff(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.woff2(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/font-woff2'
                    }
                }
            },
            {
                test: /\.otf(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.ttf(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            {
                test: /\.eot(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.svg(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: 10000,
                        mimetype: 'image/svg+xml'
                    }
                }
            },
            {
                test: /\.(png|jpg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: 10000
                    }
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: ['graphql-tag/loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        manifestPlugin
    ]
};

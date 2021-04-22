import express from 'express';
import compress from 'compression';
import webpackConfig from '../config/webpack.config';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import schema from './schema/schema'
import resolvers from './resolvers'
import { assets, clientRenderer, localeMiddleware, scriptIdMiddleware } from './middleware';
import { health, locale } from './routes';
import { logger } from './lib';
import { ApolloServer } from 'apollo-server-express'
import helmet from 'helmet';
import * as uuid from 'uuid';
import { __DEV__, BASE_CSP_HEADERS, CACHE_AGE } from "./config/server.config";
import path from 'path';
const paths = require('../config/paths')

export default function startServer() {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        tracing: __DEV__,
        plugins: [
            responseCachePlugin()
        ],
        cacheControl: {
            defaultMaxAge: CACHE_AGE,
        },
        context: () => ({})
    })

    const webpackCompiler = webpack(webpackConfig as Configuration);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require('../config/project.config');
    const app = express();

    app.disable('etag');

    app.set('views', paths.appPublic);

    Object.assign(app.locals, config.globals, config.server.templateLocals);

    const id = uuid.v4()

    app.use(compress());

    app.set('view engine', 'pug');

    // Sets the uri of the GraphQL endpoint
    server.applyMiddleware({ app, path: '/v1/api' })

    if(__DEV__) {
        logger.info('Enabling webpack dev and hot reloading middleware.');

        app.use(webpackDevMiddleware(webpackCompiler, {
            publicPath: config.client.basePath
        }));

        app.use(webpackHotMiddleware(webpackCompiler, {
            path: '/__hot_reload'
        }));

        const assetsMiddleware = assets({ webpackCompiler });

        app.use(assetsMiddleware)
        app.use(express.static(paths.appPublic));
    } else {
        app.use(scriptIdMiddleware(id))

        app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    ...BASE_CSP_HEADERS,
                    scriptSrcElem: `\'nonce-${id}\'`,
                }
            }
        }));

        app.use(express.static(paths.appBuild))
        app.use(assets())
    }

    app.use('/assets', express.static(path.join(paths.serverPath, 'assets')))
    app.get('/locale', locale)
    app.get('/health', health)

    app.use('*', localeMiddleware)
    app.use('*', clientRenderer);

    app.listen(config.server.port)
}


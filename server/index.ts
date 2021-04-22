import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import server from './server';
import { logger } from './lib';
import { __DEV__ } from './config/server.config';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const project = require('../config/project.config');

if(__DEV__) {
    logger.info('Running app in DEV mode');
    server();
    logger.info(`Server is now running at http://${ project.server.host }:${ project.server.port }.`);
    logger.info('Wait for webpack-dev-middleware to build client...')
} else {
    logger.info('Running app in PRODUCTION mode');
    server();
    logger.info(`Server is now running at http://${ project.server.host }:${ project.server.port }.`);
}







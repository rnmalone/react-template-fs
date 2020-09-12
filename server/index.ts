const debug = require('debug')('app:bin:server');
const project = require('../config/project.config');
import server from './server';

console.log('hello')

server.listen(project.server.port);

debug(`server is now running at http://${project.server.host}:${project.server.port}.`);

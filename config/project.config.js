require('dotenv').config();

const path = require('path');

// ===================================================================
// Default Configuration
// ===================================================================
const config = {
    env: 'development',

    // Seed mock database entries on startup
    seedData: process.env.SEED_DATA || false,
    // Add seed data on every server reload
    forceSeed: false,

    // -------------------------------------
    // Project dirs structure
    // -------------------------------------
    dirs: {
        config: __dirname.split(path.sep).pop(), // Current dir name
        client: 'client',
        public: 'public',
        server: 'server',
        resources: 'resources',
        logs: 'logs',
    },

    // -------------------------------------
    // Client configuration
    // -------------------------------------
    client: {
        // APP Base Path WITH leading AND ending slash
        basePath: process.env.BASE_PATH || '/',
        supportedBrowsers: ['> 1%', 'last 2 versions', 'not ie <=10', 'ie 11', 'Firefox ESR'],
        metaDescription: 'My template app'
    },

    // -------------------------------------
    // Server configuration
    // -------------------------------------
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,

        publicAddress: process.env.HOST || 'localhost',

        apiBaseUri: process.env.API_BASE_PATH || '/v1/api',
        localeUrl: process.env.LOCALE_URL || '/locale',

        templateLocals: {
            title: 'Template'
        }
    },


    // -------------------------------------
    // Build configuration
    // -------------------------------------
    build: {
        sourceMap: true,
        hashType: 'hash'
    }
};



config.server.templateLocals.basePath = config.client.basePath;

// -------------------------------------
// Path utilities
// -------------------------------------
const basePath = path.resolve(__dirname, process.env.NODE_ENV !== 'development' ? '..' : '', '..');

function getPath(...args) {
    return path.resolve(basePath, ...args);
}

config.paths = {
    base: getPath,
    config: getPath.bind(null, config.dirs.config),
    client: getPath.bind(null, config.dirs.client),
    public: getPath.bind(null, config.dirs.public),
    server: getPath.bind(null, config.dirs.server),
    logs: getPath.bind(null, config.dirs.logs),
    resources: getPath.bind(null, config.dirs.resources)
};

// -------------------------------------
// URL utilities
// -------------------------------------
function getUri(uri) {
    return uri.startsWith('/') ? uri.slice(1) : uri;
}

config.server.url = function url(uri = '/') {
    const {
        server: {secure, host, port},
        client: {basePath: clientBasePath}
    } = config;

    return `${secure ? 'https' : 'http'}://${host}:${port}${clientBasePath}${getUri(uri)}`;
};

config.server.publicUrl = function url(uri = '/') {
    const {server: {port, publicAddress, secure}} = config;

    return `${secure ? 'https' : 'http'}://${publicAddress}:${port}/${getUri(uri)}`;
};

module.exports = config;

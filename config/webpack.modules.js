const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');
const config = require('./project.config');

// Generate an asset manifest file with the following content:
// - "files" key: Mapping of all asset filenames to their corresponding
//   output file so that tools can pick it up without having to parse
//   `index.html`
// - "entrypoints" key: Array of files which are included in `index.html`,
//   can be used to reconstruct the HTML if necessary
const manifestPlugin = new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: paths.appPublic,
    generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
        );

        return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
        };
    },
})

const SASS_LOADER = {
    loader: 'sass-loader',
    options: {
        sourceMap: config.build.sourceMap,
        sassOptions: {
            includePaths: [
                paths.appStyles
            ]
        }
    }
};

const CSS_LOADER = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        importLoaders: 1
    }
};

const POSTCSS_LOADER = {
    // Necessary for external CSS imports to work
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        plugins: () => [
            require('cssnano')({
                autoprefixer: {
                    add: true,
                    remove: true,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true,
                sourcemap: true
            })
        ]
    }
};


module.exports = {
    manifestPlugin,
    SASS_LOADER,
    POSTCSS_LOADER,
    CSS_LOADER
}
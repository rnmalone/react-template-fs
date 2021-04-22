import { NextFunction, Request, Response } from 'express';
import path from "path";
import fs from "fs";
import { logger } from "../lib";
import {Compiler} from 'webpack';
const paths = require('../../config/paths')


export interface IAssetMiddlewareConfig {
    webpackCompiler: Compiler,
    assetManifest: string;
}

export interface AssetManifest {
    files: Record<string, string>;
    entrypoints: string[];
}

export interface IAssetsObject {
    js: string[],
    css: string[]
}


const DEFAULT_OPTIONS: Pick<IAssetMiddlewareConfig, 'assetManifest'> = {
    assetManifest: 'asset-manifest.json',
};

const assetEndsWith = (str: string) => (source: string) => source.split('?')[0].endsWith(str); // removing possible version query param before testing

const buildAssetsObjFromAssetInfo = (entrypoints: AssetManifest['entrypoints']): IAssetsObject => {
    return {
        css: entrypoints.filter(assetEndsWith('.css')),
        js: entrypoints.filter(assetEndsWith('.js'))
    };
};

/**
 * Loads the asset manifest. If running in dev is uses the files webpack builds in-memory and in prod uses
 * the static files in the output build folder
 *
 * @param webpackCompiler
 * @param assetManifest
 */
async function loadAssetsFile({
                                  webpackCompiler,
                                  assetManifest
                              }: IAssetMiddlewareConfig) {
    // In dev we need the in memory file system webpack uses
    const fileSystem = webpackCompiler ? webpackCompiler.outputFileSystem : fs;
    const assetsLocation = webpackCompiler?.outputPath || paths.appBuild;
    const assetsPath = path.join(assetsLocation, assetManifest);

    try {
        // @ts-ignore
        const assetsFile = await fileSystem.readFileSync(assetsPath)
        const { entrypoints }: AssetManifest = JSON.parse(assetsFile)

        return entrypoints
    } catch (e) {
        logger.error(`Failed to load asset manifest ${JSON.stringify(e)}`)
        logger.error('Are you sure you ran the client build?')
    }
}

/**
 * Adds the paths of the static files required by the browser onto the response object
 *
 * We use this middleware so we can dynamically serve our static files based on a manifest
 *
 * @param options
 */
export default function assets(options: Partial<IAssetMiddlewareConfig> = Object.create(null)) {
    const config = Object.assign(Object.create(null), DEFAULT_OPTIONS, options);

    return async (req: Request, res: Response, next: NextFunction) => {
        const entrypoints = await loadAssetsFile(config);

        if(!entrypoints) {
            throw new Error('Failed to retrieve entry points from loaded asset manifest file')
        }

        const assets = buildAssetsObjFromAssetInfo(entrypoints)

        // Add the paths to the response object
        // They will be injected into the HTML file
        res.locals.assets = assets

        next()
    }

};



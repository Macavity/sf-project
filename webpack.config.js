const Encore = require('@symfony/webpack-encore');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const dotenvDefault = dotenv.config();
const dotenvLocal = dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });


let envValues = {
    APP_ENV: '',
};

for (const key in dotenvDefault.parsed) {
    if (typeof dotenvLocal.parsed[key] !== 'undefined') {
        envValues[key] = dotenvLocal.parsed[key];
    } else {
        envValues[key] = dotenvDefault.parsed[key];
    }
}

console.log('Build Environment: ' + envValues.APP_ENV);

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(envValues.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('frontend', './assets/frontend/index.tsx')
    .addEntry('admin', './assets/admin/index.tsx')

    // .addEntry('admin', './assets/admin/index.ts')
    .addStyleEntry('styles', './assets/frontend/index.scss')
    .addStyleEntry('login', './assets/styles/login.scss')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    // .configureBabelPresetEnv((config) => {
    //     config.useBuiltIns = 'usage';
    //     config.corejs = 3;
    // })

    .enableSassLoader()
    .enableReactPreset()
    .enableTypeScriptLoader()

    .addAliases({
        'assets': path.resolve(__dirname, 'assets/'),
        // '@/(.*)$': path.resolve(__dirname, 'assets/'),
    })

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    .addPlugin(new webpack.DefinePlugin({
        ADMIN_URL: JSON.stringify(envValues.ADMIN_URL),
        SENTRY_FRONTEND: JSON.stringify(envValues.SENTRY_FRONTEND),
    }))
;

module.exports = Encore.getWebpackConfig();

const path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    }
    , devtool: "#source-map"
    , module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }, resolve: {
        extensions: ['*', '.js']
    }
};
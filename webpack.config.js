"use strict";

var path = require("path"),

    pkg = require("./package.json"),
    
    CSS   = require("modular-css-webpack/plugin"),
    HTML  = require("html-webpack-plugin"),
    Clean = require("clean-webpack-plugin");

module.exports = (env) => ({
    entry : "./src/index.js",

    output : {
        path     : path.resolve("./dist"),
        filename : "./app.js"
    },

    devtool : "cheap-source-map",
    
    module : {
        rules : [
            {
                test : /\.css$/,
                use  : {
                    loader  : "modular-css-webpack/loader",
                    options : {
                        namedExports : false
                    }
                }
            },
            {
                test : /\.js$/,
                use  : "buble-loader"
            }
        ]
    },
    
    plugins : [
        new CSS({
            css  : "./app.css",
        }),

        new HTML({
            title    : `${pkg.description} - v${pkg.version}`,
            template : './src/index.ejs'
        }),

        new Clean([ "./dist" ])
    ],
    
    watchOptions : {
        ignored : /node_modules/
    }
});

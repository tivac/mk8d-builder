"use strict";

var path = require("path"),

    pkg = require("./package.json"),
    
    CSS   = require("modular-css-webpack/plugin"),
    HTML  = require("html-webpack-plugin"),
    Clean = require("clean-webpack-plugin"),
    Copy  = require("copy-webpack-plugin");

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
            css   : "./app.css",
            namer : env === "dist" ? "modular-css-namer" : null,
            done  : env === "dist" ? [
                require("cssnano")()
            ] : []
        }),

        new HTML({
            title    : `${pkg.description} - v${pkg.version}`,
            template : `./src/index.ejs`
        }),

        new Clean([ "./dist" ]),

        new Copy([
            { from : "./src/icons", to : "icons" }
        ])
    ],
    
    watchOptions : {
        ignored : /node_modules/
    }
});

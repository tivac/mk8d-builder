import m from "mithril";

import characters from "../data/characters.json";
import karts from "../data/karts.json";
import tires from "../data/tires.json";
import gliders from "../data/gliders.json";

import state from "./state.js";

import Layout from "./layout.js";
import Grid from "./grid.js";

import "./index.css";

// For debugging
window.state = state;

m.route(document.body, "/character", {
    "/character" : {
        render() {
            return m(Layout,
                m(Grid, {
                    data : characters,
                    key  : "character"
                })
            );
        }
    },

    "/kart" : {
        render() {
            return m(Layout,
                m(Grid, {
                    data : karts,
                    key  : "kart",

                    // Show relative stats instead of absolute
                    relative : true
                })
            );
        }
    },

    "/tire" : {
        render() {
            return m(Layout,
                m(Grid, {
                    data : tires,
                    key  : "tire",

                    // Show relative stats instead of absolute
                    relative : true
                })
            );
        }
    },

    "/glider" : {
        render() {
            return m(Layout,
                m(Grid, {
                    data : gliders,
                    key  : "glider",

                    // Show relative stats instead of absolute
                    relative : true
                })
            );
        }
    }
});

import m from "mithril";

import characters from "../data/characters.json";
import karts from "../data/karts.json";
import tires from "../data/tires.json";
import gliders from "../data/gliders.json";

import state from "./state.js";

import Layout from "./layout.js";
import Grid from "./grid.js";

import css from "./index.css";

// For debugging
window.state = state;

m.route(document.body, "/character", {
    "/character" : {
        render() {
            return m(Layout, { title : "Characters" },
                m(Grid, {
                    data : characters,
                    key  : "character"
                })
            );
        }
    },

    "/kart" : {
        render() {
            return m(Layout, { title : "Karts" },
                m(Grid, {
                    data : karts,
                    key  : "kart"
                })
            );
        }
    },

    "/tire" : {
        render() {
            return m(Layout, { title : "Tires" },
                m(Grid, {
                    data : tires,
                    key  : "tire"
                })
            );
        }
    },

    "/glider" : {
        render() {
            return m(Layout, { title : "Gliders" },
                m(Grid, {
                    data : gliders,
                    key  : "glider"
                })
            );
        }
    }
});

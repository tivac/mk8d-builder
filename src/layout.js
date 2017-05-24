import m from "mithril";

import pkg from "../package.json";

import Nav from "./nav.js";

import css from "./layout.css";

export default function() {
    return {
        view(vnode) {
            return [
                m("h1", { class : css.title }, "Mario Kart 8 Deluxe Calculator",
                    m("span", { class : css.subtitle }, `v${pkg.version}`)
                ),

                m(Nav),

                vnode.children
            ];
        }
    };
}

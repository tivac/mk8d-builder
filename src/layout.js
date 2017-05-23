import m from "mithril";

import pkg from "../package.json";
import meta from "../data/meta.json";
import state from "./state.js";

import Icon from "./icon.js";
import Totals from "./totals.js";

import css from "./layout.css";

export default function() {
    return {
        view(vnode) {
            return [
                m("h1", { class : css.title }, "Mario Kart 8 Deluxe Calculator",
                    m("span", { class : css.subtitle }, `v${pkg.version}`)
                ),

                m("div", { class : css.choices },
                    m("div", { class : css.parts },
                        meta.order.map((type) =>
                            m("a", {
                                    href     : `/${type}`,
                                    oncreate : m.route.link,
                                    class    : css.part
                                },
                                state[type] ?
                                    m(Icon, {
                                        type,
                                        key  : state[type],
                                        icon : state[type]
                                    }) :
                                    m(Icon, {
                                        type : "unselected",
                                        key  : type,
                                        icon : type
                                    })
                            )
                        )
                    ),
                    m(Totals)
                ),

                vnode.children
            ];
        }
    };
}

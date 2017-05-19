import m from "mithril";

import meta from "../data/meta.json";
import state from "./state.js";

import Icon from "./icon.js";

import css from "./layout.css";

export default function() {
    return {
        view(vnode) {
            return [
                m("h1", "Mario Kart 8 Deluxe Calculator"),
                m("h2", vnode.attrs.title),

                m("div", { class : css.choices },
                    meta.order.map((type) =>
                        m("a", {
                                href     : `/${type}`,
                                oncreate : m.route.link,
                                class    : css.choice
                            },
                            state[type] ?
                                m(Icon, {
                                    type,
                                    icon : state[type]
                                }) :
                                type
                        )
                    )
                ),

                vnode.children
            ];
        }
    };
}

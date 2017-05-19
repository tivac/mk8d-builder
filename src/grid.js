import m from "mithril";

import meta from "../data/meta.json";

import Icon from "./icon.js";
import state from "./state.js";

import css from "./grid.css";

export default function Grid(init) {
    var data   = init.attrs.data,
        names  = Object.keys(data),
        dir    = "asc",
        sorts  = [ "Name" ].concat(meta.fields),
        sort;
    
    function resort(field) {
        if(field === sort) {
            dir = (dir === "asc") ? "desc" : "asc";
        } else {
            dir = "asc";
        }

        sort = field;

        names.sort((a, b) => {
            if(field === "Name") {
                return dir === "asc" ?
                    a.localeCompare(b) :
                    b.localeCompare(a);
            }

            return dir === "asc" ?
                data[a][field] - data[b][field] :
                data[b][field] - data[a][field];
        });
    }

    // Initial sort is alpha by name
    resort("Name");

    return {
        view(vnode) {
            return m("div", { class : css.grid },
                
                m("div", { class : css.nav },
                    sorts.map((key) =>
                        m("button", {
                                onclick : () => resort(key)
                            },
                            key,
                            key === sort && (dir === "asc" ? "▲" : "▼")
                        )
                    )
                ),

                m("div", { class : css.items },
                    names.map((name) => {
                        var current = state[vnode.attrs.key] === name;
                        
                        return m("div", {
                                class : current ? css.selected : css.item,
                                key   : name,
                                
                                onclick : () => {
                                    state[vnode.attrs.key] = current ? null : name;
                                }
                            },
                            
                            // m("p", { class : css.name }, key),
                            
                            m("div", { class : css.bd },
                                m("div", { class : css.icon },
                                    m(Icon, {
                                        type  : vnode.attrs.key,
                                        icon  : name,
                                        title : name
                                    })
                                ),
                                
                                m("div", { class : css.details },

                                    meta.fields.map((field) => {
                                        var val = data[name][field],
                                            out = val.toFixed(2);
                                        
                                        return m("div", {
                                                class : css.detail,
                                                title : field
                                            },
                                            m("label", field.slice(0, 1)),
                                            val > 0 ? `+${out}` : out
                                        );
                                    })
                                )
                            )
                        );
                    })
                )
            );
        }
    };
};

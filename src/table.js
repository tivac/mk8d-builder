import m from "mithril";

import state from "./state.js";

import css from "./table.css";

export default function Table(init) {
    var data = init.attrs.data,
        keys = Object.keys(data),
        base = `./icons/${init.attrs.name.toLowerCase()}`,
        dir  = "asc",
        sort;
    
    function resort(col) {
        if(col === sort) {
            dir = (dir === "asc") ? "desc" : "asc";
        }

        sort = col;

        keys.sort((a, b) => {
            if(col === "name") {
                return dir === "asc" ?
                    a.localeCompare(b) :
                    b.localeCompare(a);
            }

            return dir === "asc" ?
                data[a][col] - data[b][col] :
                data[b][col] - data[a][col];
        });
    }

    // Initial sort is alpha by name
    resort("name");

    return {
        view(vnode) {
            return m("div",
                m("h2", vnode.attrs.name),
                m("table", { class : css.table },
                    m("thead",
                        m("tr",
                            m("th", m.trust("&nbsp;")),
                            m("th", { onclick : () => resort("name") }, "Name"),
                            Object.keys(data[keys[0]]).map((key) =>
                                m("th", {
                                    onclick : () => resort(key)
                                }, key)
                            )
                        )
                    ),
                    keys.map((key) => {
                        var style = state[vnode.attrs.key] &&
                                    state[vnode.attrs.key].name &&
                                    state[vnode.attrs.key].name === key ?
                                        css.selected :
                                        null;
                        return m("tr", {
                                class : style,
                                key,
                                onclick : (e) => {
                                    if(state[vnode.attrs.key] && key === state[vnode.attrs.key].name) {
                                        e.redraw = false;
                                        
                                        return;
                                    }

                                    state[vnode.attrs.key] = {
                                        name : key,
                                        data : data[key]
                                    };
                                }
                            },
                            
                            m("td",
                                m("img", {
                                    src : `${base}/${key.toLowerCase().replace(/\W/g, "")}.png`
                                })
                            ),
                            m("td", key),

                            Object.keys(data[key]).map((field) => {
                                var val = data[key][field],
                                    out = val.toFixed(2);
                                
                                return m("td", val > 0 ? `+${out}` : out)
                            })
                        );
                    })
                )
            );
        }
    };
};

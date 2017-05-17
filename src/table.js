import m from "mithril";

import state from "./state.js";

export default function Table() {
    return {
        view(vnode) {
            var data = vnode.attrs.data,
                keys = Object.keys(data);

            return m("div",
                m("h2", vnode.attrs.name),
                m("table",
                    m("thead",
                        m("tr",
                            m("th", "Name"),
                            Object.keys(data[keys[0]]).map((key) => m("th", key))
                        )
                    ),
                    keys.map((key) => {
                        return m("tr", {
                                onclick : (e) => (state[vnode.attrs.key] = { name : key, data : data[key] })
                            },
                            m("td", key),
                            Object.keys(data[key]).map((field) => m("td", data[key][field]))
                        );
                    })
                )
            );
        }
    };
};

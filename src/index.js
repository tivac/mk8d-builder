import m from "mithril";

import characters from "../data/characters.json";
import karts from "../data/karts.json";
import tires from "../data/tires.json";
import gliders from "../data/gliders.json";

var build = {};

function Table() {
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
                                onclick : (e) => (build[vnode.attrs.key] = { name : key, data : data[key] })
                            },
                            m("td", key),
                            Object.keys(data[key]).map((field) => m("td", data[key][field]))
                        );
                    })
                )
            );
        }
    };
}

function Totals() {
    var totals = {},
        choices;
    
    function calculate() {
        choices = Object.keys(build);

        Object.keys(build.char.data).forEach((key) => {
            if(!(key in totals)) {
                totals[key] = 0;
            }

            choices.forEach((choice) => (totals[key] += build[choice].data[key]));
        });
    }

    return {
        oninit   : calculate,
        onupdate : calculate,

        view(vnode) {
            return m("div",
                m("h1", "Build Details"),
                m("table",
                    m("thead",
                        m("tr",
                            m("th", "Choice"),
                            Object.keys(totals).map((key) => m("th", key))
                        )
                    ),
                    m("tbody",
                        choices.map((choice) =>
                            m("tr",
                                m("td", build[choice].name),
                                Object.keys(build[choice].data).map((field) =>
                                    m("td", build[choice].data[field])
                                )
                            )
                        ),
                        m("tr",
                            m("td", "TOTAL"),
                            Object.keys(totals).map((field) => m("td", totals[field]))
                        )
                    )
                )
            );
        }
    }
}

m.mount(document.body, {
    view() {
        return [
            build.char && m(Totals),
            
            m(Table, {
                data : characters,
                name : "Characters",
                key  : "char"
            }),
            m(Table, {
                data : karts,
                name : "Karts",
                key  : "kart"
            }),
            m(Table, {
                data : tires,
                name : "Tires",
                key  : "tire"
            }),
            m(Table, {
                data : gliders,
                name : "Gliders",
                key  : "glider"
            })
        ];
    }
});

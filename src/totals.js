import m from "mithril";

import state from "./state.js";

export default function Totals() {
    var totals = {},
        choices;
    
    function calculate() {
        choices = Object.keys(state);

        Object.keys(state.char.data).forEach((key) => {
            if(!(key in totals)) {
                totals[key] = 0;
            }

            choices.forEach((choice) => (totals[key] += state[choice].data[key]));
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
                                m("td", state[choice].name),
                                Object.keys(state[choice].data).map((field) =>
                                    m("td", state[choice].data[field])
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

import m from "mithril";

import Icon from "./icon.js";
import state from "./state.js";

import css from "./totals.css";

var order = Object.keys(state);

export default function Totals() {
    var totals;
    
    function calculate() {
        totals  = {};

        Object.keys(state.character.data).forEach((key) => {
            if(!(key in totals)) {
                totals[key] = 0;
            }

            order
                .filter((field) => state[field])
                .forEach((field) => (totals[key] += state[field].data[key]));
        });
    }

    return {
        view(vnode) {
            calculate();

            return m("div", { class : css.totals },
                m("div", { class : css.choices },
                    order.map((type) =>
                        state[type] && m(Icon, {
                            type : type,
                            icon : state[type].name,

                            onclick : () => (state[type] = null)
                        })
                    )
                ),
                m("dl",
                    Object.keys(totals).map((field) => [
                        m("dt", field),
                        m("dd", totals[field])
                    ])
                )
            );
        }
    }
}

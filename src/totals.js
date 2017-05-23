import m from "mithril";

import character from "../data/characters.json";
import kart from "../data/karts.json";
import tire from "../data/tires.json";
import glider from "../data/gliders.json";
import meta from "../data/meta.json";

import state from "./state.js";
import Stats from "./stats.js";

import css from "./totals.css";

var items = {
        character,
        kart,
        tire,
        glider
    };

export default function Totals() {
    var totals;
    
    function calculate() {
        totals  = {};

        meta.fields.forEach((key) => {
            if(!(key in totals)) {
                totals[key] = 0;
            }

            meta.order
                .filter((section) => state[section])
                .forEach((section) => (totals[key] += items[section][state[section]][key]));
        });
    }

    return {
        view() {
            calculate();

            return m("div", { class : css.totals },
                m(Stats, { data : totals })
            );
        }
    };
}

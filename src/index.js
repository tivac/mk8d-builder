import m from "mithril";

import characters from "../data/characters.json";
import karts from "../data/karts.json";
import tires from "../data/tires.json";
import gliders from "../data/gliders.json";

import state from "./state.js";
import Table from "./table.js";
import Totals from "./totals.js";

import css from "./index.css";


m.mount(document.body, {
    view() {
        return [
            state.char && m(Totals),
            
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

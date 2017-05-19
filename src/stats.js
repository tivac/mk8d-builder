import m from "mithril";

import meta from "../data/meta.json";
import css from "./stats.css";

export default function() {
    return {
        view(vnode) {
            return m("div", { class : css.stats },
                meta.fields.map((field) => {
                    var val = vnode.attrs.data[field] || 0,
                        out = val.toFixed(2);
                    
                    return m("div", {
                            class : css.stat,
                            title : field
                        },
                        m("label", field.slice(0, 1)),
                        val > 0 ? `+${out}` : out
                    );
                })
            );
        }
    };
};

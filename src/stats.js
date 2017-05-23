import m from "mithril";

import meta from "../data/meta.json";
import css from "./stats.css";

var scale = 0.25;

export default function() {
    return {
        view(vnode) {
            var relative = vnode.attrs.relative;
            
            return m("div", { class : css.stats },
                meta.fields.map((field) => {
                    var val = vnode.attrs.data[field] || 0,
                        out = val;
                        
                    if(val) {
                        out = (relative ? val : (val - 0.75)) / scale;
                    }

                    if(relative) {
                        if(val > 0) {
                            out = `+${out}`;
                        }

                        if(val === 0) {
                            out = ` ${out}`;
                        }
                    } else {
                        if(String(out).length < 2) {
                            out = ` ${out}`;
                        }
                    }

                    return m("div", {
                            class : css.stat,
                            title : `${field} - ${val.toFixed(2)}`
                        },
                        
                        m("label", field.slice(0, 1)),
                        
                        out
                    );
                })
            );
        }
    };
};

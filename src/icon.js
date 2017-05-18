import m from "mithril";

export default function(init) {
    var base = `./icons/${init.attrs.type.toLowerCase()}`;

    return {
        view(vnode) {
            return m("img", Object.assign({
                src : `${base}/${vnode.attrs.icon.toLowerCase().replace(/\W/g, "")}.png`
            }, vnode.attrs.attrs || {}));
        }
    }
}

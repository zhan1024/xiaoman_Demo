import { Vnode } from "./vnode";
import { createRenderer } from "../renderer/renderer"
const renderer = createRenderer()

export const h = (tag: string, props?: Record<any, any>, children?: Vnode | Vnode[] | string): Vnode => {
    const el = renderer.createElement(tag)
    const root = {
        tag,
        children,
        props,
        el
    }
    if (props) {
        for (let key in props) {
            el.setAttribute(key, props[key])
        }
    }

    if (Array.isArray(children)) {
        children.forEach(child => {
            child.el = renderer.createElement(child.tag)
        })
    }
    else if (typeof children === 'object' && children !== null) {
        const el = renderer.createElement(children.tag)
        children.el = el;
        root.children = [children]
    }


    return root as Vnode
}


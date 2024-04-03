import { Vnode } from "./vnode"


const createRenderer = () => {
    const unmount = (vnode: Vnode) => {
        const p = vnode.el.parentNode
        p && p.removeChild(vnode.el)
    }
    const setElementText = (el: HTMLElement, text) => {
        el.textContent = text
    }
    const insert = (el: HTMLElement, parent, anchor = null) => {
        parent.insertBefore(el, anchor)
        //el newNode 插入的新元素
        //anchor 新元素插入的位置 他可以是null 新元素就会插入末尾
        //如果指定了anchor 就会插入他的前面
        //很常用的好用 diff算法也会用到
    }
    const createElement = (tag) => {
        return document.createElement(tag)
    }
    const mountElemt = (vnode: Vnode, container) => {
        const root = createElement(vnode.tag)
        vnode.el = root //挂载的时候顺便把真实的dom添加上去 添加上去就能读到了
        if (typeof vnode.children === 'string') {
            //给元素插入文本就行了
            setElementText(root, vnode.children)
        } else if (Array.isArray(vnode.children)) {
            //在这儿做
            vnode.children.forEach(child => {
                patch(null, child, root)
            })
        }
        insert(root, container)
    }
    const patchElement = (n1, n2) => {
        const el = n2.el = n1.el //复制一份element 给新的Vnode
        patchChildren(n1, n2, el)
    }
    const patchChildren = (n1: Vnode, n2: Vnode, container) => {
        n2.el = n1.el;
        if (typeof n2.children === 'string') {
            //只是文字内容变了
            setElementText(container, n2.children)
        } else if (Array.isArray(n2.children)) {
            //新增或者删除了
            if (Array.isArray(n1.children)) {
                n1.children.forEach(child => unmount(child))
                n2.children.forEach(child => patch(null, child, container))
            } else {
                n2.children.forEach(child => patch(null, child, container))
            }
        }
    }
    const patchKeyChildren = () => {
       //1.手写diff算法 + 最长递增子序列
    }
    const patch = (n1, n2, container) => {
        if (!n1) {
            //挂载
            //console.log('挂载')
            mountElemt(n2, container)
        } else {
            //更新
            patchElement(n1, n2)
            // console.log(n1,n2,'更新')
        }
    }
    const render = (vnode: Vnode, container) => {
        if (vnode) {
            //创建
            patch(container._vnode, vnode, container)
        } else {
            //不存在一会儿再说
            if(container._vnode){
                unmount(container._vnode)
            }
        }
        container._vnode = vnode //挂载旧的虚拟dom
    }
    return {
        render
    }
}



export const createApp = (vnode) => {
    const renderer = createRenderer()
    return {
        mount(container) {
            renderer.render(vnode, container)
        }
    }
}
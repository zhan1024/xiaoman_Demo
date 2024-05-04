import { Vnode } from "./vnode";
//vue3 最长递增子序列 返回子序列索引
const getSequence = (arr) => {
  const p = arr.slice(0)
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {

        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
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
  const mountElemt = (vnode: Vnode, container, anchor = null) => {
    const root = createElement(vnode.tag)
    vnode.el = root
    if (typeof vnode.children === "string") {
      setElementText(root, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => { patch(null, child, root) })
    }
    insert(root, container, anchor)
  }
  const patchElement = (n1, n2) => {
    const el = n2.el = n1.el
    patchKeyChildren(n1, n2, el)
  }
  const patchChildren = (n1: Vnode, n2: Vnode, container) => {
    n2.el = n1.el;
    if (typeof n2.children === "string") {
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      if (Array.isArray(n1.children)) {
        n1.children.forEach(child => unmount(child))
        n2.children.forEach(child => patch(null, child, container))
      } else {
        n2.children.forEach(child => patch(null, child, container))
      }
    }

  }
  const isSameVNodeType = (n1, n2) => {
    if (n1.key === n2.key) {
      return true
    }
    return false
  }
  const patchKeyChildren = (n1: Vnode, n2: Vnode, container) => {
    let j = 0; //指针
    const oldChildren = n1.children as Vnode[] //旧的Vnode集合
    const newChildren = n2.children as Vnode[] //新的Vnode集合
    let e1 = oldChildren.length - 1
    let e2 = newChildren.length - 1
    //前序对比
    while (j <= e1 && j <= e2) {
      const oldVnode = oldChildren[j]
      const newVnode = newChildren[j]
      if (isSameVNodeType(oldVnode, newVnode)) {
        patch(oldVnode, newVnode, container)
      }
    }

  }
  const patch = (n1, n2, container, anchor = null) => {
    if (!n1) {
      //挂载
      mountElemt(n2, container, anchor)
    } else {
      //更新
      if (typeof n2.children === 'string') {
        patchChildren(n1, n2, container)
      } else {
        //否则再调这个
        patchElement(n1, n2)
      }
    }
  }
  const render = (vnode: Vnode, container) => {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
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

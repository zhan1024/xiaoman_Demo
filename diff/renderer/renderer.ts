import { Vnode } from "./vnode"

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


//拿这个值跟左边比
// const seq = [0, 8, 4, 12, 2, 10, 6, 14]
//  var b = getSequence(seq)
//  console.log(b)
//      0 8 4 12 2 10 6 14
//dp    1 1 1  1 1  1 1  1
//index 0 1 2  3 4  5 6  7
//结果  1 2 2  3 2  3 3  4 结果最长的
//      index[0 4 6 7]
//      value[0,2,6,14]
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
        insert(root, container, anchor)
    }
    const patchElement = (n1, n2) => {
        //.log(n1, n2)
        const el = n2.el = n1.el //复制一份element 给新的Vnode
        //patchChildren(n1, n2, el)
        patchKeyChildren(n1, n2, el)
    }
    const patchChildren = (n1: Vnode, n2: Vnode, container) => {
        n2.el = n1.el; //到这一步元素使可以复用的
        if (typeof n2.children === 'string') {
            // console.log(1)
            //只是文字内容变了
            setElementText(container, n2.children)
        } else if (Array.isArray(n2.children)) {
            // console.log('来了')
            //新增或者删除了patchElement(n1, n2)
            if (Array.isArray(n1.children)) {
                n1.children.forEach(child => unmount(child))
                n2.children.forEach(child => patch(null, child, container))
            } else {
                n2.children.forEach(child => patch(null, child, container))
            }
        }
    }
    //判断key 是不是一样的
    const isSameVNodeType = (n1, n2) => {
        if (n1.key === n2.key) {
            return true
        }
        return false
    }
    const patchKeyChildren = (n1: Vnode, n2: Vnode, container) => {
        //n1 旧的vnode n2 新的vnode
        let j = 0; //指针
        const oldChildren = n1.children as Vnode[] //旧的Vnode集合
        const newChildren = n2.children as Vnode[] //新的Vnode集合
        let e1 = oldChildren.length - 1 //获取一下length 旧的vnode的length
        let e2 = newChildren.length - 1 //获取一下length 新的vnode的length
        //前序对比
        while (j <= e1 && j <= e2) {
            const oldVnode = oldChildren[j]
            const newVnode = newChildren[j]
            //console.log(oldVnode, newVnode)
            if (isSameVNodeType(oldVnode, newVnode)) {
                patch(oldVnode, newVnode, container)
            } else {
                break
            }
            j++
        }
        //尾序对比
        while (j <= e1 && j <= e2) {
            const oldVnode = oldChildren[e1]
            const newVnode = newChildren[e2]
            if (isSameVNodeType(oldVnode, newVnode)) {
                patch(oldVnode, newVnode, container)
            } else {
                break //跳出循环
                //continue 跳过
            }
            e1--
            e2--
        }
        //新增
        //如果j > e1 表示要新增了 因为新的Vnode数量比旧的Vnode多
        if (j > e1) {
            if (j <= e2) {
                //添加的时候是以新的为准
                while (j <= e2) {
                    patch(null, newChildren[j], container)
                    j++
                }
            }
        }
        //删除
        //旧的Vnode比新的Vnode多了 那肯定就是删除
        else if (j > e2) {
            //这时候要以旧的为准
            while (j <= e1) {
                unmount(oldChildren[j])
                j++
            }
        }
        else {
            // 移动的 删除的 新增的 修改的 同时发生
            //1.想办法找能够复用的节点
            //因为之前处理过的不需要再处理了
            const s1 = j;
            const s2 = j;
            //构建映射表新节点的映射表
            const keytoNewIndexMap = new Map()
            //使用新节点的key 对应 j 也就是索引
            // {3 => 1} 3 新节点的key newChild.key = 3;   j = 1
            // {4 => 2} 4 新节点的key newChild.key = 4;   j = 2
            // {2 => 3}
            // {7 => 4}
            // {6 => 5}
            for (j = s2; j <= e2; j++) {
                const newChild = newChildren[j]
                keytoNewIndexMap.set(newChild.key, j)
            }
            //2. 根据映射表找到能够复用的节点
            let patched = 0; //已经处理过的Vnode统计
            let pos = 0;  //新节点的位置
            let moved = false //看有没有需要移动的节点 移动 设置尾true
            const toBedPathed = e2 - s2 + 1;//需要处理的节点数量 e2 新节点的长度 s2 前面四个算法已经处理完的值 + 1 为什么+1 因为我们之前用length的时候是-1的现在要就回去
            const newIndexToOldIndexMap = new Array(toBedPathed).fill(-1)
            //这里面记录的就是需要处理Vnode的集合
            //e1 旧节点的length
            for (let i = s1; i <= e1; i++) {
                const oldChild = oldChildren[i]
                //通过旧节点的key 去 映射表去对应 新节点的key 就能过找到复用的
                const key = keytoNewIndexMap.get(oldChild.key)
                if (key != undefined) {
                    const newVnode = newChildren[key] //从新的Vnode list通过旧节点对应的索引找到对应的新节点
                    patch(oldChild, newVnode, container)
                    patched++
                    newIndexToOldIndexMap[key - s2] = i
                    //如果当前旧节点的key小于pos 说明该节点要移动，因为它的key再新节点的位置靠前了
                    //如果不需要移动 将pos的值更新为key 表示当前处理的新节点的最大key值
                    if (key < pos) {
                        moved = true
                    } else {
                        pos = key
                    }
                } else {
                    //删除
                    unmount(oldChild)
                }
            }
            //3.
            if (moved) {
                //有要移动的
                const seq = getSequence(newIndexToOldIndexMap)
                let s = seq.length = 1;
                let i = toBedPathed - 1;
                for (i; i >= 0; i--) {
                    if (newIndexToOldIndexMap[i] == -1) {
                        const pos = i + s2;
                        const newVnode = newChildren[pos]
                        let anchor //锚点
                        if (pos + 1 < newChildren.length) {
                            //如果在元素中间插入
                            anchor = newChildren[pos + 1].el
                        } else {
                            //末尾插入
                            anchor = null
                        }
                        patch(null, newVnode, container, anchor)
                    }
                    else if (i !== seq[s]) {
                        //说明要移动
                        const pos = i + s2;
                        const newVnode = newChildren[pos]
                        let anchor = null //锚点
                        if (pos + 1 < newChildren.length) {
                            anchor = newChildren[pos + 1].el
                        }
                        insert(newVnode.el, container, anchor)
                    } else {
                        //否则什么都不要做
                        s--
                    }
                }
            }
        }
    }
    const patch = (n1, n2, container, anchor = null) => {
        if (!n1) {
            //挂载
            //console.log('挂载')
            mountElemt(n2, container, anchor)
        } else {
            //更新 如果是string 就替换文字
            if (typeof n2.children === 'string') {
                patchChildren(n1, n2, n1.el)
            } else {
                //否则在调用这个
                patchElement(n1, n2)
            }

        }
    }
    const render = (vnode: Vnode, container) => {
        if (vnode) {
            //创建
            patch(container._vnode, vnode, container)
        } else {
            //不存在一会儿再说
            if (container._vnode) {
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
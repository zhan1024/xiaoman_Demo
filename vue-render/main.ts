import { reactive } from "./reactivity/reactive";
import { effect } from "./reactivity/effect";
import { computed } from "./reactivity/computed";
import { watch } from "./reactivity/watch";
import { ref } from "./reactivity/ref";
import { createApp } from "./renderer/renderer";
import { Vnode } from "./renderer/vnode";
const app = document.querySelector("#app")
const obj = reactive({
    name: "小满",
    age: 18,
})

effect(() => {
    const vnode: Vnode = {
        tag: 'div',
        children: [
            {
                tag: 'p',
                key:1,
                children: '你好1'
            },
            {
                tag: 'p',
                key:2,
                children: '你好2'
            }
        ]
    }
    const vnode2: Vnode = {
        tag: 'div',
        children: [
            {
                tag: 'p',
                key:1,
                children: '你好1'
            },
            {
                tag: 'p',
                key:2,
                children: '你好2'
            },
            {
                tag: 'p',
                key:3,
                children: '你好3'
            }
        ]
    }
    createApp(vnode).mount(app)
    createApp(vnode2).mount(app)
})



// console.dir(app)

// const b = ref('1')
// console.log(b)
// effect(()=>{
//     /**
//      * dom 和 数据连接起来
//      */
//     app.innerHTML = b.value
// })

// setTimeout(()=>{
//     b.value = "大满"
// },1000)


// const obj = reactive({
//     name: "小满",
//     age: 18,
// })

// watch(obj, (newVal, oldVal) => {
//     console.log(newVal, oldVal)
// })

// watch(() => obj.name, (newVal, oldVal) => {
//     console.log(newVal, oldVal)
// }, {
//     // immediate: true
//     flush: 'post'
// })

// obj.name = "大满"
// console.log(1)
//  obj.name = "大满2"

// let name = computed(()=>{
//     console.log('计算了')
//     return obj.name + 'zs'
// })

// console.log(name.value)
// console.log(name.value)
// console.log(name.value)
// obj.name = '大满'
// console.log(name.value)
//1.有啥问题 一进来就调用了 用到的时候才调用 配置的
//2.值没变 还重新计算，没缓存






// setTimeout(()=>{
//     obj.name = "小满zs"
//     setTimeout(()=>{
//         obj.age = 99
//     },1000)
// },1000)

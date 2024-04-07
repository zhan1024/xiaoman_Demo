import { reactive } from "./reactivity/reactive";
import { effect } from "./reactivity/effect";
import { computed } from "./reactivity/computed";
import { watch } from "./reactivity/watch";
import { ref } from "./reactivity/ref";
const app = document.querySelector("#app")


const obj = reactive({
    name: '小詹',
    age: 20
})
// console.log(b)
obj.name
effect(() => {
    /**
     * dom 和 数据连接起来
     */
    app.innerHTML = obj.name
})

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

obj.name = "大满"
console.log(1)
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



var a = {
    b: {
        dd: 11,
        c: {
            xx: 11, //我只用到他 把他单独脱离引用
            d: {
                name: 1
            }
        }
    }
}
var b = {
    b: { //同一个引用
        dd: 11, //同一个引用
        c: {  //同一个引用
            xx: 11, //单独解引用 proxy代理实现的
            d: { //同一个引用
                name: 1 //同一个引用
            }
        }
    }
}
//字典表 位分区算法


// setTimeout(()=>{
//     obj.name = "小满zs"
//     setTimeout(()=>{
//         obj.age = 99
//     },1000)
// },1000)

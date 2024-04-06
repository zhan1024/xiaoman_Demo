### vue源码

reactivity 响应式代码
响应式

渲染器

解析器
compile sfc
sfc = 单文件组件.vue文件
.vue 浏览器认识这个东西吗？不认识的 所以需要编译
把.vue文件编译成js文件 那js浏览器能认识吗
编译过程
template script style 都需要去解析
AST->transform->generate render函数 是个js代码

runtime
运行过程 代码已经在浏览器里面运行起来了

1. reactive 他只能接受引用类型 数组 对象 set map 因为proxy只能代理对象
2. 响应式的方法 都要和dom元素绑定 MVVM
3. MVVM modelView ViewModel 数据变了 视图更新 视图变了 数据更新
4. 副作用函数 绑定dom和数据 effect 数据变了通知effect 更新数据
5. 什么叫副作用函数 纯函数 外部修改会影响内部 副作用函数 纯函数就是外部变了不受影响

(proxy Vue3)  (Vue2 object.defineProperty)

### object.defineProperty为什么要换成这个
原因是什么？
1. 数组的API拦截不到
2. 对象新增的属性不能拦截
3. 是通过length修改数组拦截不到
4. 数组性能问题
vue2
```js
<template>
   <div>{{arr}}</div>  <!--有变化吗-->
</template>
data () {
    return {
        arr:[1,2,3]
    }
}
mounted () {
    //我这么改会生效吗 不会发生改变
    //如果要改变怎么做呢？ this.$set 才会去改变
    this.arr[0] = 666666666 //为什么不会变
    //object.defineProperty 是能够做到让他变化的
    //因为尤雨溪故意不做 性能问题 尤雨溪就提供了$set 让你去改数组的值
    this.$set(arr,0,6666) //才会变 或者掉他的方法
    //$set 原理
    //1.先判断是不是响应式对象 __observer__ 直接返回
    //2.判断是不是对象 如果是对象key[value] 修改值 如果是新的属性就 使用ReactivedefineProperty 帮你把新增的属性添加上去变成响应式的
    //3.判断是不是数组 他就调用splice 方法修改值
    //4.dep.notify() 通知视图更新
    //vue3 直接废弃了$set
}
```

### proxy 用法
//13API
//1. 调用函数之前想做点什么事情 apply
//2. ownKeys拦截for in
//3. construct new之前拦截
//4. deleteProperty 删除之前可以做点什么
//与他对应的是什么 配合着使用 不是必须配合的用是可以配合用也可以单独用
//Reflect 全局对象 Reflect 也是13个API
// Reflect.deleteProperty(obj,'name')

target 就是对象 {
    name:"小满",
    age:18
}
key name age
receiver 他自身  {
    name:"小满",
    age:18
}
receiver 保证上下的正确
value 就是值 33
proxy 嵌套 proxy 函数 嵌套 箭头函数各种嵌套

### weakMap

/**
 * 用法 他的key只能是对象不能是其他的
 * 不能遍历 弱引用不稳定 js作者不让你遍历
 * 因为垃圾回收 200-300ms执行一次
 * devtools 影响观感，不影响使用
 * 尤雨溪考虑到了
 */
const json  = new WeakMap()
let x = {
    name:'asdas'
}
let b = {
    x
}
json.set(x,123)
x = null
console.log(json)
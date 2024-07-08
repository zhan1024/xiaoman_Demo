### 目录
1.cache --强缓存协商缓存
2.vue-core  --响应式源码
3.vue-render  --响应式源码


### 补充面试点
# 1.为什么要有Vnode 
A:虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能
真实的DOM属性太多了,操作成本太高了
# xiaoman_Demo

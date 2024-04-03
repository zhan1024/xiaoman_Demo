import { effect } from "./effect"
interface Options {
    immediate?: boolean
    flush?: 'sync' | 'post' | 'pre'
}
const traverse = (target, seen = new Set()) => {
    if (typeof target != 'object' || target === null || seen.has(target)) return
    seen.add(target)
    for (let key in target) {
        traverse(target[key], seen)
    }
    return target
}
export const watch = (target: any, cb: Function, options?: Options) => {
    //1.格式化参数 格式化成 getter函数
    let getter: Function
    if (typeof target === 'function') {
        getter = target
    } else {
        getter = () => traverse(target)
    }
    //2.返回值
    let newVal, oldVal
  
    const job = () => {
        newVal = effectFn() //newVal 大满2
        cb(newVal, oldVal)  
        oldVal = newVal //oldVal 大满
    }
    const flushPost = () => {
        return Promise.resolve().then(job)
    }
    //依赖发生变化执行job 
    const effectFn = effect(getter, {
        lazy: true,
        scheduler:options.flush === 'post' ? flushPost : job
    })
    //3.参数immediate
    if(options && options.immediate){
        options.flush === 'post' ? flushPost() : job()
    }else{
        oldVal = effectFn() //oldVal 小满
    }
}
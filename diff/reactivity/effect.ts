let activeEffect
interface Options {
    lazy:boolean
    scheduler:() => void
}
export const effect = (fn:Function,options?:Options) => {
    const _effect = () => {
        activeEffect = _effect
        const res = fn()
        return res
    }
    _effect.options = options //因为trigger的时候要用
    if(options && options.lazy){
        //如果是lazy 就不自动调用
        return _effect
    }else{
        //如果不是lazy 就自动调用
        _effect()
        return _effect
    }
    
    
}

//容器存放依赖
let targetMap = new WeakMap()
//1.收集依赖
export const tracker = (target,key) => {
    let depsMap = targetMap.get(target)
    //因为第一次没有值 默认值
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps){
        deps = new Set()
        depsMap.set(key,deps)
    }
    deps.add(activeEffect)
}


//2.更新依赖
export const trigger = (target,key) => {
   let depsMap = targetMap.get(target)
   let deps:Set<any> = depsMap.get(key)
   deps.forEach(effect => {
       if(effect.options && effect.options.scheduler){
           effect.options.scheduler(effect)
       }else{
           effect()
       }
   })
}
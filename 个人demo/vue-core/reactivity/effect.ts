let activeEffect
interface Options {
  lazy: boolean,
  schedules: () => void
}
export const effect = (fn: Function, options?: Options) => {
  const _effect = () => {
    activeEffect = _effect;
    const res = fn()
    return res
  }
  _effect.options = options
  if (options && options.lazy) {
    //如果是lazy就不自动调用
    return _effect
  } else {
    //如果不是lazy就自动调用
    _effect()
    return _effect
  }
}
//容器存放依赖
let targetMap = new WeakMap()

//1.收集依赖
export const tracker = (target, key) => {
  if (!activeEffect) return
  let depsMap = targetMap.get(target);
  //因为第一次没有值,,默认值
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
}

//2.更新依赖
export const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  let deps: Set<any> = depsMap.get(key)
  debugger
  deps.forEach(effect => {

    if (effect.options && effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  });
}

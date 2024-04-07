import { effect } from "./effect";
interface Options {
  immediate?: boolean,
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
export const watch = (target: any, cd: Function, options?: Options) => {
  let getter: Function
  if (typeof target === "function") {
    getter = target
  } else {
    getter = () => { traverse(target) }
  }
  let newVal, oldVal
  const job = () => {
    newVal = effectFn()
    cd(newVal, oldVal)
    oldVal = newVal
  }
  const flushPost = () => {
    return Promise.resolve().then(job)
  }

  //依赖发生变化执行job
  const effectFn = effect(getter, {
    lazy: true,
    schedules: options.flush === "post" ? flushPost : job
  })
  if (options && options.immediate) {
    options.flush === "post" ? flushPost() : job()
  } else {
    oldVal = effectFn()
  }
}
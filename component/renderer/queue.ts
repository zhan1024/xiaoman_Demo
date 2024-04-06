const queue: Set<Function> = new Set()
let isFlush = false; //标志当前有没有任务在执行
const p = Promise.resolve() //promise


export const queueJob = (job: Function) => {
    queue.add(job)
    if (!isFlush) {
        isFlush = true //避免重复更新
        p.then(() => {
            queue.forEach(job => job())
            queue.clear()
            isFlush = false
        })
    }
}



export const nextTick = (fn?:(...args:any[])=>void) => {
   return fn ? p.then(fn) : p
}


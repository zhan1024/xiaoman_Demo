import { effect } from "./effect"

export const computed = (getter: Function) => {
    let dirty = true //缓存 只有依赖发生改变才会重新计算
    let value
    const _value = effect(getter,{
        lazy:true,
        scheduler() {
            dirty = true
        }
    })

    class ComputedRefImp {
        get value() {
            if(dirty){
                value = _value()
                dirty = false
            }
            return value
        }
    }

    return new ComputedRefImp()
}
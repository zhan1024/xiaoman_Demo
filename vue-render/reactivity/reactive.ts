import { tracker,trigger } from "./effect"
//T extends object 泛型约束 只能传入引用类型
export const reactive = <T extends object>(value:T) => {
    return new Proxy(value,{
        get(target,key,receiver){
            let res = Reflect.get(target,key,receiver)
            tracker(target,key)
            return res
        },
        set(target,key,value,receiver){
            let res = Reflect.set(target,key,value,receiver)
            trigger(target,key)
            return res
        }
    })
}
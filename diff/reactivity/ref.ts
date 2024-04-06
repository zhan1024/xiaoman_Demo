import { reactive } from "./reactive"
import { tracker,trigger } from "./effect"
const isObject = (value) => {
    return value !== null && typeof value === 'object'
}
/**
 * 其实ref碰到引用类型也是掉的reactive
 * @param value 
 * @returns 
 */
const toReacrive = (value) => {
    return isObject(value) ? reactive(value) : value
}

/**
 * ref 支持普通类型还支持引用类型
 * @param value 
 */
export const ref = <T>(value:T) => {
  return new RefImpl<T>(value)
}


class RefImpl<T> {
    private _value: T
    constructor (value) {
       this._value = toReacrive(value)
    }

    get value ():T {
        tracker(this,'value')
        return this._value
    }
    set value (value) {
        if(value == this._value) return
        this._value = toReacrive(value)
        trigger(this,'value')
    }
}
import { reactive } from "./reactive";
import { tracker, trigger } from "./effect";
const isObject = (value) => {
  return value !== null && typeof value === 'object'
};

const toReactive = (value) => {
  return isObject(value) ? reactive(value) : value
}

export const ref = <T>(value: T) => {
  return new RefImpl<T>(value)
}

class RefImpl<T>{
  private _value: T
  constructor(value) {
    this._value = toReactive(value)
  }
  get value(): T {
    tracker(this, 'value')
    return this._value
  }
  set value(value) {
    if (value == this._value) return
    this._value = toReactive(value)
    trigger(this, 'value')
  }
}
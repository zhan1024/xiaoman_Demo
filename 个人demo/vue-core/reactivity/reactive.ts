import { tracker, trigger } from "./effect"
export const reactive = <T extends object>(value: T) => {
  return new Proxy(value, {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver);
      console.log('走的get', res);

      tracker(target, key)
      return res
    },
    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver);
      console.log('走的set', res);

      trigger(target, key);
      return res
    },
  })
}
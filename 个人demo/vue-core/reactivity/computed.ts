import { effect } from "./effect";
export const computed = (getter: Function) => {
  let dirty = true
  let value
  const _value = effect(getter, {
    lazy: true,
    schedules() {
      dirty: true
    }
  })
  class ComputedRefImp {
    get value() {
      if (dirty) {
        value = _value()
        dirty = false
      }
      return value
    }
  }
  return new ComputedRefImp()
}

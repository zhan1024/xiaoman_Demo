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
}
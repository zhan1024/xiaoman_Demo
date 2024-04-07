import { reactive } from "./reactivity/reactive.js";
import { effect } from "./reactivity/effect.js";
const app = document.querySelector("#app")
console.log('433242');
const setFn = () => { b.name }
const b = reactive({
  name: '小詹',
  age: 20
})
setFn()
effect(() => {
  /**
   * dom 和 数据连接起来
   */
  app.innerHTML = b.name
})
b.name = "dada"



class Stack {
  constructor() {
    this.items = [];
  }
  //入栈
  push(el) {
    this.items.push(el)
  }
  //出栈
  pop() {
    if (this.isEmpty()) {
      return "栈为空"
    }
    return this.items.pop()
  }
  //返回栈顶元素
  peek() {
    if (this.isEmpty()) {
      return "栈为空"
    }
    return this.items[this.items.length - 1]
  }
  //判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  //返回栈的大小
  size() {
    return this.items.length
  }
  //清空栈
  clear() {
    this.items = []
  }
  //打印栈
  print() {
    console.log(this.items.toString());
  }
}

const stack = new Stack();
stack.push(2333)
stack.push(765)
stack.push(8765)
stack.push(87)
stack.push(8)
console.log(stack);
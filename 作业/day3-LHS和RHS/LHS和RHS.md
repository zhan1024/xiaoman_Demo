“LHS”代表“Left-Hand Side”,"RHS"代表“Right-Hand Side”。
其实从字面意思就可以看出，“LHS”代表左侧，“RHS”代表右侧。
我找到了一句最容易理解且不会太绕口的话：在赋值语句中，LHS是接收赋值的变量或者数据结构（容器），RHS是被赋予给左侧的值或者表达式。

举例：
1. let x = y;#此时x就是LSH，而y就是RHS
2.console.log(x);# 此时console.log期待一个值，而x赋予了console.log值，所以x是RHS
3.y = x+3 ;#你看，右侧其实也可以是表达式来的，此时y是LSH，接收赋值的容器，而x是RHS  
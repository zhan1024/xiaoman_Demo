### （1）回流：当渲染树中部分或者全部元素的尺寸、结构或者属性发生变化时，浏览器会重新渲染部分或者全部文档的过程。以下操作会导致回流：
1.页面的首次渲染
2.浏览器的窗口大小发生变化
3.元素的内容发生变化
4.元素的尺寸或者位置发生变化
5.元素的字体大小发生变化
6.激活CSS伪类
7.查询某些属性或者调用某些方法
8.添加或者删除可见的DOM元素

### （2）重绘：当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是重绘。
以下操作会导致重绘：
color、background相关属性：background-color、 background-image等
outline 相关属性：outline-color 、outline-width、text-decoration
border-radius、visibility、box-shadow
回流一定会引起重绘，重绘不一定会引发回流
优化方法：
1.使用transformt替代js动画
2.使用visibility 替换 display: none
3.避免频繁操作样式和DOM


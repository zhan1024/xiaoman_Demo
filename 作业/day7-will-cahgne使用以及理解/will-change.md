### will-change 是什么
will-change是一个CSS属性,是为web开发者提供了一种告知浏览器该元素会有哪些变化的方法
### will-change的使用demo
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>will-change 使用示例</title>
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
  transition: transform 0.3s ease;
}

/* 在动画开始前添加 will-change */
.box:hover {
  will-change: transform;
  transform: scale(1.2);
}
</style>
</head>
<body>

<div class="box"></div>

</body>
</html>

### 理解
will-change 会提前告知浏览器对应的属性(transform)会发生变化,以此提高动画的性能
will-change 会带来以下的优化效果
.减少渲染阻塞:浏览器会提前分配和优化资源,减少渲染阻塞时间,提高页面的响应速度
.减少重绘和重排: 浏览器可以更好的管理渲染过程,避免不必要的重绘和重排,从而提高渲染性能
.硬件加速: 某些浏览器对will-change属性会进行硬件加速,进一步提升性能

### 避免滥用will-change 
 <!-- will-change会消耗浏览器GPU资源 -->
当元素有 will-change 时，将元素提升到它们自己的“GPU 层”的浏览器。但有太多元素声明时，浏览器将忽略声明，以避免耗尽 GPU 内存

<!-- 不要为了过早优化而将 will-change 应用于元素。 -->
如果你的页面表现良好，则不要仅仅为了提高一点速度而将 will-change 属性添加到元素中。will-change 旨在作为最后的手段使用，以尝试解决现有的性能问题。不应该用来预测性能问题。过度使用 will-change 将导致内存使用过多，并导致更复杂的渲染发生，因为浏览器试图为可能的更改做准备。这将导致更差的性能。

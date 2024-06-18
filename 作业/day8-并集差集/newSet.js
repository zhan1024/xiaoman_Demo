/**
 * var a = [1, 2, 3] //target
var b = [2, 3, 4]
1. 实现数组的交集[2, 3]
2. 实现的数组的差集[1]
3. 实现数组的并集并且去重[1, 2, 3, 4]
4. 实现数组的补集[1, 4
 */

var a = [1, 2, 3] //target
var b = [2, 3, 4]
var d = []
// 1. 实现数组的交集[2, 3]
a.forEach(item => {
  if (b.includes(item)) {
    d.push(item)
  }
})
console.log('交集方法1', d);
var e = []
e = a.filter(item => b.includes(item))
console.log('交集方法2', e);
// 2. 实现的数组的差集[1]
var f = a.filter(item => !b.includes(item))
console.log('差集', f);
// 3. 实现数组的并集并且去重[1, 2, 3, 4]
var g = Array.from(new Set([...a, ...b]))
console.log('并集去重', g);
// 4. 实现数组的补集[1, 4]
var h = g.filter(value => !a.includes(value) || !b.includes(value));
console.log('补集', h);
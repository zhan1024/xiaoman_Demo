class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; //缓存容量
    this.map = new Map(); //创建Map存储缓存
  }
  get(key) {
    const val = this.map.get(key); //从缓存中获取数据
    if (val === undefined) return -1; //如果没有找到,返回-1
    //如果找到了,就把这个key移动到map的末尾(最近使用)
    this.map.delete(key);
    this.map.set(key, val);
    return val;

  }
  put(key, value) {
    //如果map中已经有这个key,就把他删除
    if (this.map.has(key)) {
      this.map.delete(key)
    }
    this.map.set(key, value);
    //如果超出了缓存容量,就删除最近没用的那个key-value
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey)
      this.map.delete(firstKey)
    }
  }
}
// 使用案例
const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 返回 1

cache.put(3, 3); // 该操作会使得 key 2 作废
console.log(cache.get(2)); // 返回 -1

cache.put(4, 4); // 该操作会使得 key 1 作废
console.log(cache.get(1)); // 返回 -1
console.log(cache.get(3)); // 返回 3
console.log(cache.get(4)); // 返回 4

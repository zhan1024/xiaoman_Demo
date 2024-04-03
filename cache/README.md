### 强缓存 协商缓存

1. 工作中可以用
2. 高频面试题

http缓存 前端是控制不了的 后端控制的 前端配合的

## 强缓存
浏览器缓存
 - 内存缓存(redis)（memory cache）一般缓存在浏览器的内存中 优点速度快 缺点网页关闭释放了内存 （一般出现于刷新的时候内存缓存）
 - 磁盘缓存(mysql)（disk cache）一般缓存在电脑的磁盘上 缺点速度比内存缓存慢 优点空间大 （一般出现与第一次打开）
 缓存策略 由浏览器自行控制

 操作 缓存

 Exprise他会去读本地时间去判断 跟他的时间去判断的

 Exprise(UTC) 字段 这个是http1.0的字段 有些浏览器不支持了
 Cache-Control 字段 这个多一点 这个比较新
  - public 任何服务器都可以缓存 包括代理服务器 CDN
  - private 仅限于客户端缓存 代理服务器是不行的
  - max-age=秒数
  - no-cache 不走强缓存了你去走协商缓存

  Expires 跟 Cache-Control 同时出现 max-age 优先级高

  强缓存之后第二次不经过服务器了

  状态码200

  ## 协商缓存
  配套使用的缓存策略
  last-modified配合if-modified-since
   - last-modified 设置文件最后的修改时间
   - if-modified-since 浏览器给我们的 第二次访问浏览器会携带这个字段 字段的值就是if-modified的值
  Etag配合if-none-match

  状态码304
  
  如果 Etag 和 last-modified 同时出现那么 Etag优先的
  last-modified精确到秒级 也就是一秒钟同时修改文件两次N次那么他缓存就会有问题

  如果`强缓存`和`协商缓存`同时出现
  强缓存优先

 谷歌浏览器的bug

 其实现在已经是304 了
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
const app  = express() //http 封装了一下 提供接口的
app.use(cors()) //解决跨域
const getFileModifyTime = () => {
    return fs.statSync('./index.js').mtime
}
app.get('/api',(req,res)=>{
    //res.setHeader
    const modifyTime = getFileModifyTime()
    const lastModified = req.headers['if-modified-since']
    if(lastModified && lastModified === modifyTime.toUTCString()){
        console.log('没有修改')
        res.statusCode = 304 //如果修改时间一致就进行缓存
        res.end()
        return
    }

    console.log('来了')
    res.setHeader('cache-control','no-cache')
    res.setHeader('last-modified',modifyTime.toUTCString())
    res.send('hello world')
})


app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
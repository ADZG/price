var express=require("express")
// 启用express框架
var app=express()
// 添加对端口的监听
var router=require("./router")
// 启用路由
app.listen(2077,function(){
    console.log("http://127.0.0.1:2077")
})
app.engine('html', require('express-art-template'));
// 进行模板引擎环境的配置，这里配置为产品阶段使用
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})
// 静态资源的托管
app.use(express.static("public"))
// 挂载路由
app.use(router)




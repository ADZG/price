var express=require("express")
//启用express模块
var app=express()

var router=require("./router")

// var bodyParser=require("body-parser")
// 监听端口
app.listen(2999,function(){
    console.log("http://127.0.0.1:2999")
})
// 设置跨域请求
var allow = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}
app.use(allow)


// 将所有的post请求方式，都通过bodyparser处理。得到的是一个对象
// app.use(bodyParser.urlencoded({ extended: false }))

// 配置模板的引擎文件格式 并且启用框架的模板引擎
app.engine("html",require("express-art-template"))
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
    //在开发和上线上使用
})


// 静态资源的托管
app.use(express.static("public"))
app.use(router)
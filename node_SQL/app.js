var express=require("express")
// 启用exrpess框架
var app=express() //启用服务器
var router=require("./router") //配置路由
var bodyParser=require("body-parser") //对post请求
app.listen(4396,()=>{
    console.log("http://127.0.0.1:4396")
})//监听端口

// 启用模板引擎，模板的类型是express的模板，文件后缀名为html
app.engine("html",require("express-art-template"))
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})

app.use(bodyParser.urlencoded({ extended: false }))//对post带来的参数的，转化为一个对象
// 静态资源的托管 自行加载public目录下的所有静态资源文件
app.use(express.static("public"))
// 挂载路由
app.use(router)
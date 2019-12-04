var  express=require("express")
// 启用模块
var app=express()
// 创建服务器、

// 添加服务器监听
app.listen(2900,function(){
    console.log("http://127.0.0.1:2900")
})
// /images 虚拟路径
// 查找images下面的文件
app.use("/images",express.static("/images"))
// 路由判断用户请求
app.get("/",function(req,res){
    
})
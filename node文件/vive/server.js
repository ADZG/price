var http = require("http")
var fs = require("fs")
// 服务器基于http协议
var server = http.createServer()
// 在http的协议上，创建服务器
server.listen(3888, function () {
    // 添加对指定端口的监听
    console.log("http://127.0.0.1:3888")
})
server.on("request", function (req, res) {
    // req为请求报文
    // res为响应报文
    //end :可以将数据返回客户端
    fs.readFile("../xx/index.html", function (err,data) {
        if(err){
            res.end("404") //只能返回字符串
        }else{
            res.end(data)
        }
    })
})
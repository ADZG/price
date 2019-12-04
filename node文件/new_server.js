var http=require("http")
// 建立http协议
var server=http.createServer()
var fs=require("fs")
// 建立服务器
server.listen(2660,function(){
    console.log("http://127.0.0.1:2660")
})
server.on("request",function(req,res){
    if(req.url=="/"){
        req.url="/index.html"
    }
    fs.readFile(__dirname+req.url,function(err,data){
        if(err){
            res.end("err")
        }else{
            res.end(data)
        }
    })
})
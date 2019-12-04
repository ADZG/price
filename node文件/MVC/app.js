var http=require("http")
var server=http.createServer()
var fs=require("fs")
var template=require("art-template")
var rounter=require("./rounter")
server.listen(2931,function(){
    console.log("http://127.0.0.1:2931")
})
server.on("request",function(req,res){
    rounter(req,res)
})
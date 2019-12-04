var http = require("http")
// 发起http协议
var fs = require("fs")
// 调用核心模块
var template = require("art-template")
var server = http.createServer()
server.listen(2007, function () {
    console.log("http://127.0.0.129:2007")
})
server.on("request", function (req, res) {
    // req.url为端口号后面的文件目录名 如/indexedDB.html
    // req.method为请求方式
    if (req.url == "/" && req.method == "GET") {
        // 如果符合上诉请求的条件，则读取文件，调出json数据
        // 此时的路径，因为是服务器访问服务器目录，所以可以写相对路径


        // 少了一个点 要么不写，这里是服务器内部文件读取数据文件。可以用绝对路径接上
        
        fs.readFile(__dirname+"/vive/heros.json", function (err, data) {
            if (err) {
                res.end("404")
            } else {
                // 此时是用node的模板引擎渲染到客户端上，服务端和客户端之间是必须要用绝对路径的
                // 将读取到的文件数据data，转化成json对象格式
                // __dirname+以当前问文件目录之后的文件路径

                
                // 写错的位置  这里模板的路径，是当前目录的绝对位置加上文件的位置
                var temp = template(__dirname + "/xx/hero_index.html", JSON.parse(data))
                // 将做好的模板返回给客户端
                res.end(temp)
            }
        })
        // 渲染其他的css和img 注意当前文件下面的css 注意目录的位置，不能随意更改

        // 如果端口后面的文件目录有这几个字符串，则不等于-1
    } else if (req.url.indexOf("/css/") !== -1 || req.url.indexOf("/images/") !== -1) {
        // 读取文件
        // 文件路径为 当前文件所在的绝对路径加上req.url的文件目录路径/css/
        // 这里读取文件的是要渲染到客户端，所以必须要用绝对路径
        fs.readFile(__dirname + req.url, function (err, data) {
            if (err) {
                res.end("加载失败")
            } else {
                res.end(data)
            }
        })
    }
})
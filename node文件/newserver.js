var http = require("http")

var fs = require("fs")

var server = http.createServer()
server.listen(2789, function () {
    console.log("http://127.0.0.1:2789")
})
server.on("request", function (req, res) {
    var cuurl = req.url // 端口后面的内容/index.html
    if (cuurl == "/") {
        cuurl = "/index.html"
    }
    var type = req.method //得到的是请求的方式 
    fs.readFile(__dirname + cuurl, "UTF-8",function (err, data) {
        console.log(__dirname + cuurl) //输出的是服务器的目录+；类似于index.html
        // __dirname 定位到当
        if (err) {
            console.log(err)
            var obj = {
                code: 404,
                msg: "出错"
            }
            res.end(JSON.stringify(obj))
        } else {
            res.end(data)
        }
    })
})
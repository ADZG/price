var http = require("http")
var fs = require("fs")
var template = require("art-template") //引入第三方template
var server = http.createServer()
server.listen(5666, function () {
    console.log("http://127.0.0.1:5666")
})

server.on("request", function (req, res) {
    var tempurl = req.url  //得到的是类似/index.html
    // console.log(tempurl)
    var tempmethod = req.method //获取的是请求的方式
    if (req.url == "/" && tempmethod == "GET") {
        fs.readFile(__dirname+"/vive/heros.json", function (err, data) {
            if (err) {
                res.end("404")
            } else {
                var html = template(__dirname + "/xx/temp.html", JSON.parse(data))
                res.end(html)
            }
        })
    }
    else if (req.url.indexOf("/css/") !== -1 || req.url.indexOf("/images/") !== -1) {
        fs.readFile(__dirname + tempurl, function (err, data) {
            console.log(__dirname+req.url)
            if (err) {
                res.end("404")
            } else {
                res.end(data)
            }
        })
    }
})
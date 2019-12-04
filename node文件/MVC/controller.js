var fs=require("fs")
var dataMOdule=require("./dateMondule")
var template=require("art-template")

exports.getIndexPage=function(req,res){
    dataMOdule.getDataAll(function(err,data){
        if(err){
            res.end("err")
        }else{
            var html = template(__dirname + "/../xx/hero_index.html", JSON.parse(data))
            res.end(html)
        }
    })
}
exports.getStaticSource=function(req,res){
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
        if (err) {
            res.end("样式加载失败")
        } else {
            res.end(data)
        }
    })
}
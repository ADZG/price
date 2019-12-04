var datamodules = require("./datamodule")
// 启用数据处理模块

// 页面返回模块挂载
exports.getIndex = function (req, res) {
    datamodules.getAllData(function (err, data) {
        if (err) {
            res.end("渲染出现未知错误")
        } else {
            res.render(__dirname + "/vive/hero_index.html", { heros: data })
        }
    })
}
exports.getEdd=function(req,res){
    res.render(__dirname+"/vive/add.html")
}
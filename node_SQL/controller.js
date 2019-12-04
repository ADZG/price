var datamodule = require("./datamodule")
var formidable = require("formidable") //启用上传模块
// 获取首页的动态页面
var path = require("path")   //启用核心路径模块
var myurl = require("url")
var queryString = require("querystring")
//启用字符查询模块
exports.getIndex = (req, res) => {
    datamodule.getAllData((err, data) => {
        // 回调函数里有两个参数，都是数据库那边给的，这边写如何处理数据
        if (err) {
            res.end("404")
        } else {
            res.render(__dirname + "/page/heros_index.html", { heros: data })
            //    console.log(data)
        }
    })
}

// 获取添加人物的静态页面
exports.getAdd = (req, res) => {
    res.render(__dirname + "/page/add.html")
}
// 文件上传
exports.uploadFile = (req, res) => {
    var form = new formidable.IncomingForm() //启用新的文件对象
    form.uploadDir = __dirname + "/public/images" //文件储存的路径 绝对路径
    form.keepExtensions = true    // 是否保存文件名称
    form.parse(req, (err, field, files) => {
        if (err) {
            res.json({
                code: 201,
                msg: "上传失败"
            })
        } else {
            //    path.name会得到当前文件的目录的最后一段，文件名
            var filename = path.basename(files.img.path)
            console.log(filename)
            //    找到文件上传后的名称，发给前台做预览等处理
            res.json({
                code: 200,
                msg: "上传成功",
                img: filename
            })
        }
    })
}
//新增人物
exports.doHeros = (req, res) => {
    console.log(req.body)
    datamodule.upHerosData(req.body, (err) => {
        if (err) {
            res.json({
                code: 201,
                msg: "新增失败"
            })
        } else {
            res.json({
                code: 200,
                msg: "上传成功"
            })
        }
    })
}

exports.getEdit = (req, res) => {
    var id = myurl.parse(req.url, true).query.id
    //获取页面中url1的id1
    datamodule.getEditData(id, (err, data) => {
        if (err) {
            res.end("404")
        } else {
            // console.log(data)
            res.render(__dirname + "/page/edit.html", data)
        }
    })
}

exports.upEdit = (req, res) => {
    datamodule.upEditData(req.body, (err) => {
        if (err) {
            res.json({
                code: 201,
                msg: "错误"
            })
        } else {
            res.json({
                code: 200,
                msg: "编辑成功"
            })
        }
    })
}

exports.delHeros=(req,res)=>{
    // 获取页面id
    var id = myurl.parse(req.url, true).query.id
    datamodule.delHerosData(id,(err)=>{
        if(err){
            res.json({
                code:201,
                msg:"删除失败"
            })
        }else{
            res.json({
                code:200,
                msg:"删除成功"
            })
        }
    })
}
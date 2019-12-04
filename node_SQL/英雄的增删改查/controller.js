var datamodul = require("./datamodul")
// 启用数据模块
var formidable = require("formidable")
// 挂载返回页面的方法
var path = require("path")
//启用核心模块path路径方法，取到文件路径的最后一段，文件名
var queryString = require("querystring")

var myurl=require("url")
// 启用查询字符串模块
exports.getIndex = (req, res) => {
    datamodul.getAllData((err, data) => {
        if (err) {
            // 如果数据库那边没有获取到数据
            res.end("没数据")
        } else {
            // 直接渲染模板
            res.render(__dirname + "/vive/hero_index.html", { heros: data })
        }
    })
}
// 挂载返回新增页面的方法
exports.getAdd = (req, res) => {
    res.render(__dirname + "/vive/add.html")
}

// 文件上传的方法
exports.upLoadFile = (req, res) => {
    var form = new formidable.IncomingForm()
    // 设置上传文件路径
    form.uploadDir = __dirname + "/public/images"
    // 保存文件原来的名称
    form.keepExtensions = true
    // 第一个参数，请求报文的对象，
    // 第二个参数，回调函数 里面有三个参数
    // err 错误信息对象
    // fileds 传递的普通的键值对，对象
    // files文件储存之后的相关信息
    form.parse(req, (err, filed, files) => {
        if (err) {
            res.json({
                code: 201,
                msg: "上传失败"
            })
        } else {
            // files.img.path得到的是上传后文件在服务器的绝对路径地址
            // 但是我们需要的只是文件名，文件名在绝对路径地址的最后面
            // 调用核心模块，path.basename，可以取到绝对地址的最后一段/的内容
            var filename = path.basename(files.img.path)
            // 最后，由于客户端需要拿到上传后的图片名称进行预览操作，需要返回该文件名
            res.json({
                code: 200,
                msg: "上传成功",
                img: filename
            })
        }
    })
}

exports.upAdd = (req,res) => {
    // 从请求报文中获取数据
    var str = ""
    req.on("data", (chunk)=> {
        str += chunk
    })
    req.on("end", () => {
        // 由于客户端传过来的数据是字符串的形式，需要转成键值对的形式
        var obj=queryString.parse(str)
        console.log(obj)
        datamodul.addHero(obj,(err)=>{
            if(err){
                res.json({
                    code:201,
                    msg:"新增错误"
                })
            }else{
                res.json({
                    code:200,
                    msg:"新增成功"
                })
            }
        })
    })
}

// 通过传入的id，从数据库获取对应的信息
exports.getEdit=(req,res)=>{
    // get请求：获取之前在主页渲染时，添加的id
    var id=myurl.parse(req.url,true).query.id
    datamodul.getEditData(id,(err,data)=>{
        if(err){
            res.end("获取失败")
        }else{
            // 渲染模板
            res.render(__dirname+"/vive/edit.html",data)
        }
    })
}

// 编辑后，搜集post请求传送过来的数据，再上传到数据库
exports.doEdit=(req,res)=>{
    var str=""
    req.on("data",(chunk)=>{
        str+=chunk
    })
    req.on("end",()=>{
        var obj=queryString.parse(str)
        datamodul.editHero(obj,(err)=>{
            if(err){
                res.json({
                    code:201,
                    msg:"修改失败"
                })
            }else{
                res.json({
                    code:200,
                    msg:"修改成功"
                })
            }
        })
    })
}

exports.delHeros=(req,res)=>{
    // 找到当前页面的id值
    var id=myurl.parse(req.url,true).query.id
    datamodul.delHerosById(id,(err)=>{
        if(err){
            res.json({
                code:201,
                msg:"删除失败"
            })
        }else{
            res.redirect("/"+parseInt(Math.random()*10))
        }
    })
}

// 启用服务器模块
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mynewsq"
})
// 挂载查询数据库的方法
exports.getAllData=function(callback){
    connection.query("SELECT * FROM heros WHERE isDelete=0", function (err, results, fields){
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
        console.log(null,results)
    })
}

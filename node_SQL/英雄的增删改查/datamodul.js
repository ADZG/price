var mysql=require("mysql")
// 启用服务器模块
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mynewsq"
})
//链接到服务器
exports.getAllData=(callback)=>{
    connection.query("SELECT * FROM heros WHERE isDelete=0", (err, results, fields)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}
// 处理控制器带过来数据对象
exports.addHero=(obj,callback)=>{
    // 添加数据对象的信息到数据库中
    var sql="insert into heros values(null,?,?,?,0)"
    console.log(obj)
    connection.query(sql,[obj.name,obj.gender,obj.img],(err,results)=>{
        if(err){
            // connection.query 可以操纵数据库，回调函数中results只有查询的时候，是结果表，其他的都是ok包
            // console.log(err)
            callback(err)
        }else{
            callback(null)
        }
    })
}

exports.getEditData=(id,callback)=>{
    var sql = 'select * from heros where id = ? and isdelete = 0'
    // 通过查询id值，返回一条数据，
    connection.query(sql,[id],(err,results,fields)=>{
        if(err){
            callback(err)
        }else{
            // 返回的是一个数组，如果渲染模板需要包装成对象才能用
            callback(null,results[0])
            // console.log(results[0])
            // 根据id只能查询到一条结果
        }
    })
}
exports.editHero=(obj,callback)=>{
    // var sql =`UPDATE heros SET name='${obj.name}' gender='${obj.gender}' img='${obj.img}' where id=${obj.id}`
    var sql = 'update heros set name=?,gender=?,img=? where id = ?'
    connection.query(sql,[obj.name, obj.gender, obj.img, obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

exports.delHerosById=(id,callback)=>{
    var sql ="update heros set isDelete=1 where id="
    connection.query(sql,[id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
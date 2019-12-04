// 服务器数据处理模块
var mysql=require("mysql")//启用服务器模块
var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'mynewsq' 
})//创建服务起

// 首页的全部数据
exports.getAllData=(callback)=>{
    var sql="SELECT * FROM heros WHERE isDelete=0"
    // 该方法可以操作数据库 三个参数，err获取失败后的结果，results 在查询的时候为结果表， 
    connection.query(sql,(err,results)=>{
        if(err){
            callback(err)  
        }else{
            callback(null,results)//返回数据库获取到的所有数据
        }
    })
}

// 人物新增
exports.upHerosData=(obj,callback)=>{
    // 如果id是自动生成，也要写null占用位置
    var sql ="INSERT into heros VALUES(null,?,?,?,0)"
    connection.query(sql,[obj.name,obj.gender,obj.img],(err,results,fields)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

exports.getEditData=(id,callback)=>{
    var sql ="SELECT * FROM heros WHERE isDelete=0 and id="+id+""
    connection.query(sql,(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results[0]) //这里通过查询的是数组，要用索引的方式给拿出来
        }
    })
}

exports.upEditData=(obj,callback)=>{
    var sql ="update heros set name=?,gender=?,img=? where id = ?"
    connection.query(sql,[obj.name,obj.gender,obj.img,obj.id],(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
exports.delHerosData=(id,callback)=>{
    var sql ="UPDATE heros SET isDelete=1 WHERE id=?"
    connection.query(sql,[id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
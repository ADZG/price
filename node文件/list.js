var http=require("http")
var fs=require("fs")
var moment=require("moment")
var server=http.createServer()
var template=require("art-template")

server.listen(3977,function(){
    console.log("http://127.0.0.1:3977")
})
server.on("request",function(req,res){
    console.log(req.url)
    if(req.url=="/"){
        fs.readdir(__dirname+req.url,function(err,data){
            if(err){
                res.end("404")
            }else{
                var dirAll=[]
                var fileAll=[]
                // 使用let声明,将在这个循环内产生作用域
                for(let i=0;i<data.length;i++){
                    // stat方法可以获取指定全路径所对应的文件夹和文件的对象，对象中有相应的属性
                    fs.stat(__dirname+"/"+data[i],function(err1,stats){
                        if(err1){
                            res.end("错误")
                        }else{
                            // 新建对象，将遍历出来的每个数据推入数组中
                            // 由于是异步的方式识别文件
                            var obj={}
                            obj.name=data[i]
                            obj.size=stats.size
                            obj.mtime = moment(stats.mtime).format('YYYY-MM-DD HH:mm:ss')
                            obj.isFile = stats.isFile()
                            if(obj.isFile){
                                // push 将元素推入数组末尾，并且声称一个新数组
                                dirAll.push(obj)
                            }else{
                                fileAll.push(obj)
                            }
                            
                        // 错误 sort里面传入的是回调函数名称,
                            if((fileAll.length+dirAll.length)==data.length){
                                // sort方法，将数组中的对象的属性name隐士转换编码后进行比较再排序 不会重新
                                dirAll.sort(getName)
                                fileAll.sort(getName)
                                // concat方法用于连接两个或多个数组。只会返回一个副本
                                dirAll=dirAll.concat(fileAll)
                                // 模板引擎渲染好界面发送给用户
                                var html=template(__dirname+"/xx/list.html",{list:dirAll})
                                res.end(html)
                            }
                        }
                    })
                }
            }
        })
    }
})
function getName(x,y){
    if(x.name>y.name){
        return 1
    }else{
        return -1
    }
}
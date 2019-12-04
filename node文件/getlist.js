var fs = require("fs")
var moment = require("module")
function getlist(url, callback) {
    fs.readdir(__dirname +"/"+ url, function (err, data) {
        if (err) {
            callback(err)
        } else {
            var dirAll = []
            var fileAll = []
            // 使用let声明,将在这个循环内产生作用域
            for (let i = 0; i < data.length; i++) {
                // stat方法可以获取指定全路径所对应的文件夹和文件的对象，对象中有相应的属性
                fs.stat(__dirname + "/" + data[i], function (err1, stats) {
                    if (err1) {
                        callback(err1)
                    } else {
                        // 新建对象，将遍历出来的每个数据推入数组中
                        // 由于是异步的方式识别文件
                        var obj = {}
                        obj.name = data[i]
                        obj.size = stats.size
                        obj.mtime = moment(stats.mtime).format('YYYY-MM-DD HH:mm:ss')
                        obj.isFile = stats.isFile()
                        if (obj.isFile) {
                            // push 将元素推入数组末尾，并且声称一个新数组
                            dirAll.push(obj)
                        } else {
                            fileAll.push(obj)
                        }

                        // 错误 sort里面传入的是回调函数名称,
                        if ((fileAll.length + dirAll.length) == data.length) {
                            // sort方法，将数组中的对象的属性name隐士转换编码后进行比较再排序 不会重新
                            dirAll.sort(getName)
                            fileAll.sort(getName)
                            // concat方法用于连接两个或多个数组。只会返回一个副本
                            dirAll = dirAll.concat(fileAll)
                            // 模板引擎渲染好界面发送给用户

                            // node中回调函数参数是错误优先
                            callback(null, dirAll)
                        }
                    }
                })
            }
        }
    })
}
function getName(x, y) {
    if (x.name > y.name) {
        return 1
    } else {
        return -1
    }
}
function getsize(x, y) {
    if (x.size > y.size) {
        return 1
    } else {
        return -1
    }
}
// 这里上面的两个函数,并不需要暴露,模块自己使用的
module.exports = getlist
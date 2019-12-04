var fs=require("fs")
module.exports.getDataAll=function(callback){
    fs.readFile(__dirname + "/../vive/heros.json", "UTF-8",function (err, data) {
        if (err) {
            callback(err)
        } else {
            callback(null,data)
        }
    })
}
var fs=require("fs")
fs.appendFile("../xx/cs.txt","追加的内容",function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log("成功")
    }
})
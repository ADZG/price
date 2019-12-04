var fs=require("fs")
fs.writeFile("../xx/cs.txt","新内容",function(err){
    if(err){
        console.log(err)
    }else{
        console.log("ok")
    }
})
var controller =require("./controller")
function rounter(res,req){
    if (req.url == "/" && req.method == "GET") {
        controller.getIndexPage(req,res)
    } else if (req.url.indexOf(/css/) !== -1 || req.url.indexOf(/images/) !== -1) {
        controller.getStaticSource(req,res)
    }
}
module.exports=rounter
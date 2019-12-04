// - 获取动态英雄主页 type :get  url:/
// - 获取添加英雄的静态页面:type:get    url:/add
// - 实现文件上传:type:post   url:/uploadFile
// - 实现用户数据的新增:type:post   url:/add
// - 获取编辑动态页面:type:get    url: /edit
// - 实现用户编辑操作:type:post   url:/edit
// - 实现删除动操作:type:get    url:/del
var express=require("express")
var controller=require("./controller")//启用控制器
router=express.Router() //  启用框架中的路由//
router.get("/",controller.getIndex)//添加监听get请求，/ 
      .get("/add",controller.getAdd) 
      .post("/uploadFile",controller.uploadFile)
      .post("/add",controller.doHeros)
      .get("/edit",controller.getEdit)
      .post("/edit",controller.upEdit)
      .get("/del",controller.delHeros)
module.exports=router//暴露路由
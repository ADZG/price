var express=require("express")
// 启用框架模块
var controller=require("./controller")
// 启用控制器模块
var router=express.Router()
// 挂载模块中路由的方法

router.get("/",controller.getIndex)
      .get("/add", controller.getEdd)
// 暴露成员
module.exports=router
// - 获取添加英雄的静态页面:type:get    url:/add
// - 实现文件上传:type:post   url:/uploadFile
// - 实现用户数据的新增:type:post   url:/add
// - 获取编辑动态页面:type:get    url: /edit
// - 实现用户编辑操作:type:post   url:/edit
// - 实现删除操作:type:get    url:/del
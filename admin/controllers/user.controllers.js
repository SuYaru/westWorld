const mongoose=require('mongoose');

var User= require('../models/user.model');
var jwt=require('jsonwebtoken');
exports.create = function(req,res,next){
    const user = new User(req.body);
    var myDate = new Date();
    user.time = myDate;
    user.save().then(data=>res.json(data));
}

exports.update=function(req,res,next){
    const id=req.params.id;
    User.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
        res.json(data);
    });
}
exports.remove=function(req,res,next){
    const id=req.params.id;
    User.findByIdAndDelete(id,(err,data)=>{
        res.json(data);
    });
}
exports.removes=function(req,res,next){
    const ids=req.body.ids.split(',');
    if(ids.length>0){
        User.deleteMany({_id:{$in:ids}}).then(data=>{
            res.json({"message":'所选数据已经被删除'});
        });
    }
}
exports.list=function(req,res,next){
    // 这里如果删除了第2页的最后1个数据，但是从第2页开始就没有数据了
    // 这里怎么办？

    var page=req.body.page ?req.body.page:1;
    var rows=req.body.rows ? req.body.rows :10;

    var queryCondition = {};
    if(req.body.name && req.body.name.trim().length>0){
      queryCondition = {
          "name": new RegExp(req.body.name,'i')
        }
    }

    // 原代码
    /* User.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
      result.rows = result.docs;
      delete result.docs;
     res.json(result);
    });*/

    // 但是如果第二页的第一个数据被删除，应该跳转到第一页。这里传入的 page 在传入的地方无法更改
    // page 都是设置在 Base.js 里，不是独有页面可以更改的
    // 表单重置也无法获取新的页面。当前页数只有在后台查询之后，才知道有多少数据
    // 如果
    User.paginate(queryCondition,{page:+page,limit:+rows},function(err,result){
        result.rows=result.docs;
        delete result.docs;
        if(result.rows.length==0 && page>1){
            User.paginate(queryCondition,{page:+(page-1),limit:+rows},function(err,result01){
                result01.rows=result01.docs;
                delete result01.docs;
                res.json(result01);
            });
        }else{
            res.json(result);
        }
    });

}

exports.getById=function(req,res,next){
    var id=req.params.id;
    User.findById(id).then(data=>{
        res.json(data);
    });
}

exports.login=function(req,res,next){
    // 拿到一个口令，但是口令根据什么来的？
    // jwt 根据用户信息给出 token
    User.findOne(req.body,function(err,result){
        var user=JSON.parse(JSON.stringify(result));
        delete user.password;
        jwt.sign({result},'westWorldSecret',(err,token)=>{
            user.token=token;
            res.json(user);
        })
    });
    // postman 请求时，返回token 值
    /* jwt.sign({user},'westWorldSecret',(err,token)=>{
        res.json({token});
    }) */
}
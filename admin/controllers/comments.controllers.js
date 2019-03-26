const mongoose=require('mongoose');

var Comments= require('../models/comments.model');

exports.create=function(req,res,next){
    /* const user=new User({name:'dadda',password:"2wer",age:23123}); */
    const comments=new Comments(req.body);
    comments.save().then((data)=>res.json(data));
}

exports.update=function(req,res,next){
    const id=req.params.id;
    Comments.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
        res.json(data);
    });
}
exports.remove=function(req,res,next){
    const id=req.params.id;
    Comments.findByIdAndDelete(id,(err,data)=>{
        res.json(data);
    });
}
exports.removes=function(req,res,next){
    const ids=req.body.ids.split(',');
    if(ids.length>0){
        Comments.deleteMany({_id:{$in:ids}}).then(data=>{
            res.json({"message":'所选数据已经被删除'});
        });
    }
}
exports.list=function(req,res,next){
    var page=req.body.page ?req.body.page:1;
    var rows=req.body.rows ? req.body.rows :1;
    var queryCondition = {};
    if(req.body.name && req.body.name.trim().length>0){
        queryCondition["title"]=new RegExp(req.body.name,'i')
    }

    if(req.body.newsId && req.body.newsId.trim().length>0){
        queryCondition['newsId']=req.body.newsId
    }

    // page limit 是字符串类型
    Comments.paginate(queryCondition,{page:+page,limit:+rows},function(err,result){
        result.rows=result.docs;
        delete result.docs;
        res.json(result);
    });
}

exports.getById=function(req,res,next){
    var id=req.params.id;
    Comments.findById(id).then(data=>{
        res.json(data);
    });
}
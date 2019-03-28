const mongoose = require('mongoose');
var async = require('async');
var CateClassify = require('../models/cateClassify.model');

  exports.create = function(req, res, next) {
      //console.log(675675);
      const cateClassify = new CateClassify(req.body);

      cateClassify.save().then((data) => res.json(data));
  }

  exports.update = function(req,res,next){
    const id = req.params.id;
    CateClassify.findByIdAndUpdate(id,{$set: req.body},{new:false}).then(data=>{
      res.json(data);
    })
  }

  exports.remove = function(req,res,next){
     //console.log(req.params.id);
     // 这里存在异步问题，也许当还没删除完毕，就直接res 了，这里要等
     // 删除完毕再回调
      async.series({
          one: function(callback){
                removeRecursive(req.params.id);
                callback(null);   // 一定要有回调，即使为空。否则不能继续下一步
          },
          two: function(callback){
                res.json('删除成功');
                callback(null);
          }
      })
  }

  // 递归删除节点
  function removeRecursive(targetId){
    // 找到父节点是id 的节点，，递归删除
    CateClassify.findById(targetId).then(data=>{
      // 查询是否有同类型且父节点为 当前id 的子节点，有则递归删除；没有则删除当前节点
      CateClassify.find({type:data.type,parentId:data._id}).then(data=>{
         if(data.length>0){
            data.forEach(function(value,index){
              removeRecursive(value._id);
            })
          }
          CateClassify.findByIdAndDelete(targetId,(err,data)=>{
          });
      });
    })
  }

  // pid === parentId
  function reverseTree(data,pid){
    var result = [], temp;
    // data的对象是什么对象？model数据模型的对象
    // 数据模型的对象转成字符串，再转成对象，而这时候的对象变成了JsonObject
    var data = JSON.parse(JSON.stringify(data));
    for(var i in data){
      if(data[i].parentId === pid){ // 如果查询到的对象内容的parentId和传递过来的pid是相同的
          result.push(data[i]);
          temp = reverseTree(data,data[i]._id);
          if(temp.length >0){
            data[i].children = temp;
          }
      }
    }
    return result;
  }

  exports.list = function(req,res,next){
      CateClassify.find(function(err,data){
          res.json(data);
      });
  }

  exports.get = function(req,res,next){
      const id = req.params.id;
      CateClassify.findById(id).then(data=>{
        res.json(data);
      })
  }
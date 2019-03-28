var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');

// var User=require('../models/user.model');   // 引入用户实例
//const Cat = mongoose.model('Cat', { name: String });
/* const mongoose = require('mongoose');
mongoose.connect('mongodb://10.31.162.31:27017/test0307', {useNewUrlParser: true}); */
var dataCtrl=require('../controllers/user.controllers');

// 自定义一个中间件
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    //console.log(bearerHeader);

    if(typeof bearerHeader !== 'undefined'){
        const bearer =bearerHeader.split(" ");
        const bearerToken =bearer[1];
        //console.log(bearerToken);
        // verify 验证传入的Token
        // next() // 继续之后的操作
        jwt.verify(bearerToken,'westWorldSecret',(err,decoded)=>{
            if(decoded!=='undefined'){
                next();
            }else{
                res.sendStatus(403);
            }
            console.log(decoded);

        })
    }else{
        res.sendStatus(403);
    }
}

router.post('/',dataCtrl.create);
router.put('/:id',dataCtrl.update);
router.delete('/:id',dataCtrl.remove);
router.post('/list',verifyToken,dataCtrl.list); // 用户列表是私有的，只有允许口令的人才可以访问.    自定义中间件，在每次访问列表时调用
router.get('/:id',dataCtrl.getById);
router.post('/removes',dataCtrl.removes);
router.post('/login',dataCtrl.login);


module.exports = router;

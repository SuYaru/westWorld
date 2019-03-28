var express = require('express');
var router   = express.Router();
var dataCtrl = require('../controllers/cateClassify.controller');

router.post('/', dataCtrl.create);
router.put('/:id', dataCtrl.update);
router.delete('/:id', dataCtrl.remove);
router.post('/list', dataCtrl.list);
router.get('/:id', dataCtrl.get);


module.exports = router;


/*
  http:   //localhost:3000/users         post
  http:   //localhost:3000/users/123     put
  http:   //localhost:3000/users/123     delete
  http:   //localhost:3000/users/123     get
  http:   //localhost:3000/users/list
*/
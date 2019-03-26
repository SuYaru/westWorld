const mongoose = require('mongoose');
const mongoosePaginate= require('mongoose-paginate');

var schema=new mongoose.Schema({
    newsId:mongoose.Schema.ObjectId,
    title: String,
    content:String,
    keyWords:String,
    author:String,
    date:{type:Date,default:Date.now}
});
schema.plugin(mongoosePaginate);
module.exports=mongoose.model('News',schema);;
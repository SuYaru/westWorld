const mongoose = require('mongoose');
const mongoosePaginate= require('mongoose-paginate');

var schema=new mongoose.Schema({
    newsId:mongoose.Schema.ObjectId,
    title: String,
    content:String,
    date:{type:Date,default:Date.now}
});
schema.plugin(mongoosePaginate);
// const User = mongoose.model('Users', { name: String,password:String,age:Number });


module.exports=mongoose.model('Comments',schema);;
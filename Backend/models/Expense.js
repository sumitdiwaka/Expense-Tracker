const moongoose = require('mongoose')
// const { applyTimestamps } = require('./User')
const ExpenseSchema = new moongoose.Schema({
    userId:{type:moongoose.Schema.Types.ObjectId,ref:"User", required:true},
    icon:{type:String},
    category:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
},  {timestamps:true});

module.exports = moongoose.model('Expense',ExpenseSchema);

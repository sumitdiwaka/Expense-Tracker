const xlsx = require('xlsx');
const User = require('../models/User')
const Expense = require('../models/Expense')



//Add Expense Source
exports.addExpense = async(req,res) =>{
    const userId = req.user.id;
    try{
        const {icon,category,amount,date} =req.body

        //Validation check for missing Fields
        if( !category || !amount || !date){
            return res.status(400).json({msg: 'Please fill in all fields'})
            }
            const newExpense = new Expense({
                userId,
                icon,
                category,
                amount,
                date:new Date(date)
            });
            await newExpense.save();
            res.status(200).json({newExpense})
    }
    catch(error){
          res.status(500).json({message:"Server Error "})
          console.log(error)
    }
}

//Get All Expense Source
exports.getAllExpense = async(req,res) =>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1})
        res.json(expense)
        }
        catch(error){
            res.status(500).json({message:"Server Error "})
            console.log(error)
        }
}

//Delete Expense Source
exports.deleteExpense = async(req,res) =>{
    const userId = req.user.id;
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({msg: 'Expense deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:"Server Error "})
        console.log(error)
    }
}

//Download Expense Excel
exports.downloadExpenseExcel = async(req,res) =>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});

        //Prepare Data For Excel
        const data = expense.map((item) =>({
            category:item.category,
            Amount:item.amount,
            Date:item.date,
            }))
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Income');
            xlsx.writeFile(wb,'Expense_Details.xlsx')
            res.download('Expense_Details.xlsx')
            }
            catch(error){
                res.status(500).json({
                    message:"Server Error "})
                    console.log(error)
                }
};
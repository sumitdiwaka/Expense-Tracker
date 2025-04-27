const xlsx = require('xlsx');
const User = require('../models/User')
const Income = require('../models/Income')



//Add Income Source
exports.addIncome = async(req,res) =>{
    const userId = req.user.id;
    try{
        const {icon,source,amount,date} =req.body

        //Validation check for missing Fields
        if( !source || !amount || !date){
            return res.status(400).json({msg: 'Please fill in all fields'})
            }
            const newIncome = new Income({
                userId,
                icon,
                source,
                amount,
                date:new Date(date)
            });
            await newIncome.save();
            res.status(200).json({newIncome})
    }
    catch(error){
          res.status(500).json({message:"Server Error "})
          console.log(error)
    }
}

//Get All Income Source
exports.getAllIncome = async(req,res) =>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1})
        res.json(income)
        }
        catch(error){
            res.status(500).json({message:"Server Error "})
            console.log(error)
        }
}

//Delete Income Source
exports.deleteIncome = async(req,res) =>{
    const userId = req.user.id;
    try{
        await Income.findByIdAndDelete(req.params.id)
        res.json({msg: 'Income deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:"Server Error "})
        console.log(error)
    }
}

//Download Excel
exports.downloadIncomeExcel = async(req,res) =>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});

        //Prepare Data For Excel
        const data = income.map((item) =>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date,
            }))
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Income');
            xlsx.writeFile(wb,'Income_Details.xlsx')
            res.download('Income_Details.xlsx')
            }
            catch(error){
                res.status(500).json({
                    message:"Server Error "})
                    console.log(error)
                }
};
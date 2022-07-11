const Expense = require('../models/expense-model')

const insertExpense = (req, res) => {
   const reqBody = req.body;

    if(!reqBody){
        return res.status(400).json({
            success : false,
            error: 'Please enter correct expense'
        })
    }
    var expense = new Expense();
    expense.description = req.body.desc;
    expense.amount = req.body.amount;
    expense.month = req.body.month;
    expense.year = req.body.year;
    if(!expense){
        console.log('Expense not created');
        return res.status(400).json({
            success : false,
            error: 'Expense not created. Please try again'
        })
    }
    expense
        .save()
        .then(()=> {
            return res.status(200).json({
                success : true,
                message : 'Expense created successfully',
                
            })
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message : 'Expense not created. Please try again'
            })
        })
   }


const updateExpense = (req, res) => {
  const reqBody = req.body;

    if(!reqBody){
        return res.status(400).json({
            success : false,
            error: 'Please enter a valid details'
        })
    }
    Expense.findOne({ _id : req.param.id} , (error, movieDetails) => {
        if(error){
            return res.status(400).json(
                {
                    error,
                    message : 'Expense not found. Please try again'
                }
            )
        }
        Expense.description = reqBody.description;
        Expense.amount = reqBody.amount;
        Expense.month = reqBody.month;
        Expense.year = reqBody.year;
        Expense
        .save()
        .then(() => {
            return res.status(200).json({
                success : true,
                id : Expense._id,
                message : 'Expense successfully updated'
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message : 'Expense not updated. Please try again.'
            })
        })
    })
}

const getAllExpenses = async (req, res) => {
 try{
    let expenses = await Expense.find()
    
    if (!expenses.length) {
       return res
         .status(404)
           .json({ success: false, error: `No expense in your account` })
   }
    return res.status(200).json({ success: true, data: expenses })

   } catch(err){
    return res.status(400).json({
        error: err,
        message: 'id issue' 
      })
      

   }
}
  



const deleteExpense = async (req, res) => {
    
    const reqBody = req.body;
    if(!reqBody){
        return res.status(400).json({
            success : false,
            error: 'Please select valid expense to delete'
        })
    }
    await Expense.findByIdAndDelete({ _id: req.query.id }, (error, expense) => {
        if(error){
            return res.status(400).json({
                success : false,
                error
            })
        }
        if(!expense){
            return res.status(404).json({
                success : false,
                message : 'Expense not found '
            })
        }
        return res.status(200).json({
            success : true,
            message : 'Expense deleted successfully',
            data : expense
        })
    }).catch(error => {
        return res.status(400).json({
            success : false,
            error
        })
    })
}

const getAllExpensesMock = async (req, res) => {
    // console.log("Inside getAll expense block")
    // try {
    //     console.log("inside try block")
    //     let users = await Expense.find()
    //     res.json(users)
    //   } catch (err) {
    //     console.log("Inside catch block")
    //     return res.status(400).json({
    //       error: err
    //     })
    //   }

   /* Expense.find({ year: 2022}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("First function call : ", docs);
        }
    });
      */
    res.send({data: 'Hello World, from express'});

}

module.exports = {
   insertExpense,
   updateExpense,
   deleteExpense,
    getAllExpenses,
    getAllExpensesMock
}
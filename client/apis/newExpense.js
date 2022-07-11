import axios from 'axios';

export const insertNewExpense = (data) =>{
    axios.post('/insert',
      {
        desc: data.description,
        amount: data.amount,
        month: data.month,
        year: data.year
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
          console.log("Expense inserted successfully")
      return response.data;
    })
    .catch(function (error) {
        console.log(error);
      });
  }
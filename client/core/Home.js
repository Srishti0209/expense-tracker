
import React, { useState, useEffect } from 'react';
import {  Container } from 'reactstrap';
import {Button} from 'react-bootstrap';
import ExpenseList from './ExpenseList';
//dummy data -- need to be removed once api is setup
const ALL_EXPENSES = [
  { id: 1, description: 'Buy a book', amount: 20, year: 2022, month: 'May' },
  { id: 2, description: 'Buy a milk', amount: 5, year: 2022, month: 'June' },
  { id: 3, description: 'Book a flight ticket', amount: 225, year: 2022, month: 'July' }
]

export default function Home(){
  const [expenses, setExpenses] = useState(ALL_EXPENSES) // to store list of all the expenses
  //const {isShowing, toggle} = useModal();
  
   //  use useEffect to load the list of expenses from the server -- willmount
   useEffect(() => {
   function getAllExpenses() {
      const headers = {'Content-Type': 'application/json'}
      fetch(`http://localhost:3000/getAllExpense`, { method: 'GET' })
        .then(response => { /*

        un-comment it once issue is resolved

          const data = await response.json();
          if (!data.success) {
            const message = `An error occurred: ${data.message}`;
          // const error = (data && data.message) || response.statusText;
            window.alert(message);
            return Promise.reject(message);
          }
          setExpenses(data.data);
        */
          response.json()
        
        }
  )
  .then(json => alert(JSON.stringify(json)))
  .catch(error => {
    console.error('There was an error!', error);
  })
     
  
 
    }
  
    getAllExpenses();
  
    return;
  }, [expenses.length]);

      //Delete an expense
      async function deleteExpense(id) {
        const response = await fetch(`http://localhost:8000/${id}`);
        if (!response.success) {
         const message = `An error occurred: ${response.message}`;
         window.alert(message);
         return;
       }
         const newExpenses = expenses.filter((expense) => expense._id !== id);
         setExpenses(newExpenses);
       }

  const toggle = () => {
    console.log("hello in toggle block");
  }
  return (
        <>
          <Container className = 'text-center'>
            <div>
                <h3 className="display-6">
                Welcome to Expense Tracking Application
                </h3>
                <div>
                    <p>
                      Total Expense:{' '}
                     <span className="text-success">
                        ${' '}
                        {expenses.reduce((accumulator, currentValue) => {
                        return (accumulator += parseInt(currentValue.amount))
                        }, 0)}
                     </span>
                    </p>
                </div>
            </div>
     {/*<Button bsStyle="success" bsSize="small" onClick={toggle}><span className="glyphicon glyphicon-plus"></span></Button>*/ } 
      {
          expenses?.length > 0 && <ExpenseList expenses = {expenses} deleteExpense = {deleteExpense}></ExpenseList> 
      }

       {/*<Modal
        isShowing={isShowing}
        hide={toggle}
        addExpense = {insertNewExpense}
      >
          
          </Modal>
    */}

        </Container>
         
        </>
    )
}

import React from 'react'
import Record from './Record';



export default function ExpenseList(props) {

    // This method will map out the expenses on the table
  const ListExpense = () => {
    return props.expenses.map((expense) => {
      return (
       <Record
          expense={expense}
          deleteExpense={() => props.deleteExpense(expense._id)}
          key={expense._id}
        />
      );
    });
  }

  return(
    <div>
        <h3>Expense List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Month</th>
                <th>Year</th>
                <th>Action</th>
            </tr>
       </thead>
       <tbody>{ListExpense()}</tbody>
     </table>
</div>
  );


}
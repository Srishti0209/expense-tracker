import React from "react";
import { Link } from "react-router-dom";

export default function Record(props) {
  return (
    <tr>
      <td>{props.expense.description}</td>
      <td>{props.expense.amount}</td>
      <td>{props.expense.month}</td>
      <td>{props.expense.year}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.expense._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteExpense(props.expense._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
)};
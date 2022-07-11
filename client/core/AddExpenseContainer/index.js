import React, { useState } from "react";
import { useNavigate } from "react-router";
import ReactMonthPicker from "react-month-picker";
import "react-month-picker/css/month-picker.css";


export const AddExpense = () => {
    const defaultExpense = {
        description: '',
        amount: '',
        month: '',
        year: ''
    }
    const [form, setForm] = useState(defaultExpense);

    const [isVisible, setVisibility] = useState(false);
    const [month, setMonth] = useState("Jan");
    const navigate = useNavigate();

    // To set visibility of Month Picker
    const showMonthPicker = event => {
        setVisibility(true);
        event.preventDefault();
    };

    // To set visibility of month picker as false on dismiss
    const handleOnDismiss = () => {
        setVisibility(false);
    };

    //Handle onChange for month Picker
    const handleOnChange = (year, month) => {
        setMonth(month);
        updateForm({ month: month })
        setVisibility(false);
    };

    //Get the month value
    const getMonthValue = () => {
        const month = month ? month : 0;
       // const year = monthYear && monthYear.year ? monthYear.year : 0;
    
        return month ? `${month}` : "Select Month";
    };

    // To update the state property
    const updateForm =(value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
     }
     // This function will handle the submission.
    const onSubmit = async(e) => {
        e.preventDefault();
  
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newExpense = { ...form };
  
        await fetch("http://localhost:3000/expense/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExpense),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
  
        setForm(defaultExpense);
        navigate("/");
    }
    return (
        <div>
             <h3>Lets create the New Expense</h3>
             <form onSubmit={onSubmit}>
                <div className="form-group">
                <label htmlFor="description">Expense Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Total Amount Spent</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    {/*<label htmlFor="month">Month</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={form.month}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
        */}
                    <div className="MonthYearPicker">
                    <button onClick={showMonthPicker}>{getMonthValue()}</button>

                        <ReactMonthPicker
                            show={isVisible}
                            lang={[
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                            ]}
                            value={monthYear}
                            onChange={handleOnChange}
                            onDismiss={handleOnDismiss}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Please Enter the year</label>
                    <input
                        type="text"
                        className="form-control"
                        id="year"
                        value={form.year}
                        onChange={(e) => updateForm({ year: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Expense"
                        className="btn btn-primary"
                    />
                </div>
            </form>
    </div>
    )
}

export default AddExpense;
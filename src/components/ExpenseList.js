import React from 'react';
import { connect } from 'react-redux';

import { getVisibleExpenses } from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem';

//how to present
const ExpenseList =(props)=>(
    <div>
        <h1>this is expense list..</h1>
        {props.expenses.map( (expense)=>{
            return <ExpenseListItem key={expense.id} {...expense}/>
        })}
        
    </div>
);

//making state available as props for ExpenseList
const mapStateToProps = (state)=>{
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
}

//connecting ExpenseList and mapStateToProps
const connectedExpenseList= connect( mapStateToProps )(ExpenseList);

export default connectedExpenseList;
import { CreateStore, combineReducers, createStore } from "redux";
import uuid from "uuid";

//Add Expense
const addExpense = ({description = "",note = "",amount = 0,createdAt = 0} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

//did little change from lecture code, as it was not working for me
const editExpense = ({ id, amount } = {}) => ({
  type: "EDIT_EXPENSE",
  id,
  expense: {
    amount
  }
});

const setTextFilter = (text = "") => {
  return {
    type: "SET_TEXT_FILTER",
    payload: { text }
  };
};

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const setStartDate= (startDate)=>({
  type:'SET_START_DATE',
  startDate
});

const setEndDate= (endDate)=>({
  type:'SET_END_DATE',
  endDate
});


const getVisibleExpenses=(expenses, { text, sortBy, startDate, endDate })=>{
  return expenses.filter( (expense) => {
    const startDateMatch= typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch= typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch= expense.description.toLowerCase().includes(text.toLowerCase());
    
    //console.log('start:' + expense.startDate >= startDate + ' end: ' + endDateMatch);
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b)=>{
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1: -1;
    }
    else if(sortBy=== 'amount'){
      return a.amount < b.amount ? 1: -1;
    }
  });
  
};

//Expense Readucer
const expenseReducerDefault = [];

const expensesReducer = (state = expenseReducerDefault, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    case "EDIT_EXPENSE":
      // return state.map((expense)=> {
      //     if (expense.id === action.id){
      //        return{ ...expense,...action.updates };
      //     }else{
      //         return expense;
      //     }
      // });
      return state.map(expense => expense.id === action.id ? { ...expense, ...action.expense } : expense);
    default:
      return state;
  }
};

//Filter Reducer
const filterReducerDefault = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filterReducerDefault, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.payload.text };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case 'SET_START_DATE':
      return {...state, startDate: action.startDate};
    case 'SET_END_DATE':
      return {...state, endDate: action.endDate};

    
    default:
      return state;
  }
};

//Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state= store.getState();
  const visibleExpenses= getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

 const expenseOne = store.dispatch(addExpense({ description: "rent", amount: 100, createdAt: -210000 }));
 const expenseTwo = store.dispatch(addExpense({ description: "coffee", amount: 200, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense({ id: expenseTwo.expense.id, amount: 500 }));

 //store.dispatch(setTextFilter("Coffee"));

// store.dispatch(sortByAmount());
 store.dispatch(sortByDate());

 //store.dispatch(setStartDate(999));
 //store.dispatch(setStartDate());

 //store.dispatch(setEndDate(125));



const demoState = {
  expenses: [
    {
      id: "kdk",
      description: "Jan rent",
      note: "last rent",
      amount: 500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortyBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};

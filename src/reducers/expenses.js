//Expense Readucer
const expenseReducerDefault = [];

export const expensesReducer = (state = expenseReducerDefault, action) => {
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
      return state.map(expense => expense.id === action.id ? { ...expense, ...action.updates } : expense);
    default:
      return state;
  }
};

//export default expensesReducer;
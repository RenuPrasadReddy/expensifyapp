import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import {addExpense} from './actions/expenses';
// import {setTextFilter } from './actions/filters'
 import  {getVisibleExpenses} from './selectors/expenses';

const store= configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 200 }));
store.dispatch(addExpense({ description: 'Gas Bill', createdAt:1000 }));
store.dispatch(addExpense({ description: 'rent', amount: 5000 }));

//store.dispatch(setTextFilter('water'));
// const state=store.getState();
store.subscribe(()=>{
    const state= store.getState();
    const visibleExpenses= getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
 


//provider allows store for all components
const jsx= (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));

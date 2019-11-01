import moment from 'moment';

import { getVisibleExpenses } from '../../selectors/expenses';



const expenses= [{
    note: '1',
    description: 'Gum',
    note: '',
    amount: 100,
    createdAt: 0
},{
    note: '2',
    description: 'Rent',
    note: '',
    amount: 19500,
    createdAt: moment(0).subtract(4,'days').valueOf()
},{
    note: '3',
    description: 'credit card',
    note: '',
    amount: 4500,
    createdAt:  moment(0).add(4,'days').valueOf()
}];

test('should filter by text value..', () => {
    const filters={
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result= getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate value..', () => {
    const filters={
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result= getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

// test('should filter by endDate value..', () => {
//     const filters={
//         text: '',
//         sortBy: 'date',
//         startDate: undefined,
//         endDate: moment(0).add(2,'days').valueOf()
//     }
//     const result= getVisibleExpenses(expenses, filters);
//     expect(result).toEqual([expenses[0], expenses[1]]);
// });

test('should filter by date value..', () => {
    const filters={
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result= getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0],expenses[1]]);
});

test('should filter by amount value..', () => {
    const filters={
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result= getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2],expenses[0]]);
});
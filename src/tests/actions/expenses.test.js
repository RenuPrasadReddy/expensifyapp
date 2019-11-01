import { addExpense, removeExpense, editExpense } from '../../actions/expenses';


test('remove expense action object..', () => {
    const action= removeExpense({id: '123'});
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id: '123'
    });
});

test('edit expense...', ()=>{
    const action = editExpense('123', {note: 'new note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates:{
            note: 'new note value'
        }
    });
});

test('add expense with data', () => {
    const expenseData = {
        description: 'rent',
        amount: 1000,
        createdAt: 1000,
        note: 'Oct month'
    };

    const action= addExpense(expenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id: expect.any(String)
    }
    })
});

test('addExpense without data (default)', () => {
    const action= addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});

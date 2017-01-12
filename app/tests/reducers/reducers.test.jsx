var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('Should set search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };

            var res = reducers.searchTextReducer(df(''), df(action));
            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('Should toggle showCompleted status', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(df(false), df(action));
            expect(res).toEqual(true);
        });
    });

    describe('todosReducers', () => {
        it('Should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: '123123',
                    text: 'something to do',
                    completed: false,
                    createdAt: 123123
                }
            };

            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('Should update todo', () => {
            var todo = [{
                id: 123,
                text: 'WALK THE DOGGO',
                completed: true,
                createdAt: 'BLAH BLAH',
                completedAt: '1:00 PM'
            }];
            var updates = {
                completed: false,
                completedAt: null
            };
            var action = {
                type: 'UPDATE_TODO',
                id: todo[0].id,
                updates
            };

            var res = reducers.todosReducer(df(todo), df(action));

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todo[0].text);
        });

        it('Should add existing todos', () => {
            var todos = [{
                id: 111,
                text: 'anything',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            
            var action = {
                type: 'ADD_TODOS',
                todos
            };

            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });

    describe('authReducers', ()=>{
        it('should add uid', ()=>{
            var action = {
                type: 'LOGIN',
                uid: 'jskf2342'
            };
            var res = reducers.authReducer(undefined, df(action));
            expect(res).toEqual({
                uid: action.uid
            });
        });
        it('should remove uid', ()=>{
            const authData = {
                uid: '123asc'
            };
            var action = {
                type: 'LOGOUT'
            };
            var res = reducers.authReducer(df(authData), df(action));
            expect(res).toEqual({});
        });
    });
});
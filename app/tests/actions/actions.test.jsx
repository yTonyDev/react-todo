import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('Should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        };

        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('Should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };

        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('Should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: '123123',
                text: 'something to do',
                completed: false,
                createdAt: 123123
            }
        };

        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should create todo and dispatch ADD_TODO', (done)=>{
        const store = createMockStore({});
        const todoText = 'My todo item';
        store.dispatch(actions.startAddTodo(todoText)).then(()=>{
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            done();
        }).catch(done);
        
        done();
    });

    it('Should generate add todos action', () => {
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

        var res = actions.addTodos(todos);

        expect(res).toEqual(action);
    });

    it('Should generate toggle todo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: '1'
        };

        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
}); 
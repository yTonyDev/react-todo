import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');
import firebase, {firebaseRef} from 'app/firebase/';
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
            type: 'UPDATE_TODO',
            id: '1',
            updates: {completed: false}
        };

        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    describe('Tests with firebase todos', () => {
        var testTodoRef;
        var uid;
        var todosRef;

        beforeEach((done)=>{
            firebase.auth().signInAnonymously().then((user)=>{
                uid = 'abc123';
                todosRef = firebaseRef.child(`users/${uid}/todos`);
                return todosRef.remove();
            })
            .then(()=>{
                testTodoRef = todosRef.push();
                
                return testTodoRef.set({
                    text: 'something to do',
                    completed: false,
                    completedAt: 2342342
                });
            })
            .then(()=>done())
            .catch(done);
        });

        afterEach((done)=>{
            todosRef.remove().then(()=>done());
        });

        it('should toggle todo and dispatch UPDATE_TODO action', (done) =>{
            const store = createMockStore({auth:{uid}});
            const action = actions.startToggleTodo(testTodoRef.key, true);
            store.dispatch(action).then(()=>{

                const mockActions = store.getActions();
                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();
                
                done();

            },done);
        });

        it('should add todos and dispatch ADD_TODOS action', (done) =>{
            const store = createMockStore({auth:{uid}});
            const action = actions.startAddTodos();
            store.dispatch(action).then(()=>{

                const mockActions = store.getActions();
                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('something to do');
                done();

            },done);
        });

        it('should create todo and dispatch ADD_TODO', (done)=>{
            const store = createMockStore({auth:{uid}});
            const todoText = 'My todo item';
            store.dispatch(actions.startAddTodo(todoText)).then(()=>{

                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: 'ADD_TODO'
                });

                done();

            }, done);
        });

    });

    describe('Auth action', ()=>{
        it('should grab uid and dispatch LOGIN action', () => {
            const uid = 'skjdfhsjdk2342';
            const action = {
                type: 'LOGIN',
                uid
            };

            const res = actions.login(action.uid);
            expect(res).toEqual(action)
        });

        it('should remove uid and dispatch LOGOUT action', () => {
            const action = {
                type: 'LOGOUT'
            };
            const res = actions.logout();
            expect(res).toEqual(action);
        });
    });
}); 
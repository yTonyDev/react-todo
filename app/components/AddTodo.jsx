var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
    onSubmit: function(e){
        e.preventDefault();
        var {dispatch} = this.props;
        var newTodo = this.refs.newTodo.value;
        if(newTodo.length > 0){
            this.refs.newTodo.value = "";
            dispatch(actions.addTodo(newTodo));
        } else {
            this.refs.newTodo.focus();
        }
    },
    render: function(){
        return (
            <div className="container__footer">
                <form ref="form" onSubmit={this.onSubmit}>
                    <input type="text" ref="newTodo" placeholder="What do you need to do?"/>
                    <button className="button expanded">Add todo</button>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodo);

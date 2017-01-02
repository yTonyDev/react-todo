var React = require('react');

var AddTodo = React.createClass({
    onSubmit: function(e){
        e.preventDefault();
        var newTodo = this.refs.newTodo.value;
        if(newTodo.length > 0){
            this.refs.newTodo.value = "";
            this.props.onAddTodo(newTodo);
        } else {
            this.refs.newTodo.focus();
        }
    },
    render: function(){
        return (
            <div>
                <form ref="form" onSubmit={this.onSubmit}>
                    <input type="text" ref="newTodo" placeholder="What do you need to do?"/>
                    <button className="button hollow">Add todo</button>
                </form>
            </div>
        );
    }
});

module.exports = AddTodo;

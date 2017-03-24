//React, Todo items array and task creation component.
import React from 'react';
const todos=[{"toDoItem":"Finish React Projects","completed":true},
{"toDoItem":"Update Graphics for websites","completed":false}]
import CreateTodo from './create-todo'
import _ from 'lodash'


//Main app element


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      todos
    };
  }
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>React ToDo App
        <ToDoApp
                    todos={this.state.todos}
                    toggleTodo={this.toggleTodo.bind(this)}/>
      </h1>

    </div>
    );
  }
  toggleTodo(toDoItem){
    const findTodo= _.find(this.state.todos, todo => todo.toDoItem  === toDoItem );
    findTodo.completed=!findTodo.completed
    this.setState({todos:  this.state.todos})
  }


}



//The app itself. The todo array was linked trough the JSX element.


class ToDoApp extends React.Component {
//todos becomes var when defined with JSX element above
//For each param in todos array, it will return a ToDos list element
  renderItems(){
    const props = _.omit(this.props, 'todos');

         return _.map(this.props.todos, (todo, index) => <ToDosListItem key={index}
           saveTodo={this.saveTodo.bind(this)}
           deleteTodo={this.deleteTodo.bind(this)}
            {...todo} {...props} />);
}

      render (){
//Binding the  function below to the creation component.
        return (
            <div>

              <CreateTodo
                      newTodo={this.newTodo.bind(this)}
                    todos={this.props.todos} />
            <table>
              <thead>
                <tr>
                  <th>Tasks</th>
                <th>Completion</th>
                </tr>
              </thead>
              <tbody>
              {this.renderItems()}
          </tbody>
          </table>
        </div>
        );
    }

//pushes value to the todos array. Sets the state with react.
    newTodo(todo){
      todos.push({toDoItem: todo, completed: false});
      this.setState({todos:this.todos});
    };
    saveTodo(oldTodo, newTodo){
      const findTodo=  _.find(todos, todo => todo.toDoItem  === oldTodo )
      findTodo.toDoItem = newTodo
      this.setState({todos:this.todos})
    }
    deleteTodo(toDelete){
      _.remove(todos, todo => todo.toDoItem === toDelete)
      this.setState({todos:this.todos})
    }
};


//Each row of our table


class ToDosListItem extends React.Component{
constructor(props){
  super(props);
  this.state={
    isEditing: false

  };
}

//Buttons for editing/saving/deleting items.
renderButtons(){
  if(this.state.isEditing){
    return(<td>
      <button onClick={this.onSaveClick.bind(this)}>Save</button>

    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
</td>
    );
  }
  return(<td>
    <button onClick={this.onEditClick.bind(this)}>Edit</button>

  <button onClick={this.props.deleteTodo.bind(this, this.props.toDoItem)}>Delete</button></td>
  )
}













//function to check if the task is completed or not
renderTodos(){
  const {toDoItem, completed} = this.props;
  const todoStyle = { color: completed ? 'green' : 'red',
    cursor: 'pointer'}
    if (this.state.isEditing)  {
      return( <td><form onSubmit={this.onSaveClick.bind(this)}>
        <input type="text" defaultValue={toDoItem} ref ='editInput' />
      </form></td>)
    }
return(
  <td style={todoStyle}
    onClick={this.props.toggleTodo.bind(this, toDoItem)}>
    {toDoItem}</td>
)
}



  render() {
  return (
    <tr>
        {this.renderTodos()}
{this.renderButtons()}</tr>
  )}



  onCancelClick(){
    this.setState({isEditing:false});
  }
  onEditClick(){
    this.setState({isEditing:true});
  }

    onSaveClick(event){
      event.preventDefault();
      const oldTodo=this.props.toDoItem;
      const newTodo=this.refs.editInput.value;
      this.props.saveTodo(oldTodo,newTodo)
      this.setState({isEditing:false});
    }
}

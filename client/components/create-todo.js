import React from 'react';

export default class CreateTodo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:null
    }
  }
  renderError(){
    if(!this.state.error){return null;}
    return <div style={{ color:'red' }} >{this.state.error}</div>;
  }
  render () {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type='text' placeholder="What to do ?" ref="createInput"/>
      <button>Create new ToDo</button>
    {this.renderError()}
      </form>
    )

  }
  handleCreate(event){
    event.preventDefault();
    const createInput= this.refs.createInput;
    console.log(this.props.todos)
    const todo = createInput.value;
    const validateTodo = this.validateTodo(todo)
    if(validateTodo){
      this.setState({error:validateTodo });
      this.refs.createInput.value=''
      return;
    }
    this.setState({error:null})
    this.props.newTodo(todo);
    this.refs.createInput.value=''

  }
  validateTodo (todo){
    if(!todo){
      return "Can't";
    }
    else if( _.find(this.props.todos, myTodos => myTodos.toDoItem === todo  ))
    {
      return 'Already exists';
    }
    else{
      return null;
    }
}

}

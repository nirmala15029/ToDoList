import React, { Component } from 'react';
import './ToDoListCss.css';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
    this.handleEditInputBlur = this.handleEditInputBlur.bind(this);
    this.editInputRef = React.createRef();
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      text: this.state.inputValue,
      id: this.state.todos.length + 1
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      inputValue: ''
    });
  }

  handleDelete(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  handleEdit(id) {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEditing: true
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos
      };
    }, () => {
      this.editInputRef.current.focus();
    });
  }

  handleEditInputChange(event, id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text: event.target.value
        };
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos
    });
  }

  handleEditInputBlur(id) {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEditing: false
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos
      };
    });
  }

  render() {
    return (
      <div className='Mainclass'>
        <form onSubmit={this.handleSubmit} className='form'>
          <input  className="inputclss" type="text" value={this.state.inputValue} onChange={this.handleChange} />
          <button className='buttoncls' type="submit">Add Todo</button>
        </form>
          <div className='wrapper'>
           
           <ul >
            {this.state.todos.map((todo, index) => (
            <li className='div-Wrapper'  key={todo.id}>
              {todo.isEditing ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={event => this.handleEditInputChange(event, todo.id)}
                  onBlur={() => this.handleEditInputBlur(todo.id)}
                  ref={this.editInputRef}
                />
              ) : (
                <span>{todo.text}</span>
              )}
              <button className='buttoncls' onClick={() => this.handleEdit(todo.id)}>Edit</button>
              <button className='buttoncls' onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;

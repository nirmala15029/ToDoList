
import React from 'react';
import './ToDoListCss.css';


class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTodo: '',
      editing: null,
      editText: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTodo.trim() === '') return;
    this.setState(prevState => ({
      todoList: [...prevState.todoList, { text: prevState.newTodo, completed: false }],
      newTodo: ''
    }));
  }

  handleDelete = (index) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter((todo, i) => i !== index),
      editing: prevState.editing === index ? null : prevState.editing
    }));
  }

  handleCheckboxChange = (index) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    }));
  }

  handleEditClick = (index) => {
    this.setState({
      editing: index,
      editText: this.state.todoList[index].text
    });
  }

  handleEditInputChange = (event) => {
    this.setState({ editText: event.target.value });
  }

  handleEditSubmit = (event, index) => {
    event.preventDefault();
    if (this.state.editText.trim() === '') {
      this.handleDelete(index);
    } else {
      this.setState(prevState => ({
        todoList: prevState.todoList.map((todo, i) => {
          if (i === index) {
            return { ...todo, text: prevState.editText };
          } else {
            return todo;
          }
        }),
        editing: null,
        editText: ''
      }));
    }
  }

  render() {
    return (
      <div  className='Mainclass'>
        <form onSubmit={this.handleSubmit} className='form'>
          <input type="text" value={this.state.newTodo} onChange={this.handleInputChange} />
          <button type="submit"  className='buttoncls'>Add</button>
        </form>
        <div className='wrapper'>
        <ul>
          {this.state.todoList.map((todo, index) => (
            <li key={index} className='div-Wrapper'>
              {this.state.editing === index ?
                <form onSubmit={(event) => this.handleEditSubmit(event, index)}>
                  <input type="text" value={this.state.editText} onChange={this.handleEditInputChange} />
                  <button type="submit"  className='buttoncls'>Save</button>
                  <button type="button" onClick={() => this.setState({ editing: null })}  className='buttoncls'>Cancel</button>
                </form>
                :
                <>
                  <input type="checkbox" checked={todo.completed} onChange={() => this.handleCheckboxChange(index)} />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                  <button onClick={() => this.handleDelete(index)}  className='buttoncls'>Delete</button>
                  <button onClick={() => this.handleEditClick(index)} className='buttoncls'>Edit</button>
                </>
              }
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;

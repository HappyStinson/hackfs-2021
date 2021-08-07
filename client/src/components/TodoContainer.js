import React, { Component } from "react";

import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";

class TodoContainer extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Bitcoin",
        completed: true
      },
      {
        id: 2,
        title: "Polkadot",
        completed: false
      },
      {
        id: 69,
        title: "DogeCoin",
        completed: false
      }
    ]
  };
  
  handleChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo, // ES6 spread operator
            completed: !todo.completed,
          }
        }
        return todo
      }),
    }))
  };

  addTodoItem = title => {
    const newTodo = {
      id: 4,
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  deleteTodo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    });
  };

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodoList
            todos = {this.state.todos}
            handleChangeProps = {this.handleChange}
            deleteTodoProps = {this.deleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default TodoContainer
import React, { useState, useEffect } from "react";

import Header from "./Header";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  function getInitialTodos() {
    // Getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  const handleChange = id => {
    setTodos(prevState => 
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    );
  };

  const deleteTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id;
      }),
    ]);
  };

  const addTodoItem = title => {
    const newTodo = {
      id: 4,
      title: title,
      completed: false
    };

    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    );
  }

  useEffect(() => {
    console.log("testing react effect");

    // Getting stored items
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodoItem} />
        <TodoList
          todos = {todos}
          handleChangeProps = {handleChange}
          deleteTodoProps = {deleteTodo}
          setUpdate = {setUpdate}
        />
      </div>
    </div>
  );
}

export default TodoContainer
  


  

  

/*   

  componentDidMount() {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }; */

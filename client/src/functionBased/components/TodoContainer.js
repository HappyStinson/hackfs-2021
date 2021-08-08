import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import Navbar from "./Navbar";

// Pages
import About from "../pages/About";
import NotMatch from "../pages/NotMatch";

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
  };

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
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
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
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  );
}

export default TodoContainer
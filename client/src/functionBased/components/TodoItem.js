import React, { useState, useEffect } from "react";

import styles from "./TodoItem.module.css";

const TodoItem = props => {
  const [editing, setEditing] = useState(false);
  
  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdateDone = event => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  useEffect(() => {
    return () => {
      console.log("Cleaning up...");
    };
  }, []);
  
  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  // Obtain variables by Destructing the object
  const { id, title, completed } = props.todo;
  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type = "checkbox"
          className={styles.checkbox}
          checked = {completed}
          onChange = {() => props.handleChangeProps(id)}
        />
        <button onClick={() => props.deleteTodoProps(id)} className={styles.itemButton}>
          Delete
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type = "text"
        style = {editMode}
        className = {styles.textInput}
        value = {title}
        onChange = {e => {
          props.setUpdate(e.target.value, id)
        }}
        onKeyDown={handleUpdateDone}
      />
    </li>
  )
}

export default TodoItem
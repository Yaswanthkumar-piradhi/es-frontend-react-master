import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);

  // Event handler for adding a new task
  const addTask = (e) => {
    e.preventDefault(); // prevent page refresh
    const newTask = {
      id: Date.now(), // unique ID for the task
      text: e.target.elements.task.value, // the text of the task
    };
    setTasks([...tasks, newTask]); // add the new task to the list of tasks
  };

  // Event handler for removing a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>

      {/* Form for adding a new task */}
      <form onSubmit={addTask}>
        <input type="text" name="task" placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>

      {/* List of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
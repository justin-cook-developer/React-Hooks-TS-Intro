import React, { useState } from 'react';
import './App.css';

const TodoForm = ({ addTodo }) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputVal) return;

    addTodo(inputVal);
    setInputVal('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          id="todo"
          className="input"
          placeholder="Enter a todo..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
      </label>

      <label htmlFor="submit">
        <button id="submit" type="submit">
          Add Todo
        </button>
      </label>
    </form>
  );
};

const Todo = ({ todo, index, toggleComplete, removeTodo }) => (
  <div className="todo">
    <span
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
    >
      {todo.text}
    </span>

    <span className="todo-buttons">
      <button type="button" onClick={() => toggleComplete(index)}>
        {todo.isCompleted ? 'Un-complete' : 'Complete'}
      </button>
      <button onClick={() => removeTodo(index)} type="button">
        X
      </button>
    </span>
  </div>
);

function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn about React', isCompleted: false },
    { text: 'Meet with friend for lunch', isCompleted: false },
    { text: 'Build app for ryan!', isCompleted: false },
  ]);

  const addTodo = text => setTodos([...todos, { text }]);

  const toggleComplete = index => {
    setTodos(
      todos.map((todo, i) => {
        if (i !== index) return todo;
        return { ...todo, isCompleted: !todo.isCompleted };
      })
    );
  };

  const removeTodo = index => setTodos(todos.filter((_, i) => i !== index));

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((t, i) => (
          <Todo
            key={i}
            index={i}
            todo={t}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;

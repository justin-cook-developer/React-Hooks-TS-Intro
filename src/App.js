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

const Todo = ({ todo }) => <div className="todo">{todo.text}</div>;

function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn about React' },
    { text: 'Meet with friend for lunch' },
    { text: 'Build app for ryan!' },
  ]);

  const addTodo = text => setTodos([...todos, { text }]);

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((t, i) => (
          <Todo key={i} index={i} todo={t} />
        ))}

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;

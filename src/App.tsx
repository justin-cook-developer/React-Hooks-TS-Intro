import React, { useState, useReducer, FormEvent, ChangeEvent } from 'react';

import './App.css';
import { todosReducer, initialState } from './reducers/todos';
import { addAction, indexAction, todo as _todo } from './types/index';

const TodoForm: React.FunctionComponent<{
  addTodo: (text: string) => void;
}> = ({ addTodo }) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setInputVal(e.target.value)
          }
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

const Todo: React.FunctionComponent<{
  todo: _todo;
  index: number;
  toggleComplete: (index: number) => void;
  removeTodo: (index: number) => void;
}> = ({ todo, index, toggleComplete, removeTodo }) => (
  <div className="todo">
    <span
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
    >
      {todo.text}
    </span>

    <span className="todo-buttons">
      <button
        type="button"
        onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
          toggleComplete(index)
        }
      >
        {todo.isCompleted ? 'Un-complete' : 'Complete'}
      </button>
      <button
        onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
          removeTodo(index)
        }
        type="button"
      >
        X
      </button>
    </span>
  </div>
);

const App: React.FunctionComponent<{}> = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  const addTodo = (text: string): void => {
    const action: addAction = { type: 'add', text };
    dispatch(action);
  };

  const toggleComplete = (index: number): void => {
    const action: indexAction = { type: 'toggle', index };
    dispatch(action);
  };

  const removeTodo = (index: number): void => {
    const action: indexAction = { type: 'remove', index };
    dispatch(action);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((t, i) => (
          <Todo
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
};

export default App;

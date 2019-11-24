import React, { useState, FormEvent, ChangeEvent } from 'react';

import './App.css';
import { todo as _todo } from './types/index';
import { useTodosMethods, useTodosState } from './contexts/TodosProvider';

const TodoForm: React.FunctionComponent<{}> = () => {
  const [inputVal, setInputVal] = useState('');
  const { addTodo } = useTodosMethods();

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
}> = ({ todo, index }) => {
  const { toggleComplete, removeTodo } = useTodosMethods();

  return (
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
};

const App: React.FunctionComponent<{}> = () => {
  const { todos }: { todos: _todo[] } = useTodosState();

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((t, i) => (
          <Todo index={i} todo={t} />
        ))}

        <TodoForm />
      </div>
    </div>
  );
};

export default App;

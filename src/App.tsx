import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';

import './App.css';
import { todo } from './types/index';
import { useTodosMethods, useTodosState } from './contexts/TodosProvider';
import { makeTodoCall, toggleTodoCall, deleteTodoCall } from './apiCalls/index';

const TodoForm: React.FunctionComponent<{}> = () => {
  const [inputVal, setInputVal] = useState('');
  const { addTodo } = useTodosMethods();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!inputVal) return;

    makeTodoCall(inputVal).then(([todo, err]: [todo | null, boolean]): void => {
      if (!err && todo) {
        addTodo(todo);
        setInputVal('');
      }
    });
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
  todo: todo;
}> = ({ todo: { id, title, completed } }) => {
  const { toggleComplete, removeTodo } = useTodosMethods();

  return (
    <div className="todo">
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
      </span>

      <span className="todo-buttons">
        <button
          type="button"
          onClick={(
            _: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ): void => {
            toggleTodoCall(id, completed).then((toggled: boolean): void => {
              if (toggled) toggleComplete(id);
            });
          }}
        >
          {completed ? 'Un-complete' : 'Complete'}
        </button>

        <button
          onClick={(
            _: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ): void => {
            deleteTodoCall(id).then((deleted: boolean): void => {
              if (deleted) removeTodo(id);
            });
          }}
          type="button"
        >
          X
        </button>
      </span>
    </div>
  );
};

const App: React.FunctionComponent<{}> = () => {
  const { todos }: { todos: todo[] } = useTodosState();
  const { addTodos } = useTodosMethods();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res): Promise<todo[]> => res.json())
      .then((data: todo[]): void => {
        addTodos(data);
      });
  }, []);

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map(
          (t: todo, i: number): JSX.Element => (
            <Todo key={i} todo={t} />
          )
        )}
        <TodoForm />
      </div>
    </div>
  );
};

export default App;

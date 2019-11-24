import React, { createContext, useReducer, useContext } from 'react';

import { addAction, idAction, todo, addTodosAction } from '../types/index';
import { todosReducer } from '../reducers/todos';

// Definte the context objects
// One for state, one for updating state
const defualtTodosContext: { todos: todo[] } = { todos: [] };

const TodosContext = createContext(defualtTodosContext);

const defaultTodoMethodsContext: {
  addTodos: (todos: todo[]) => void;
  addTodo: (todo: todo) => void;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
} = {
  addTodos: (todos: todo[]): void => {},
  addTodo(todo: todo): void {},
  toggleComplete(id: number): void {},
  removeTodo(id: number): void {},
};

const TodoMethods = createContext(defaultTodoMethodsContext);

// Define Provider abstraction
const TodosProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const addTodos = (todos: todo[]): void => {
    const action: addTodosAction = { type: 'addTodos', todos };
    dispatch(action);
  };

  const addTodo = (todo: todo): void => {
    const action: addAction = { type: 'add', todo };
    dispatch(action);
  };

  const toggleComplete = (id: number): void => {
    const action: idAction = { type: 'toggle', id };
    dispatch(action);
  };

  const removeTodo = (id: number): void => {
    const action: idAction = { type: 'remove', id };
    dispatch(action);
  };

  return (
    <TodosContext.Provider value={{ todos }}>
      <TodoMethods.Provider
        value={{
          addTodos,
          addTodo,
          toggleComplete,
          removeTodo,
        }}
      >
        {children}
      </TodoMethods.Provider>
    </TodosContext.Provider>
  );
};

// Define hooks to use contexts
const generateProviderError = (hookName: string): Error =>
  new Error(`${hookName} must be used within a TodosProvider.`);

const useTodosState = (): { todos: todo[] } => {
  const todosContext = useContext(TodosContext);

  if (todosContext === undefined) {
    throw generateProviderError('useTodosState');
  }

  return todosContext;
};

const useTodosMethods = (): {
  addTodos: (todos: todo[]) => void;
  addTodo: (todo: todo) => void;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
} => {
  const updateMethods = useContext(TodoMethods);

  if (updateMethods === undefined) {
    throw generateProviderError('useTodosMethods');
  }

  return updateMethods;
};

export { TodosProvider, useTodosState, useTodosMethods };

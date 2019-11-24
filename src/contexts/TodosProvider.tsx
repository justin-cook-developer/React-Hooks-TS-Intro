import React, { createContext, useReducer, useContext } from 'react';

import { addAction, indexAction, todo } from '../types/index';
import { todosReducer, initialState } from '../reducers/todos';

// Definte the context objects
// One for state, one for updating state
const defualtTodosContext: { todos: todo[] } = { todos: [] };

const TodosContext = createContext(defualtTodosContext);

const defaultTodoMethodsContext: {
  addTodo: (text: string) => void;
  toggleComplete: (index: number) => void;
  removeTodo: (index: number) => void;
} = {
  addTodo(text: string): void {},
  toggleComplete(index: number): void {},
  removeTodo(index: number): void {},
};

const TodoMethods = createContext(defaultTodoMethodsContext);

// Define Provider abstraction
const TodosProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
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
    <TodosContext.Provider value={{ todos }}>
      <TodoMethods.Provider
        value={{
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
  addTodo: (text: string) => void;
  toggleComplete: (index: number) => void;
  removeTodo: (index: number) => void;
} => {
  const updateMethods = useContext(TodoMethods);

  if (updateMethods === undefined) {
    throw generateProviderError('useTodosMethods');
  }

  return updateMethods;
};

export { TodosProvider, useTodosState, useTodosMethods };

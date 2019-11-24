import { todo, action } from '../types/index';

const defaultTodo: todo = {
  userId: -Infinity,
  id: -Infinity,
  title: 'Default',
  completed: false,
};

export let todosReducer: (state: todo[], action: action) => todo[];

todosReducer = (state: todo[], action: action): todo[] => {
  switch (action.type) {
    case 'addTodos': {
      return state.concat(action.todos || [defaultTodo]);
    }

    case 'add': {
      // Added default object to satisfy TS
      return [...state, action.todo || defaultTodo];
    }

    case 'toggle': {
      return state.map(
        (todo: todo): todo => {
          if (todo.id !== action.id) {
            return todo;
          } else {
            return { ...todo, completed: !todo.completed };
          }
        }
      );
    }

    case 'remove': {
      return state.filter((t: todo): boolean => t.id !== action.id);
    }

    default:
      return state;
  }
};

import { todo, addAction, indexAction } from '../types/index';

export const initialState: todo[] = [
  { text: 'Learn about React', isCompleted: false },
  { text: 'Meet with friend for lunch', isCompleted: false },
  { text: 'Build app for ryan!', isCompleted: false },
];

export let todosReducer: (
  state: todo[],
  action: addAction | indexAction
) => todo[];

todosReducer = (state: todo[], action: addAction | indexAction): todo[] => {
  switch (action.type) {
    case 'add': {
      // added ` || ''` to satisfy TS
      return [...state, { text: action.text || '', isCompleted: false }];
    }

    case 'toggle': {
      return state.map(
        (todo: todo, i: number): todo => {
          if (i !== action.index) {
            return todo;
          } else {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
        }
      );
    }

    case 'remove': {
      return state.filter((_: todo, i: number): boolean => i !== action.index);
    }

    default:
      return state;
  }
};

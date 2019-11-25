import { todo } from '../types/index';

const baseUrl: string = 'https://jsonplaceholder.typicode.com/todos';

export const makeTodoCall = async (
  title: string
): Promise<[todo | null, boolean]> => {
  try {
    const res: Response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const todo: todo = await res.json();

    return [todo, false];
  } catch (err) {
    return [null, true];
  }
};

export const toggleTodoCall = async (
  id: number,
  completed: boolean
): Promise<boolean> => {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !completed }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteTodoCall = async (id: number): Promise<boolean> => {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });

    return true;
  } catch (error) {
    return false;
  }
};

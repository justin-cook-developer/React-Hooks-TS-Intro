export interface todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface action {
  type: string;
  id?: number;
  todo?: todo;
  todos?: todo[];
}

export interface addTodosAction extends action {
  todos: todo[];
}

export interface addAction extends action {
  todo: todo;
}

export interface idAction extends action {
  id: number;
}

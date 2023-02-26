export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type ListTodosData = Array<Todo>;

export type CreateTodoData = {
  title: string;
};

export type UpdateTodoData = {
  id: number;
  title?: string;
  isCompleted?: boolean;
};

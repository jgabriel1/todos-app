export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type ListTodosData = Array<Todo>;

export type CreateTodoData = {
  title: string;
};

export type UpdateTodoData = {
  title?: string;
  isCompleted?: boolean;
};

import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
  private todos: Todo[] = [];

  async findAll() {
    return this.todos;
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const todo = new Todo();

    todo.id = Date.now();
    todo.title = createTodoDto.title;
    todo.isCompleted = false;

    this.todos.push(todo);

    return todo;
  }

  async updateTodo(id: number, { title, isCompleted }: UpdateTodoDto) {
    const todoExists = this.todos.find((todo) => todo.id === id);

    if (todoExists) {
      Object.assign(
        todoExists,
        title !== undefined && { title },
        isCompleted !== undefined && { isCompleted },
      );
    }
  }

  async removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

// @Injectable()
// export class TodosRepository {
//   createTodo(createTodoDto: CreateTodoDto) {}

//   updateTodo(id: number, updateTodoDto: UpdateTodoDto) {}

//   removeTodo(id: number) {}
// }

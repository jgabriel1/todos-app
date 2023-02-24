import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    if (!createTodoDto.title) {
      throw new BadRequestException('To-do title cannot be empty');
    }

    return this.todosRepository.createTodo(createTodoDto);
  }

  findAll() {
    return this.todosRepository.findAll();
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    if (!updateTodoDto.title) {
      throw new BadRequestException('To-do title cannot be empty');
    }

    return this.todosRepository.updateTodo(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todosRepository.removeTodo(id);
  }
}

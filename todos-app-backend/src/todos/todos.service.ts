import { BadRequestException, Injectable } from '@nestjs/common';
import { SchemaValidator } from '../common/validators/schema.validator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    const { isValid, message } = new SchemaValidator(
      CreateTodoDto.schema,
    ).validate(createTodoDto);

    if (!isValid) {
      throw new BadRequestException(message);
    }

    return this.todosRepository.createTodo(createTodoDto);
  }

  findAll() {
    return this.todosRepository.findAll();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const { isValid, message } = new SchemaValidator(
      UpdateTodoDto.schema,
    ).validate(updateTodoDto);

    if (!isValid) {
      throw new BadRequestException(message);
    }

    return this.todosRepository.updateTodo(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todosRepository.removeTodo(id);
  }
}

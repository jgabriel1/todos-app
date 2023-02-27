import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todosModel: Model<TodoDocument>,
  ) {}

  findAll() {
    return this.todosModel.find().sort({ createdAt: 'asc' });
  }

  async createTodo({ title }: CreateTodoDto) {
    const createdTodo = new this.todosModel({
      title,
      isCompleted: false,
    });

    return createdTodo.save();
  }

  async updateTodo(id: string, { title, isCompleted }: UpdateTodoDto) {
    const todo = await this.todosModel.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true },
    );

    return todo;
  }

  removeTodo(id: string) {
    return this.todosModel.deleteOne({ _id: id }).exec();
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { mongodbConnectionUrl } from './config';

@Module({
  imports: [MongooseModule.forRoot(mongodbConnectionUrl), TodosModule],
})
export class AppModule {}

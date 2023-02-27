import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  isCompleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo).set('toJSON', {
  transform(_, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export type TodoDocument = HydratedDocument<Todo>;

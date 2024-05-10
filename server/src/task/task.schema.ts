import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @IsString()
    @Prop()
    title: string;
  
    @IsDate()
    @Prop()
    dueDate: Date;
  
    @IsBoolean()
    @Prop({ default: false })
    isCompleted: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
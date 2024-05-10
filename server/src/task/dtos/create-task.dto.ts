import { IsString, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
    @IsString()
    title: string;

    @IsDate()
    dueDate: Date;

    @IsBoolean()
    isCompleted: boolean = false;

    @IsNotEmpty()
    userId: string;

    @IsDate()
    createdAt: Date;
}
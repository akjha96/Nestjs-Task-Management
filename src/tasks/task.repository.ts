import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask = async (createTaskDto: CreateTaskDto) => {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  };

  deleteTaskByTaskId = async (id: string) => {
    const result = await this.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} NOT found!`);
    }
    return 'Task Deleted Successfully!';
  };
}

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => {
    return this.tasks;
  };

  getTaskByTaskId = (id: string): Task => {
    return this.tasks.find((task) => task.id === id);
  };

  createTask = (createTaskDto: CreateTaskDto): Task => {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.DONE,
    };
    this.tasks.push(task);
    return task;
  };

  deleteTaskByTaskId = (id: string) => {
    let updatedTask = this.tasks.filter((task) => task.id !== id);
    this.tasks = updatedTask;
    return 'Task Deleted Successfully';
  };
}

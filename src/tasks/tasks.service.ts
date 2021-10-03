import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskReository: TaskRepository,
  ) {}
  getTasks = (filterDto: GetTasksFilterDto): Promise<Task[]> => {
    return this.taskReository.getTasks(filterDto);
  };

  getTaskByTaskId = async (id: string): Promise<Task> => {
    const found = await this.taskReository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" NOT found!`);
    }
    return found;
  };

  createTask = (createTaskDto: CreateTaskDto): Promise<Task> => {
    return this.taskReository.createTask(createTaskDto);
  };

  deleteTaskByTaskId = (id: string): Promise<string> => {
    return this.taskReository.deleteTaskByTaskId(id);
  };

  updateTaskStatusById = async (
    id: string,
    status: TaskStatus,
  ): Promise<Task> => {
    const task = await this.getTaskByTaskId(id);
    task.status = status;
    this.taskReository.save(task);
    return task;
  };
}

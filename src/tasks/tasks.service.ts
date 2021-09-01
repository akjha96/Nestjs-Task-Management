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
  // getAllTasks = (): Task[] => {
  //   return this.tasks;
  // };
  // getTasksWithFilters = (filterDto: GetTasksFilterDto): Task[] => {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // };

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

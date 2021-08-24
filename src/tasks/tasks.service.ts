import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
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

  // createTask = (createTaskDto: CreateTaskDto): Task => {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // };
  // deleteTaskByTaskId = (id: string) => {
  //   const found = this.getTaskByTaskId(id);
  //   const updatedTask = this.tasks.filter((task) => task.id !== found.id);
  //   this.tasks = updatedTask;
  //   return 'Task Deleted Successfully';
  // };
  // updateTaskStatusById = (id: string, status: TaskStatus) => {
  //   const task = this.getTaskByTaskId(id);
  //   task.status = status;
  //   return task;
  // };
}

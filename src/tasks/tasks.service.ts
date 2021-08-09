import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
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

  getTasksWithFilters = (filterDto: GetTasksFilterDto): Task[] => {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks;
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
    const updatedTask = this.tasks.filter((task) => task.id !== id);
    this.tasks = updatedTask;
    return 'Task Deleted Successfully';
  };

  updateTaskStatusById = (id: string, status: TaskStatus) => {
    const task = this.getTaskByTaskId(id);
    task.status = status;
    return task;
  };
}

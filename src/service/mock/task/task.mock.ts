import type { ApiResponse } from "@/service/types/response/response";
import type { CreateTaskDTO } from "../../types/task/create.dto";
import type { TaskDTO } from "../../types/task/task.dto";
import type { TaskQueryDTO } from "../../types/task/query.dto";
import type { EditTaskDTO } from "../../types/task/edit.dto";
import { TaskStage } from "../../types/task/stage.dto";

import { mockData, createMockId, createMockResponse, createMockTask } from "../data";
import type { TaskServiceI } from "../../modules/task/task.service";

function matchesTaskQuery(task: TaskDTO, projectkey: string, queries?: TaskQueryDTO): boolean {
  if (task.project !== projectkey) {
    return false;
  }

  if (!queries) {
    return true;
  }

  if (queries.code && task.code !== queries.code) {
    return false;
  }

  if (queries.name && task.name !== queries.name) {
    return false;
  }

  if (queries.projectkey && task.project !== queries.projectkey) {
    return false;
  }

  if (queries.ownerkey && task.owner !== queries.ownerkey) {
    return false;
  }

  if (queries.stage && task.stage !== queries.stage) {
    return false;
  }

  if (queries.priority && task.priority !== queries.priority) {
    return false;
  }

  if (queries.due_date && new Date(task.due_date).getTime() !== queries.due_date.getTime()) {
    return false;
  }

  return true;
}

export class TaskMockService implements TaskServiceI {
  async create(data: CreateTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const task = createMockTask({
      id: createMockId("task"),
      code: `TSK-${String(mockData.tasks.length + 1).padStart(4, "0")}`,
      name: data.name,
      description: data.description,
      project: data.project,
      owner: data.owner,
      priority: data.priority,
      due_date: data.due_date.toISOString(),
      stage: TaskStage.PENDING,
    });

    mockData.tasks.push(task);

    return createMockResponse(task, "/tasks");
  }

  async list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskDTO[]>> {
    const tasks = mockData.tasks.filter((task) => matchesTaskQuery(task, projectkey, queries));

    return createMockResponse(tasks, `/tasks/${projectkey}`);
  }

  async find(code: string): Promise<ApiResponse<TaskDTO>> {
    const task = mockData.tasks.find((item) => item.code === code);

    return createMockResponse(task ?? createMockTask(), `/tasks/${code}`, task ? "OK" : "Task not found", task ? 200 : 404, !task);
  }

  async update(code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const task = mockData.tasks.find((item) => item.code === code);

    if (!task) {
      return createMockResponse(createMockTask(), `/tasks/${code}`, "Task not found", 404, true);
    }

    Object.assign(task, {
      ...(update.name ? { name: update.name } : {}),
      ...(update.description ? { description: update.description } : {}),
      ...(update.project ? { project: update.project } : {}),
      ...(update.owner ? { owner: update.owner } : {}),
      ...(update.priority ? { priority: update.priority } : {}),
      ...(update.stage ? { stage: update.stage } : {}),
      ...(update.due_date ? { due_date: update.due_date.toISOString() } : {}),
    });

    return createMockResponse(task, `/tasks/${code}`);
  }

  async delete(id: string): Promise<ApiResponse<TaskDTO>> {
    const index = mockData.tasks.findIndex((item) => item.id === id);
    const task = index >= 0 ? mockData.tasks[index] : createMockTask();

    if (index >= 0) {
      mockData.tasks.splice(index, 1);
    }

    return createMockResponse(task, `/tasks/del/${id}`);
  }
}

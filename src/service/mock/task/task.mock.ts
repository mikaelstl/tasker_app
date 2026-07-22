import type { ApiResponse } from "@/service/types/response/response";
import type { CreateTaskDTO } from "../../types/task/create.dto";
import type { TaskDTO, TaskWithOwnerDTO } from "../../types/task/task.dto";
import type { TaskQueryDTO } from "../../types/task/query.dto";
import type { EditTaskDTO } from "../../types/task/edit.dto";
import { TaskStage } from "../../types/task/stage.dto";

import { mockData, createMockId, createMockProjectMember, createMockResponse, createMockTask } from "../data";
import type { TaskServiceI } from "../../modules/task/task.service";

function matchesTaskQuery(task: TaskDTO, projectkey: string, queries?: TaskQueryDTO): boolean {
  if (task.projectkey !== projectkey) {
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

  if (queries.projectkey && task.projectkey !== queries.projectkey) {
    return false;
  }

  if (queries.ownerkey && task.ownerkey !== queries.ownerkey) {
    return false;
  }

  if (queries.stage && task.stage !== queries.stage) {
    return false;
  }

  if (queries.priority && task.priority !== queries.priority) {
    return false;
  }

  if (queries.deadline && new Date(task.deadline).getTime() !== new Date(queries.deadline).getTime()) {
    return false;
  }

  if (queries.delayed !== undefined && task.delayed !== queries.delayed) {
    return false;
  }

  return true;
}

function withOwner(task: TaskDTO): TaskWithOwnerDTO {
  return {
    ...task,
    owner: mockData.members.find((member) => member.id === task.ownerkey)
      ?? createMockProjectMember({ id: task.ownerkey }),
  };
}

export class TaskMockService implements TaskServiceI {
  async create(data: CreateTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const task = createMockTask({
      id: createMockId("task"),
      code: `TSK-${String(mockData.tasks.length + 1).padStart(4, "0")}`,
      name: data.name,
      description: data.description,
      projectkey: data.project,
      ownerkey: data.owner,
      priority: data.priority,
      deadline: data.deadline,
      stage: TaskStage.PENDING,
    });

    mockData.tasks.push(task);

    return createMockResponse(task, "/tasks");
  }

  async list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskWithOwnerDTO[]>> {
    const tasks = mockData.tasks
      .filter((task) => matchesTaskQuery(task, projectkey, queries))
      .map(withOwner);

    return createMockResponse(tasks, `/tasks/${projectkey}`);
  }

  async find(projectkey: string, code: string): Promise<ApiResponse<TaskWithOwnerDTO>> {
    const task = mockData.tasks.find((item) => item.projectkey === projectkey && item.code === code);

    return createMockResponse(withOwner(task ?? createMockTask()), `/tasks/${projectkey}/${code}`, task ? "OK" : "Tarefa não encontrada", task ? 200 : 404, !task);
  }

  async update(projectkey: string, code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const task = mockData.tasks.find((item) => item.projectkey === projectkey && item.code === code);

    if (!task) {
      return createMockResponse(createMockTask(), `/tasks/${projectkey}/${code}`, "Tarefa não encontrada", 404, true);
    }

    Object.assign(task, {
      ...(update.name ? { name: update.name } : {}),
      ...(update.description ? { description: update.description } : {}),
      ...(update.priority ? { priority: update.priority } : {}),
      ...(update.stage ? { stage: update.stage } : {}),
      ...(update.deadline ? { deadline: update.deadline } : {}),
    });

    return createMockResponse(task, `/tasks/${projectkey}/${code}`);
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

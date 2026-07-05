import type { ApiResponse } from "@/service/types/response/response";
import type { CreateTaskDTO } from "../../types/task/create.dto";
import type { TaskDTO } from "../../types/task/task.dto";
import type { TaskQueryDTO } from "../../types/task/query.dto";
import type { EditTaskDTO } from "../../types/task/edit.dto";

import { ApiClient } from "@/service/api";

export interface TaskServiceI {
  create(data: CreateTaskDTO): Promise<ApiResponse<TaskDTO>>;
  list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskDTO[]>>;
  find(code: string): Promise<ApiResponse<TaskDTO>>;
  update(code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>>;
  delete(id: string): Promise<ApiResponse<TaskDTO>>;
}

export class TaskService implements TaskServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: CreateTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const response = await this.api.register<CreateTaskDTO, TaskDTO>({
      route: "/tasks",
      data,
    });

    return response;
  }

  async list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskDTO[]>> {
    const response = await this.api.load<TaskDTO[], TaskQueryDTO>({
      route: `/tasks/${projectkey}`,
      params: queries,
    });

    return response;
  }

  async find(code: string): Promise<ApiResponse<TaskDTO>> {
    const response = await this.api.load<TaskDTO, void>({
      route: `/tasks/${code}`,
    });

    return response;
  }

  async update(code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const response = await this.api.update<EditTaskDTO, TaskDTO>({
      route: `/tasks/${code}`,
      data: update,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<TaskDTO>> {
    const response = await this.api.remove<TaskDTO>({
      route: `/tasks/del/${id}`,
    });

    return response;
  }
}
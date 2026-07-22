import type { ApiResponse } from "@/service/types/response/response";
import type { CreateTaskDTO } from "../../types/task/create.dto";
import type { TaskDTO, TaskWithOwnerDTO } from "../../types/task/task.dto";
import type { TaskQueryDTO } from "../../types/task/query.dto";
import type { EditTaskDTO } from "../../types/task/edit.dto";

import { ApiClient } from "@/service/api";

export interface TaskServiceI {
  create(data: CreateTaskDTO): Promise<ApiResponse<TaskDTO>>;
  list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskWithOwnerDTO[]>>;
  find(projectkey: string, code: string): Promise<ApiResponse<TaskWithOwnerDTO>>;
  update(projectkey: string, code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>>;
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

  async list(projectkey: string, queries?: TaskQueryDTO): Promise<ApiResponse<TaskWithOwnerDTO[]>> {
    const response = await this.api.load<TaskWithOwnerDTO[], TaskQueryDTO>({
      route: `/tasks/${projectkey}`,
      params: queries,
    });

    return response;
  }

  async find(projectkey: string, code: string): Promise<ApiResponse<TaskWithOwnerDTO>> {
    const response = await this.api.load<TaskWithOwnerDTO, void>({
      route: `/tasks/${projectkey}/${code}`,
    });

    return response;
  }

  async update(projectkey: string, code: string, update: EditTaskDTO): Promise<ApiResponse<TaskDTO>> {
    const response = await this.api.update<EditTaskDTO, TaskDTO>({
      route: `/tasks/${projectkey}/${code}`,
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

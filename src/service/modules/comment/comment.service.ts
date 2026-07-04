import type { ApiResponse } from "@/service/types/response/response";
import type { CreateCommentDTO } from "../../types/comment/comment.create.dto";
import type { CommentDTO } from "../../types/comment/comment.dto";
import type { CommentQueryDTO } from "@/service/types/comment/query.dto";

import { ApiClient } from "@/service/api";

interface CommentServiceI {
  create(data: CreateCommentDTO): Promise<ApiResponse<CommentDTO>>;
  list(queries: CommentQueryDTO): Promise<ApiResponse<CommentDTO[]>>;
  find(id: string): Promise<ApiResponse<CommentDTO>>;
  delete(id: string): Promise<ApiResponse<CommentDTO>>;
}

export class CommentService implements CommentServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: CreateCommentDTO): Promise<ApiResponse<CommentDTO>> {
    const response = await this.api.register<CreateCommentDTO, CommentDTO>({
      route: "/comments",
      data,
    });

    return response;
  }

  async list(queries: CommentQueryDTO): Promise<ApiResponse<CommentDTO[]>> {
    const response = await this.api.load<CommentDTO[], CommentQueryDTO>({
      route: "/comments",
      params: queries,
    });

    return response;
  }

  async find(id: string): Promise<ApiResponse<CommentDTO>> {
    const response = await this.api.load<CommentDTO, void>({
      route: `/comments/${id}`,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<CommentDTO>> {
    const response = await this.api.remove<CommentDTO>({
      route: `/comments/del/${id}`,
    });

    return response;
  }
}

import type { ApiResponse } from "@/service/types/response/response";
import type { CreateCommentDTO } from "../../types/comment/comment.create.dto";
import type { CommentDTO } from "../../types/comment/comment.dto";
import type { CommentQueryDTO } from "@/service/types/comment/query.dto";

import { mockData, createMockId, createMockResponse, createMockComment } from "../data";
import type { CommentServiceI } from "../../modules/comment/comment.service";

function matchesCommentQuery(comment: CommentDTO, queries: CommentQueryDTO): boolean {
  if (queries.id && comment.id !== queries.id) {
    return false;
  }

  if (queries.content && comment.content !== queries.content) {
    return false;
  }

  if (queries.ownerkey && comment.ownerkey !== queries.ownerkey) {
    return false;
  }

  if (queries.projectkey && comment.projectkey !== queries.projectkey) {
    return false;
  }

  if (queries.date && new Date(comment.date).getTime() !== queries.date.getTime()) {
    return false;
  }

  return true;
}

export class CommentMockService implements CommentServiceI {
  async create(data: CreateCommentDTO): Promise<ApiResponse<CommentDTO>> {
    const comment = createMockComment({
      id: createMockId("comment"),
      content: data.content,
      date: data.date.toISOString(),
      ownerkey: data.ownerkey,
      projectkey: data.projectkey,
    });

    mockData.comments.push(comment);

    return createMockResponse(comment, "/comments");
  }

  async list(queries: CommentQueryDTO): Promise<ApiResponse<CommentDTO[]>> {
    const comments = mockData.comments.filter((comment) => matchesCommentQuery(comment, queries));

    return createMockResponse(comments, "/comments");
  }

  async find(id: string): Promise<ApiResponse<CommentDTO>> {
    const comment = mockData.comments.find((item) => item.id === id);

    return createMockResponse(comment ?? createMockComment(), `/comments/${id}`, comment ? "OK" : "Comentário não encontrado", comment ? 200 : 404, !comment);
  }

  async delete(id: string): Promise<ApiResponse<CommentDTO>> {
    const index = mockData.comments.findIndex((item) => item.id === id);
    const comment = index >= 0 ? mockData.comments[index] : createMockComment();

    if (index >= 0) {
      mockData.comments.splice(index, 1);
    }

    return createMockResponse(comment, `/comments/del/${id}`);
  }
}

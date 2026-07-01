import type { ApiResponse } from "@/service/types/response/response";
import type { CreateEventDTO } from "../../types/events/event.create.dto";
import type { EventDTO } from "../../types/events/event.dto";
import type { EventQueryDTO } from "../../types/events/event.query.dto";

import { ApiClient } from "@/service/api";

interface EventServiceI {
  create(data: CreateEventDTO): Promise<ApiResponse<EventDTO>>;
  list(queries: EventQueryDTO): Promise<ApiResponse<EventDTO[]>>;
  find(code: string): Promise<ApiResponse<EventDTO>>;
  update(code: string, update: any): Promise<ApiResponse<EventDTO>>;
  delete(id: string): Promise<ApiResponse<EventDTO>>;
}

export class EventService implements EventServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: CreateEventDTO): Promise<ApiResponse<EventDTO>> {
    const response = await this.api.register<CreateEventDTO, EventDTO>({
      route: "/events",
      data,
    });

    return response;
  }

  async list(queries: EventQueryDTO): Promise<ApiResponse<EventDTO[]>> {
    const response = await this.api.load<EventDTO[], EventQueryDTO>({
      route: "/events",
      params: queries,
    });

    return response;
  }

  async find(code: string): Promise<ApiResponse<EventDTO>> {
    const response = await this.api.load<EventDTO, void>({
      route: `/events/${code}`,
    });

    return response;
  }

  async update(code: string, update: any): Promise<ApiResponse<EventDTO>> {
    const response = await this.api.update<any, EventDTO>({
      route: `/events/${code}`,
      data: update,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<EventDTO>> {
    const response = await this.api.remove<EventDTO>({
      route: `/events/${id}`,
    });

    return response;
  }
}

export default EventService;

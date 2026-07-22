import type { ApiResponse } from "@/service/types/response/response";
import type { CreateEventDTO } from "../../types/events/event.create.dto";
import type { EventDTO } from "../../types/events/event.dto";
import type { EventQueryDTO } from "../../types/events/event.query.dto";

import { mockData, createMockId, createMockResponse, createMockEvent } from "../data";
import type { EventServiceI } from "../../modules/event/event.service";

function matchesEventQuery(event: EventDTO, queries: EventQueryDTO): boolean {
  if (queries.id && event.id !== queries.id) {
    return false;
  }

  if (queries.title && event.title !== queries.title) {
    return false;
  }

  if (queries.projectkey && event.projectkey !== queries.projectkey) {
    return false;
  }

  if (queries.date && new Date(event.date).getTime() !== queries.date.getTime()) {
    return false;
  }

  if (queries.category && event.category !== queries.category) {
    return false;
  }

  return true;
}

export class EventMockService implements EventServiceI {
  async create(data: CreateEventDTO): Promise<ApiResponse<EventDTO>> {
    const event = createMockEvent({
      id: createMockId("event"),
      title: data.title,
      projectkey: data.project,
      date: data.date.toISOString(),
      category: data.category,
    });

    mockData.events.push(event);

    return createMockResponse(event, "/events");
  }

  async list(queries: EventQueryDTO): Promise<ApiResponse<EventDTO[]>> {
    const events = mockData.events.filter((event) => matchesEventQuery(event, queries));

    return createMockResponse(events, "/events");
  }

  async find(code: string): Promise<ApiResponse<EventDTO>> {
    const event = mockData.events.find((item) => item.id === code);

    return createMockResponse(event ?? createMockEvent(), `/events/${code}`, event ? "OK" : "Evento não encontrado", event ? 200 : 404, !event);
  }

  async update(
    code: string,
    update: Partial<CreateEventDTO> & { projectkey?: string },
  ): Promise<ApiResponse<EventDTO>> {
    const event = mockData.events.find((item) => item.id === code);

    if (!event) {
      return createMockResponse(createMockEvent(), `/events/${code}`, "Evento não encontrado", 404, true);
    }

    Object.assign(event, {
      ...(update.title ? { title: update.title } : {}),
      ...(update.project ? { projectkey: update.project } : update.projectkey ? { projectkey: update.projectkey } : {}),
      ...(update.date ? { date: new Date(update.date).toISOString() } : {}),
      ...(update.category ? { category: update.category } : {}),
    });

    return createMockResponse(event, `/events/${code}`);
  }

  async delete(id: string): Promise<ApiResponse<EventDTO>> {
    const index = mockData.events.findIndex((item) => item.id === id);
    const event = index >= 0 ? mockData.events[index] : createMockEvent();

    if (index >= 0) {
      mockData.events.splice(index, 1);
    }

    return createMockResponse(event, `/events/${id}`);
  }
}

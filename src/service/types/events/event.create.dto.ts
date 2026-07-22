import type { EventCategory } from "./event.dto";

export interface CreateEventDTO {
  readonly title: string;
  readonly project: string;
  readonly date: Date;
  readonly category: EventCategory;
}

import type { EventCategory } from "./event.dto";

export interface UpdateEventDTO {
  readonly title?: string;
  readonly project?: string;
  readonly projectkey?: string;
  readonly date?: string;
  readonly category?: EventCategory;
}

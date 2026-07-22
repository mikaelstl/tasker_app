import type { EventCategory } from "./event.dto";

export interface EventQueryDTO {
  readonly id?: string;
  readonly title?: string;
  readonly projectkey?: string;
  readonly date?: string;
  readonly category?: EventCategory;
}

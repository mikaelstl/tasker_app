export enum EventCategory {
  RELEASE = "RELEASE",
  MEETING = "MEETING",
  REVIEW = "REVIEW",
  PLANNING = "PLANNING",
  TESTS = "TESTS",
  LAUNCH = "LAUNCH",
}

export interface EventDTO {
  readonly id: string;
  readonly title: string;
  readonly projectkey: string;
  readonly date: string;
  readonly category: EventCategory;
  readonly created_at: string;
  readonly updated_at: string;
}

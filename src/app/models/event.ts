export interface Event {
  id: number,
  name: string,
  description: string,
  media: string[],
  start_at: Date,
  published_at: Date,
  images_url: string[]

}

export interface EventsPerCategoryResponse {
  events: PaginatedEvents
}

export interface PaginatedEvents{
  data: Event[]
}

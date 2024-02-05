export interface Event {
  id: number,
  name: string,
  description: string,
  media: string[],
  start_at: Date,
  place: string,
  price: number,
  published_at: Date,
  images_url: string[],
  published_at_formatted: string

}

export interface EventsPerCategoryResponse {
  events: PaginatedEvents
}

export interface PaginatedEvents{
  data: Event[]
}

export interface EventByIdResponse {
  event: Event
}

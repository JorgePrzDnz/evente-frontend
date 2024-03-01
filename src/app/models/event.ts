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

export interface EventsByIdResponse {
  events: Event[]
}

export interface addOrderRequest{
  user_id: number,
  event_id: number,
  total_price: number,
  entry_amount: number,
  event_name: string,
}

export interface AddOrderResponse{
  user_id: number,
  event_id: number,
  total_price: number,
  entry_amount: number,
  event_name: string,
  id: number,
}

export interface Order{
  user_id: number,
  event_id: number,
  total_price: number,
  entry_amount: number,
  event_name: string,
  id: number,
}

export interface OrdersResponse{
  status: string,
  orders: Order[]
}

export interface ServiceResponse<T> {
  status: string,
  data: T | { message: string }
}

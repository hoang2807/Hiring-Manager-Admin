import { AxiosResponse } from 'axios'

export interface ResponseData<T> extends AxiosResponse<T> {}

export interface ResponseError {
  code: number
  message?: string
}

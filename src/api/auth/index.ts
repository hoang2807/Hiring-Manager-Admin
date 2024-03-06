import { LoginType } from '@/api/auth/type'
import request from '@/api/axios'

export function login(data: LoginType) {
  return request<LoginType>({
    url: '/auth/login',
    method: 'post',
    data
  })
}

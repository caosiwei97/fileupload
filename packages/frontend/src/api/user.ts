import axios from '@nice/axios'
import { UserInfo } from './types/user'

axios.interceptors.request.use((config) => {
  console.log(config)

  config.headers.test += 'requestInterceptors1---'
  return config
})

axios.interceptors.request.use((config) => {
  console.log(config)
  config.headers.test += 'requestInterceptors2---'
  return config
})

axios.interceptors.response.use((response) => {
  response.data.test += '响应拦截器1---'
  return response
})

axios.interceptors.response.use((response) => {
  response.data.test += '响应拦截器2---'
  return response
})

export function getUserInfo() {
  return axios.get<UserInfo>('http://localhost:3001/api/user')
}

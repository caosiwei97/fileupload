import axios from '@nice/axios'
import { UserInfo } from './types/user'

axios.defaults.headers.common['NLRX'] = 'Hello NLRX'
axios.defaults.headers.post['NLRX1'] = 'post NLRX'
axios.defaults.headers.get['NLRX2'] = 'get NLRX'

axios.interceptors.request.use((config) => {
  config.headers.test += 'requestInterceptors1---'
  return config
})

axios.interceptors.request.use((config) => {
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
  return axios<UserInfo>({
    url: 'http://localhost:3001/api/user',
    method: 'post',
    data: {
      a: 1,
    },
  })
}

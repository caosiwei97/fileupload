import axios from '@nice/axios'
import { UserInfo } from './types/user'

export function getUserInfo() {
  return axios.get<UserInfo>('http://localhost:3001/api/user')
}

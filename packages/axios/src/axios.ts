import Axios from './core/Axios'
import { AxiosInstance } from '../types'
import { extend } from './helpers/util'

function getAxios(): AxiosInstance {
  const context = new Axios()

  // 可以通过函数调用
  const axios = Axios.prototype.request.bind(context)

  // 拓展请求方法：axios.get, axios.post ...
  extend(axios, Object.getPrototypeOf(context))

  return axios as AxiosInstance
}

const axios = getAxios()

export default axios

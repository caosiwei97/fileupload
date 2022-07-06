import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from '../types'
import { extend } from './helpers/util'

const defaults = {
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
}

function getAxios(defaultConfig: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(defaultConfig)

  // 可以通过函数调用
  const axios = Axios.prototype.request.bind(context)

  // 拓展请求方法：axios.get, axios.post ...
  extend(axios, Object.getPrototypeOf(context), false)
  extend(axios, context, true)

  return axios as AxiosInstance
}

const axios = getAxios(defaults)

export default axios

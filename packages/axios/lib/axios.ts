import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/util'
import { defaults } from './defaults'

function createInstance(defaultConfig: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(defaultConfig)

  // 可以通过函数调用
  const instance = Axios.prototype.request.bind(context)

  // 拓展请求方法：axios.get, axios.post ...
  extend(instance, Object.getPrototypeOf(context), false)
  extend(instance, context, true)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios

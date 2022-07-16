import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import { defaults } from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(defaultConfig: AxiosRequestConfig) {
  const context = new Axios(defaultConfig)

  // 可以通过函数调用
  const instance = Axios.prototype.request.bind(context)

  // 拓展请求方法：axios.get, axios.post ...
  extend(instance, Object.getPrototypeOf(context), false)
  extend(instance, context, true)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 实现实例的静态方法

axios.create = function (config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios

import type { AxiosRequestConfig } from '../types'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { transform } from './transform'

function axios(config: AxiosRequestConfig) {
  processConfig(config)

  const adapter = config.adapter!
  return adapter(config)
}

// 对配置进行处理
function processConfig(config: AxiosRequestConfig) {
  // 对 URL 进行处理
  config.url = transformURL(config)

  // 处理请求数据
  config.data = transform(config.data, config.headers, config.transformRequest)

  // 扁平化 header
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL({ url, params }: AxiosRequestConfig) {
  return url && buildURL(url, params)
}

export default axios

import type { AxiosRequestConfig } from '../types'
import { buildURL } from './helpers/url'
import xhr from './xhr'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig) {
  processConfig(config)

  return xhr(config)
}

// 对配置进行处理
function processConfig(config: AxiosRequestConfig) {
  // 对 URL 进行处理
  config.url = transformURL(config)

  // 处理请求头
  config.headers = transformHeaders(config)

  // 处理请求数据
  config.data = transformRequestData(config)
}

function transformURL({ url, params }: AxiosRequestConfig) {
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformHeaders({ headers = {}, data }: AxiosRequestConfig) {
  return processHeaders(headers, data)
}

export default axios

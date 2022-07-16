import { adapters } from '../adapters'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { AxiosAdapter, AxiosRequestConfig } from '../types'

// 请求带数据的默认 MIME 类型
const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

// 适配器，当前库可以适配客户端（浏览器）和服务端
function getDefaultAdapter(): AxiosAdapter {
  let adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = adapters['xhr']
  } else if (
    typeof process !== 'undefined' &&
    Object.prototype.toString.call(process) === '[object process]'
  ) {
    // For node use HTTP adapter
    adapter = adapters['http']
  }
  return adapter as AxiosAdapter
}

export const defaults: AxiosRequestConfig = {
  adapter: getDefaultAdapter(),
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
  // 转换请求数据（默认转换 JSON 格式数据，且只针对 put、post、patch 的请求）
  transformRequest: [
    function (data, headers) {
      processHeaders(headers, data)
      return transformRequest(data)
    },
  ],
  // 转换响应数据，默认解析 JSON 数据
  transformResponse: [
    function (data) {
      return transformResponse(data)
    },
  ],
}

// 不带数据的请求方法
const methodsWithNoData = ['delete', 'get', 'head']

// 带数据的请求方法
const methodsWithData = ['post', 'patch', 'put']

methodsWithNoData.forEach((method) => {
  defaults.headers[method] = {}
})

methodsWithData.forEach((method) => {
  defaults.headers[method] = { ...DEFAULT_CONTENT_TYPE }
})

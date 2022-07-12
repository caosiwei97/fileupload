import { adapters } from '../adapters'
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

import { Method } from '../types'
import { isObject, merge } from './util'

function normalizeHeaderName(headers: any, normalizedName: string) {
  Object.keys(headers).forEach((headerName) => {
    if (
      headerName !== normalizedName &&
      headerName.toLowerCase() === normalizedName.toLowerCase()
    ) {
      headers[normalizedName] = headers[headerName]
      delete headers[headerName]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')

  // 给带数据的请求设置默认的 Content-Type
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string) {
  if (!headers) return
  const res = Object.create(null)

  headers.split('\r\n').forEach((line) => {
    let [key, value] = line.split(':')

    if (!key) return

    key = key.toLowerCase()
    value = value?.trim()

    res[key] = value
  })

  return res
}

export function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers
  }

  // 合并 common ，当前请求方法的头，用户直接设置的头
  headers = merge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common',
  ]

  methodsToDelete.forEach((method) => {
    delete headers[method]
  })

  return headers
}

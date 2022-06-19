import { isObject } from './util'

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

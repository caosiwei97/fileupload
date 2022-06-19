import { AxiosPromise, AxiosRequestConfig } from '../types'
import { AxiosResponse } from '../types/index'
import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url)

    // 设置 header
    Object.keys(headers).forEach((key) => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      }

      request.setRequestHeader(key, headers[key])
    })

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    // 发送数据
    request.send(data)

    // 监听事件
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(request.getAllResponseHeaders()),
        config,
        request,
      }

      resolve(response)
    }
  })
}

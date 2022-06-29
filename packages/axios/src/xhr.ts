import { AxiosPromise, AxiosRequestConfig } from '../types'
import { AxiosResponse } from '../types/index'
import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import { AxiosError } from "./helpers/error";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout;
    }

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

      // 断网
      if (request.status === 0) {
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

      handleResponse(response)

      function handleResponse(response: AxiosResponse): void {
        if (response.status >= 200 && response.status < 300) {
          resolve(response);
        } else {
          reject(createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request.status,
            response
          ));
        }
      }
    }

    // 监听网络错误事件
    request.onerror = function () {
      reject(createError("Net Error", config, null, request));
    };

    // 监听超时事件
    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, "TIMEOUT", request));
    }
  })
}


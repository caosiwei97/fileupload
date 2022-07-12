// Axios v1.0.0 Copyright (c) 2022 cao and contributors
const toString = Object.prototype.toString
function isDate(val) {
  return toString.call(val) === '[object Date]'
}
function isObject(val) {
  return toString.call(val) === '[object Object]'
}
function extend(target, source, ownKeys) {
  const iterator = ownKeys ? Object.keys : Object.getOwnPropertyNames
  iterator(source).forEach((key) => {
    target[key] = source[key]
  })
  return target
}

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * 处理 URL 参数
 * 1. 拼接普通参数 /get?a=1&b=2
 * 2. 数组参数 /get?arr[]=1&arr[]=2
 * 3. 对象参数 /get?foo=%7B%22bar%22:%22baz%22%7D (foo 后面拼接的是 {"bar":"baz"}encode 后的结果。)
 * 4. 参数为 Date 对象 /get?date=2019-07-24T04:46:41.05190Z
 * 5. 参数包括特殊字符 /get?foo=@:$+
 * 6. 参数包括 null 或 undefined （被忽略）
 * 7. 存在 hash 标记 (哈希被忽略)
 * 8. 拼接已存在的参数
 * @param url 用户传递的 URL 字符串
 * @param params get 参数
 * @returns
 */
function buildURL(url, params) {
  if (!params) return url
  if (url.includes('#')) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      return url.slice(0, hashIndex)
    }
  }
  // 键值对数组，用于最后拼接 URL ['a=1', 'b=2']
  const keyMap = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val == null) return
    let values
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      keyMap.push(`${encode(key)}=${encode(val)}`)
    })
  })
  const serializedParams = keyMap.join('&')
  if (serializedParams) {
    url += (url.includes('?') ? '&' : '?') + serializedParams
  }
  return url
}

function transformRequest(data) {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
function transformResponse(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}

function normalizeHeaderName(headers, normalizedName) {
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
function processHeaders(headers, data) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
function parseHeaders(headers) {
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

class AxiosError extends Error {
  config
  request
  code
  response
  constructor(message, config, request, code, response) {
    super(message)
    this.config = config
    this.request = request
    this.code = code
    this.response = response
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
function createError(message, config, code, request, response) {
  return new AxiosError(message, config, code, request, response)
}

function xhr(config) {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
    } = config
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
    if (timeout) {
      request.timeout = timeout
    }
    // 发送数据
    request.send(data)
    // 监听事件
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(request.getAllResponseHeaders()),
        config,
        request,
      }
      handleResponse(response)
      function handleResponse(response) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request.status,
              response,
            ),
          )
        }
      }
    }
    // 监听网络错误事件
    request.onerror = function () {
      reject(createError('Net Error', config, null, request))
    }
    // 监听超时事件
    request.ontimeout = function () {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'TIMEOUT',
          request,
        ),
      )
    }
  })
}

function axios$1(config) {
  processConfig(config)
  return xhr(config)
}
// 对配置进行处理
function processConfig(config) {
  // 对 URL 进行处理
  config.url = transformURL(config)
  // 处理请求头
  config.headers = transformHeaders(config)
  // 处理请求数据
  config.data = transformRequestData(config)
}
function transformURL({ url, params }) {
  return url && buildURL(url, params)
}
function transformRequestData(config) {
  return transformRequest(config.data)
}
function transformHeaders({ headers = {}, data }) {
  return processHeaders(headers, data)
}

class InterceptorManager {
  interceptors
  constructor() {
    this.interceptors = []
  }
  use(resolved, rejected) {
    this.interceptors.push({
      resolved,
      rejected,
    })
    return this.interceptors.length - 1
  }
  eject(id) {
    if (this.interceptors?.[id]) {
      this.interceptors[id] = null
    }
  }
}

class Axios {
  interceptors
  defaults
  constructor(instanceConfig) {
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
    this.defaults = instanceConfig
  }
  request(url, config) {
    if (typeof url === 'string') {
      config = config || {}
      config.url = url
    } else {
      config = url
    }
    config = { ...config, ...this.defaults }
    const arr = [
      {
        resolved: axios$1,
        rejected: void 0,
      },
    ]
    // 将请求拦截器放入数组前面
    this.interceptors.request.interceptors.forEach((interceptor) => {
      interceptor && arr.unshift(interceptor)
    })
    // 将请求拦截器放入数组后面
    this.interceptors.response.interceptors.forEach((interceptor) => {
      interceptor && arr.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (arr.length) {
      const { resolved, rejected } = arr.shift()
      promise = promise.then(resolved, rejected)
    }
    return promise
  }
  get(url, config) {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url, config) {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url, config) {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url, config) {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url, data, config) {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url, data, config) {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url, data, config) {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithoutData(method, url, config) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
      }),
    )
  }
  _requestMethodWithData(method, url, data, config) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data,
      }),
    )
  }
}

function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
    } = config
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
    if (timeout) {
      request.timeout = timeout
    }
    // 发送数据
    request.send(data)
    // 监听事件
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(request.getAllResponseHeaders()),
        config,
        request,
      }
      handleResponse(response)
      function handleResponse(response) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request.status,
              response,
            ),
          )
        }
      }
    }
    // 监听网络错误事件
    request.onerror = function () {
      reject(createError('Net Error', config, null, request))
    }
    // 监听超时事件
    request.ontimeout = function () {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'TIMEOUT',
          request,
        ),
      )
    }
  })
}

const adapters = {
  xhr: xhrAdapter,
  http: xhrAdapter, // 暂未实现 node 端的请求，暂且用 xhr 代替
}

// 请求带数据的默认 MIME 类型
const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
// 适配器，当前库可以适配客户端（浏览器）和服务端
function getDefaultAdapter() {
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
  return adapter
}
const defaults = {
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

function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig)
  // 可以通过函数调用
  const instance = Axios.prototype.request.bind(context)
  // 拓展请求方法：axios.get, axios.post ...
  extend(instance, Object.getPrototypeOf(context), false)
  extend(instance, context, true)
  return instance
}
const axios = createInstance(defaults)

export { axios as default }
//# sourceMappingURL=axios.esm.js.map

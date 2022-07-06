import {
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn,
} from '../../types'
import dispatchRequest from './dispatchRequest'
import { InterceptorManager } from './InterceptorManager'

interface PromiseArr<T = any> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise<T>)
  rejected?: RejectedFn
}

export default class Axios {
  private interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  private defaults: AxiosRequestConfig

  constructor(instanceConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    }
    this.defaults = instanceConfig
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      config = config || {}
      config.url = url
    } else {
      config = url
    }

    config = { ...config, ...this.defaults }

    const arr: PromiseArr[] = [
      {
        resolved: dispatchRequest,
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
      const { resolved, rejected } = arr.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
      }),
    )
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data,
      }),
    )
  }
}

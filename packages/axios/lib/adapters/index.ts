import xhrAdapter from './xhr'

export const adapters = {
  xhr: xhrAdapter,
  http: xhrAdapter, // 暂未实现 node 端的请求，暂且用 xhr 代替
} as const

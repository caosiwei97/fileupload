import { isDate, isObject } from './util'

function encode(val: string): string {
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
export function buildURL(url: string, params?: any) {
  if (!params) return url

  if (url.includes('#')) {
    const hashIndex = url.indexOf('#')

    if (hashIndex !== -1) {
      return url.slice(0, hashIndex)
    }
  }

  // 键值对数组，用于最后拼接 URL ['a=1', 'b=2']
  const keyMap: string[] = []

  Object.keys(params).forEach((key) => {
    const val = params[key]

    if (val == null) return

    let values: string[]

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

const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Record<string, unknown> {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U extends Record<string, any>>(
  to: T,
  from: U,
): T & U {
  // TODO: TS 类型报错
  Object.getOwnPropertyNames(from).forEach((key) => {
    ;(to as T & U)[key] = from[key]
  })

  return to as T & U
}

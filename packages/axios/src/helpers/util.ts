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
  Object.getOwnPropertyNames(from).forEach((key) => {
    to[key as keyof typeof to] = from[key]
  })

  return to as T & U
}

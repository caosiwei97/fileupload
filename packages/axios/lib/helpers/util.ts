const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Record<string, unknown> {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U extends Record<string, any>>(
  target: T,
  source: U,
  ownKeys?: boolean,
) {
  const iterator = ownKeys ? Object.keys : Object.getOwnPropertyNames

  iterator(source).forEach((key) => {
    target[key as keyof T] = source[key]
  })

  return target as T & U
}

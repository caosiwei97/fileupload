const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Record<string, unknown> {
  return toString.call(val) === '[object Object]'
}

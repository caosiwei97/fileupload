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

export function merge(...objs: any[]): any {
  const result = Object.create(null)

  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i]
    for (const key in obj) {
      assignValue(obj[key], key)
    }
  }

  function assignValue(val: any, key: string) {
    if (isObject(result[key]) && isObject(val)) {
      result[key] = merge(result[key], val)
    } else if (isObject(val)) {
      result[key] = merge({}, val)
    } else {
      result[key] = val
    }
  }
  return result
}

export declare function isDate(val: any): val is Date
export declare function isObject(val: any): val is Record<string, unknown>
export declare function extend<T, U extends Record<string, any>>(
  target: T,
  source: U,
  ownKeys?: boolean,
): T & U

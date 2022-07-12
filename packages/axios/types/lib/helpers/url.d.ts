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
export declare function buildURL(url: string, params?: any): string

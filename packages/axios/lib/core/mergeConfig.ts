import { isObject, merge } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig,
): AxiosRequestConfig {
  const config = Object.create(null) // 创建空对象，作为最终的结果
  userConfig = userConfig || {}

  function getMergedValue(target: any, source: any) {
    if (isObject(target) && isObject(source)) {
      return merge(target, source)
    } else if (isObject(source)) {
      return merge({}, source)
    } else if (Array.isArray(source)) {
      return source.slice()
    }
    return source
  }

  // 策略一：只接受用户配置,不管默认配置对象里面有没有
  function valueFromUserConfig(prop: MergeKeys) {
    if (userConfig?.[prop]) {
      return getMergedValue(undefined, userConfig[prop])
    }
  }

  // 策略二：用户配置了就用用户配置的，如果用户没配置，则用默认配置的
  function defaultToUserConfig(prop: MergeKeys) {
    return getMergedValue(
      undefined,
      userConfig?.[prop] ? userConfig[prop] : defaultConfig[prop],
    )
  }

  // 策略三：深度合并（比如header对象）
  function mergeDeepProperties(prop: MergeKeys) {
    if (userConfig?.[prop]) {
      return getMergedValue(defaultConfig[prop], userConfig[prop])
    }

    return getMergedValue(undefined, defaultConfig[prop])
  }

  // 策略类
  const mergeMap = {
    url: valueFromUserConfig,
    method: valueFromUserConfig,
    data: valueFromUserConfig,

    baseURL: defaultToUserConfig,
    transformRequest: defaultToUserConfig,
    transformResponse: defaultToUserConfig,
    timeout: defaultToUserConfig,
    withCredentials: defaultToUserConfig,
    adapter: defaultToUserConfig,
    responseType: defaultToUserConfig,

    headers: mergeDeepProperties,
  }

  type MergeKeys = keyof typeof mergeMap

  // 策略分发
  const defaultConfigKeys = Reflect.ownKeys(defaultConfig)
  const userConfigKeys = Reflect.ownKeys(userConfig)

  // key 去重
  const mergeKeys = [
    ...new Set([...defaultConfigKeys, ...userConfigKeys]),
  ] as MergeKeys[]

  mergeKeys.forEach((prop) => {
    const strategy = mergeMap[prop]
    const configValue = strategy(prop)

    config[prop] = configValue
  })

  return config
}

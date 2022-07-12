import { AxiosRequestConfig } from '../types'

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig,
): AxiosRequestConfig {
  const config = Object.create(null) // 创建空对象，作为最终的结果

  // 1.常规属性，如果用户配置了就用用户配置的，如果用户没配置，则用默认配置的；

  // 2.只接受用户配置,不管默认配置对象里面有没有，我们只取用户配置的；

  // 3.复杂对象深度合并
}

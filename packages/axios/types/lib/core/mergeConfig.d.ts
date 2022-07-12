import { AxiosRequestConfig } from '../types'
export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig,
): AxiosRequestConfig

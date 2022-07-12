import { AxiosRequestConfig, AxiosResponse } from '../types/index'
export declare class AxiosError extends Error {
  private config
  private request?
  private code?
  private response?
  constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: any,
    code?: string | null | number,
    response?: AxiosResponse,
  )
}
export declare function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null | number,
  request?: any,
  response?: AxiosResponse,
): AxiosError

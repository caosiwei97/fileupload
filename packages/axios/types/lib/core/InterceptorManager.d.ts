import { RejectedFn, ResolvedFn } from '../types'
export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export declare class InterceptorManager<T> {
  interceptors: Array<Interceptor<T> | null>
  constructor()
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

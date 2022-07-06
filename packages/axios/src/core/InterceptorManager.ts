import { RejectedFn, ResolvedFn } from '../../types'

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export class InterceptorManager<T> {
  public interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({
      resolved,
      rejected,
    })

    return this.interceptors.length - 1
  }

  eject(id: number) {
    if (this.interceptors?.[id]) {
      this.interceptors[id] = null
    }
  }
}

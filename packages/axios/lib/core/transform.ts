import { AxiosTransformer } from '../types/index'

export function transform(
  data: any,
  headers: any,
  transformers?: AxiosTransformer | AxiosTransformer[],
) {
  if (!transformers) {
    return data
  }

  transformers = Array.isArray(transformers) ? transformers : [transformers]
  transformers.forEach((transformer) => {
    data = transformer(data, headers)
  })

  return data
}

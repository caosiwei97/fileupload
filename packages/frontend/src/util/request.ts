import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'

// 为每个请求都创建一个实例，这样实例之间就不会受到影响
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // 对请求数据做转换
  transformRequest(data, headers) {
    const contentType = headers['Content-Type']

    // {a: 'xx', b: 'xx'} ==> a=xx&b=xx
    if (contentType === 'application/x-www-form-urlencoded') {
      return qs.stringify(data)
    }

    return data
  },
})

instance.interceptors.request.use(
  (config) => {
    config.url = config.url?.trim()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const status = response.data.status

    if (!status || status === 200) return response

    ElMessage.error(response.data.msg || '请求失败，请刷新重试')

    return Promise.reject(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default <T = any>(config: AxiosRequestConfig) =>
  instance(config).then((res) => (res.data.data || res.data) as T)

# TS 实现的简易版 axios

主要是为了练手 TS，不用于真实项目。

## 需求分析

> 照搬 Axios 特性。

- 支持浏览器（底层使用 XMLHttpRequest）和 Node.js
- 支持 Promise
- 请求响应拦截器
- 转换请求和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端（即浏览器）支持防御 XSRF

## 通过问题掌握源码架构

- axios 是如何做到又可以通过函数调用，也可以通过 axios.get 这种对象方式调用的？
- axios 是如何同时支持浏览器和 node 的？
- axios 中的拦截器如何实现，如何保证它们的顺序？
- 请求取消如何实现

### 请求取消的视线

- 利用 CancelToken.source 工厂创建取消令牌

```js
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/user/12345', {
    cancelToken: source.token,
  })
  .catch(function (e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message)
    } else {
      // handle error
    }
  })

axios.post(
  '/user/12345',
  {
    name: 'new name',
  },
  {
    cancelToken: source.token,
  },
)

// cancel the request (the message parameter is optional)
// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.')
```

- 通过传递取消函数给 CancelToken 构造函数取消

```js
const CancelToken = axios.CancelToken
let cancel

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    // executor函数接收一个取消函数作为参数
    cancel = c
  }),
})

// cancel the request
cancel()
```

## 如何发布一个兼容浏览器和 node 的包？

- 支持 import 引入 （支持 ESM 模块规范）
- 支持 require 引入 （支持 CJS 模块规范）
- 支持 script 引入 （支持 umd 通用模块规范）
- 支持 ts 提示
- 支持 sourcemap

总上可以打包成三种类型：

- esm 版本：支持 minified 和 未 minified，前者直接在浏览器通过 `type="module"` 使用，后者一般在使用 rollup、webpack 的项目中使用，由开发者自己打包，不编译源代码
- umd 版本：支持浏览器通过 CDN 方式引入，编译源代码
- node：打包成 cjs ，支持在 node 中引入，不编译源代码

## 其他

1. package.json 中的 main 、module、browser, exports 有什么作用？

## 参考

- [package.json 中 你还不清楚的 browser，module，main 字段优先级](https://github.com/SunshowerC/blog/issues/8)

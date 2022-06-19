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

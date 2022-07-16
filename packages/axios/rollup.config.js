/* eslint-disable @typescript-eslint/no-var-requires */
import ts from 'rollup-plugin-typescript2' // 懒人插件，提供 TS => JS 功能并生成类型声明
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve' // 告诉 rollup 如何查找第三方模块
import commonjs from '@rollup/plugin-commonjs' // 将第三方包的 cjs 转为 esm
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { defineConfig } from 'rollup'
import autoExternal from 'rollup-plugin-auto-external' // 不打包第三方依赖

const lib = require('./package.json')
const input = 'index.ts' // 通用入口
const outputFileName = 'axios' // 输出的文件名称
const name = 'axios' // umd 导出的全局变量名

// 构建 rollup 配置
const buildConfig = ({
  es5 = false, // 判断是否需要用 babel 编译
  browser = true, // plugin-node-resolve 中的 browser 配置
  minified = false, // 是否构建为压缩版本（调用 terser）
  ...rollupConfig // rollup 自身配置
}) => {
  // banner
  const year = new Date().getFullYear()
  const banner = `// Axios v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`

  return defineConfig({
    input,
    ...rollupConfig,
    output: {
      ...rollupConfig.output,
      file: `${rollupConfig.output.file}.${minified ? 'min.js' : 'js'}`,
      banner,
    },
    plugins: [
      commonjs(),
      json(),
      resolve({ browser }),
      ts({
        useTsconfigDeclarationDir: true, // 使用 TSConfig 中的声明配置
      }),
      minified && terser(),
      ...(es5
        ? [
            babel({
              babelHelpers: 'bundled',
              presets: ['@babel/preset-env'],
            }),
          ]
        : []),
      ...(rollupConfig.plugins || []),
    ],
  })
}

export default async () => {
  return [
    // umd
    buildConfig({
      // minified: true,
      es5: true,
      output: {
        file: `dist/${outputFileName}.umd`,
        format: 'umd',
        name,
      },
    }),
    // esm
    buildConfig({
      output: {
        file: `dist/${outputFileName}.esm`,
        format: 'esm',
        preferConst: true, // 指定为导出生成 const 声明，而不是 var 声明
      },
    }),
    // cjs
    buildConfig({
      output: {
        file: `dist/${outputFileName}.cjs`,
        format: 'cjs',
        exports: 'default',
        preferConst: true, // 指定为导出生成 const 声明，而不是 var 声明
      },
      plugins: [autoExternal(), resolve(), commonjs()],
    }),
  ]
}

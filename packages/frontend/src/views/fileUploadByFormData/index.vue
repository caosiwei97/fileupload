<template>
  <h2>单一文件上传 FormData</h2>
  <el-row class="singlefile-upload-formdata" justify="center">
    <input class="singlefile-upload-formdata__file-btn" type="file" ref="file" />
    <el-col :gutter="10">
      <el-button type="primary" :icon="CirclePlusFilled">选择文件</el-button>
      <el-button type="success" :icon="UploadFilled">上传服务器</el-button>
    </el-col>
    <el-col :gutter="10">
      <el-alert type="info" :closable="false" description="" show-icon />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { CirclePlusFilled, UploadFilled } from '@element-plus/icons-vue'
  import axios from '@nice/axios'

  onMounted(async () => {
    const data = await axios({
      url: 'http://localhost:3001/api/base',
      method: 'post',
      data: {
        a: 1,
        b: 2,
      },
    })

    console.log(data)
  })

  // // 普通参数
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     a: 1,
  //     b: 2,
  //   },
  // })

  // // 参数值为数组
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     foo: ['bar', 'baz'],
  //   },
  // })

  // // 参数值为对象
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     foo: {
  //       bar: 'baz',
  //     },
  //   },
  // })

  // // 参数值为 Date 类型
  // const date = new Date()
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     date,
  //   },
  // })

  // // 参数值包含特殊字符
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     foo: '@:$, ',
  //   },
  // })

  // // 参数值包含null或`undefined`
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base',
  //   params: {
  //     foo: 'bar',
  //     baz: null,
  //   },
  // })

  // // url 中存在哈希#标记
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base#hash?bar=baz',
  //   params: {
  //     foo: 'bar',
  //   },
  // })

  // // url 中已存在的参数
  // axios({
  //   method: 'get',
  //   url: 'http://localhost:3001/api/base?foo=bar',
  //   params: {
  //     bar: 'baz',
  //   },
  // })
  const props = defineProps({
    accept: {
      type: String,
      default: '',
    },
  })
  const file = ref<HTMLElement | null>(null)
</script>

<style scoped lang="scss">
  .singlefile-upload-formdata {
    height: 150px;
    padding: 20px;
    border: 1px dotted;

    &__file-btn {
      display: none;
    }
  }
</style>

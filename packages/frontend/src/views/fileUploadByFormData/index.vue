<template>
  <h2>单一文件上传 FormData</h2>
  <el-row class="singlefile-upload-formdata" justify="center">
    <input class="singlefile-upload-formdata__file-btn" type="file" ref="file" />
    <el-col :gutter="10">
      <my-button type="primary" :icon="CirclePlusFilled">选择文件</my-button>
      <my-button type="success" :icon="UploadFilled">上传服务器</my-button>
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

import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import AppLayoutVue from '~/layout/AppLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayoutVue,
    children: [
      {
        path: '',
        name: 'FileUploadByFormData',
        component: () => import('~/views/fileUploadByFormData/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

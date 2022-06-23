import { createApp } from 'vue'
import App from './App.vue'
import '~assets/styles/index.scss'
import router from './router'
import MyUI from './plugins/my-ui'

const app = createApp(App)

app.config.globalProperties.$MY_UI_CONFIG = {
  size: 'small',
}

app.use(router).use(MyUI).mount('#app')

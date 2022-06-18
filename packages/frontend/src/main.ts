import { createApp } from 'vue'
import App from './App.vue'
import '~assets/styles/index.scss'
import router from './router'
import MyUI from './plugins/my-ui'

createApp(App).use(router).use(MyUI).mount('#app')

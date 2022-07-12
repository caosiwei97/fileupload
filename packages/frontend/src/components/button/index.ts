import { App } from 'vue'
import ButtonVue from './Button.vue'

export default {
  install(Vue: App) {
    Vue.component(ButtonVue.name, ButtonVue)
  },
}

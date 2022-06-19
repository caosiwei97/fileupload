import { App, Component } from 'vue'

export default {
  install(app: App) {
    const modules = import.meta.globEager('../components/**/*.vue')

    for (const path in modules) {
      const comp = modules[path].default as Component
      app.component(comp.name, modules[path].default)
    }
  },
}

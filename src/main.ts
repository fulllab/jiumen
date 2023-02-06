import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import loadAnt from './plugins/antd'
import 'ant-design-vue/dist/antd.css'
import './style/basic.styl'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import { setupI18n } from './locales/setupI18n'

import App from './App.vue'
const app = createApp(App)

app.use(store).use(router)

loadAnt(app)
setupI18n(app)

app.mount('#app')

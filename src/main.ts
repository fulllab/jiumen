import { createApp } from 'vue'
import router from '@/router'
import { store } from '@/store'
import loadAnt from '@/plugins/antd'
import '@/style/basic.styl'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import App from './App.vue'

const app = createApp(App)
loadAnt(app)

app.use(store).use(router).mount('#app')

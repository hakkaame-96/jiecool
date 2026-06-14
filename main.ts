import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import '@/styles/global.scss'
import 'vant/lib/index.css'
import {
  NavBar,
  Button,
  Icon,
  Empty,
  Checkbox,
  Field,
  Form,
  Cell,
  CellGroup
} from 'vant'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(NavBar)
app.use(Button)
app.use(Icon)
app.use(Empty)
app.use(Checkbox)
app.use(Field)
app.use(Form)
app.use(Cell)
app.use(CellGroup)
app.mount('#app')

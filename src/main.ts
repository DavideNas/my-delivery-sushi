import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 1. Importa il plugin Vuetify appena creato
import vuetify from './plugins/vuetify'

// 2. Crea l'app Vue
const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3. Usa Vuetify
app.use(vuetify)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import quasarUserOptions from './quasar-user-options'
import { Quasar } from 'quasar'


createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app')

import Vue from 'vue'
import App from './App.vue'

// Underscore
import underscore from 'vue-underscore';

// Tailwind
import '@/assets/css/tailwind.css'

// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

// Use underscore
Vue.use(underscore);

// Use font-awesome
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  render: h => h(App),
}).$mount('#app')

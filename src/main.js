import Vue from 'vue'
import App from './App.vue'

// Underscore
import underscore from 'vue-underscore'

Vue.use(underscore)

// Tailwind
import '@/assets/css/tailwind.css'

// Font-Awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// DataTable
import {VuejsDatatableFactory} from 'vuejs-datatable'

Vue.use(VuejsDatatableFactory)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

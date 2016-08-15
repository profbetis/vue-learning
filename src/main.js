import Vue from 'vue'
import AppComponent from './components/app-component'
import siteTitle from './components/siteTitle'

export default new Vue({
  el: '#app',
  components: {
    'app-component': AppComponent,
    'site-title': siteTitle
  }
})

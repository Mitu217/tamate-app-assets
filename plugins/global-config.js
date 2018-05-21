import Vue from 'vue'
import config from '../prod.config.json'

Vue.mixin({
  data () {
    return {
      config: config
    }
  }
})
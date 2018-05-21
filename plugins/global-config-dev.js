import Vue from 'vue'
import config from '../dev.config.json'

Vue.mixin({
  data () {
    return {
      config: config
    }
  },
})
import 'less/common/index.less'
import 'components'
import Vue from 'vue'
import mixins from 'mixins'
import plugins from 'plugins'

Vue.use(mixins)
Vue.use(plugins)

Vue.prototype.$isDevMode = process.env.NODE_ENV !== 'production'

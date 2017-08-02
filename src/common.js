import 'less/common/index.less'
import Vue from 'vue'
import mixins from 'mixins'
import plugins from 'plugins'
import components from 'components'

Vue.use(mixins)
Vue.use(plugins)
Vue.use(components)

Vue.prototype.$isDevMode = process.env.NODE_ENV !== 'production'

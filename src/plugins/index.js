import ellipsis from 'utils/ellipsis'

export default {
    install(Vue) {
        Vue.filter('ellipsis', ellipsis)
    }
}

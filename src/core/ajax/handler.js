import { errCodes, errWhiteList } from './config'

const matchWhiteList = ({ method, baseURL, url }) => {
    if(method !== 'get') return false
    return errWhiteList.some(item => item.test(url.replace(/(\?.+)?$/, '')))
}

export default request => new Promise((resolve, reject) => {
    request.then(res => resolve(res.data)).catch(err => {
        const code = Number(err.code)
        if(code === 302) {
            location.href = err.location
            return
        }

        if(errCodes.includes(code)) {
            matchWhiteList(err.config)
                ? reject(err)
                : location.replace(`${location.pathname}#/404`)
            // return
        }

        // store.commit('handleMessage', err)
    })
})

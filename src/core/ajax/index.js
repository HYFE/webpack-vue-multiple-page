import axios from 'axios'
import HTTP_HANDLE from './handler'
import { CONTENT_TYPE, ROOT_PATH } from './config'
// import { REQ_INTERCEPTOR, RES_INTERCEPTOR } from './interceptors'

axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = CONTENT_TYPE
axios.defaults.baseURL = ROOT_PATH
axios.defaults.headers.accpet = CONTENT_TYPE
axios.defaults.responseType = 'json'
// Object.assign(axios.defaults.headers, XHR_HEADER)

// axios.interceptors.request.use(REQ_INTERCEPTOR)
// axios.interceptors.response.use(RES_INTERCEPTOR, error => Promise.reject(error))

/**
 * 格式化参数
 * @param {*} params Object
 */
// const QS = (params = {}) => {
//     // const urlParams = new URLSearchParams()
//     let url = ''
//     Object.keys(params).forEach((k, i) => {
//         url += `${i === 0 ? '' : '&'}${k}=${params[k]}`
//         // urlParams.append(k, params[k])
//     })
//     return url
//     // return urlParams
// }

/**
 * http GET
 * @param {*} url String
 * @param {*} params Object
 */
export const GET = (url, params) => HTTP_HANDLE(axios.get(url, params ? {
    params
} : params))

/**
 * http POST
 * @param {*} url String
 * @param {*} body Object
 */
export const POST = (url, body) => HTTP_HANDLE(axios.post(url, body))

/**
 * http PUT
 * @param {*} url String
 * @param {*} body Object
 */
export const PUT = (url, body) => HTTP_HANDLE(axios.put(url, body))

/**
 * http DELETE
 * @param {*} url String
 * @param {*} params Object
 */
export const DELETE = (url, params) => HTTP_HANDLE(axios.delete(url, params ? {
    params
} : params))

/**
 * REQUEST
 * @param {*} url
 * @param {*} option
 */
export const REQUEST = (url, option) => HTTP_HANDLE(axios(url, option))

export const PATH = (url, ...arg) => {
    const reqUrl = url.replace(/:[a-zA-Z]+/g, () => arg.shift())
    return {
        get: params => GET(reqUrl, params),
        post: params => POST(reqUrl, params),
        delete: params => DELETE(reqUrl, params),
        put: params => PUT(reqUrl, params),
        request: params => REQUEST(reqUrl, params),
    }
}

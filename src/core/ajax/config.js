// import { SYS_CONF, U_TAG, PRELOAD } from 'appCfg'

// export const XHR_HEADER = {
//     'X-SID': SYS_CONF['X-SID'],
//     'X-PHPSESSID': SYS_CONF['X-PHPSESSID'],
//     'X-OU-ID': `${PRELOAD && PRELOAD.user ? PRELOAD.user.ouId : ''}`,
//     'X-Requested-With': 'XMLHttpRequest',
//     _tag: U_TAG
// }

// export const updateHeader = ({ SID, PHPSESSID }) => {
//     XHR_HEADER['X-SID'] = SID
//     XHR_HEADER['X-PHPSESSID'] = PHPSESSID
// }

export const ROOT_PATH = '/api'
export const CONTENT_TYPE = 'application/json'

export const errCodes = [
    10001,  // 资源未找到
    404     // 404
]

// 存放向下放行 reject 的请求，供视图独立处理 404
export const errWhiteList = []

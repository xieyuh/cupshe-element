import { postRequest, getRequest, setDefaultConfig } from 'cupshe-axios'
// 全局设置axios
setDefaultConfig()

export const get = getRequest
export const post = postRequest

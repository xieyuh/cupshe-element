import { postRequest } from 'cupshe-axios'
/**
 * 文件下载
 * @param {*} url
 * @param {*} params
 * @param {*} option
 */
export const downloadFile = (url, params, option = {}) => {
  return new Promise((resolve, reject) => {
    postRequest(
      'http://mall-release.kapeixi.cn/api/discount/v1/download',
      params,
      {
        ...option,
        ...{
          responseType: 'blob'
        }
      }
    )
      .then(res => {
        // 创建类文件对象 type需指定为文件的mime类型：application/force-download 通用设置
        const blob = new Blob([res], {
          type: res.type
        })
        const archor = document.createElement('a')
        //  将blob实例创建成一个链接
        const href = URL.createObjectURL(blob)
        archor.setAttribute('href', href)
        archor.setAttribute('download', option.fileName || new Date().getTime()) //指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
        document.body.appendChild(archor)
        archor.click()
      })
      .catch(error => {
        alert('下载失败')
        reject(error)
      })
  })
}

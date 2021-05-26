const shell = require('shelljs')
// 配置需要升级的依赖包
const config = ['cupshe-axios', 'cupshe-css', 'cupshe-icon', 'cupshe-utils']

//执行npm run build 命令
shell.echo('升级cupshe自定义依赖包：npm run update')
config.forEach(item => {
  shell.exec(`npm i ${item}@latest `)
})
shell.echo('升级cupshe自定义依赖完成')
shell.exit(0)

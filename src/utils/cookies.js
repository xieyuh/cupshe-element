'use strict'

let utils = require('./util')
// Standard browser envs support document.cookie
module.exports = utils.isStandardBrowserEnv()
  ? (function standardBrowserEnv() {
    return {
      set: function(name, value, expires, path, domain, secure) {
        let cookie = []
        cookie.push(name + '=' + encodeURIComponent(value))

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString())
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path)
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain)
        }

        if (secure === true) {
          cookie.push('secure')
        }

        document.cookie = cookie.join('; ')
      },

      get: function(name) {
        let match = document.cookie.match(
          new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
        )
        return match ? decodeURIComponent(match[3]) : null
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000)
      }
    }
  })()
  : // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      set: function write() {},
      get: function read() {
        return null
      },
      remove: function remove() {}
    }
  })()

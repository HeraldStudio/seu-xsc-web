import axios from 'axios'

export default { 
    install(Vue, options){
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
          }
    }
}
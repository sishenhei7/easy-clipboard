declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $clipboardJS: {
      copy: Function
      cut: Function
      destroy: Function
    }
  }
}

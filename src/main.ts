import Vue from 'vue'
import hljs from 'highlight.js/lib/highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'

Vue.config.productionTip = false

// 代码高亮
hljs.registerLanguage('javascript', javascript);
Vue.directive('highlight', el => {
  const blocks = el.querySelectorAll('code')
  blocks.forEach(block => hljs.highlightBlock(block))
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

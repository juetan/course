// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './assets/router'
import global from './assets/global'

//导入Element-UI插件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入Axios
import axios from 'axios'

//import VideoPlayer from 'vue-video-player';
//require('video.js/dist/video-js.css');
//require('vue-video-player/src/custom-theme.css');
//Vue.use(VideoPlayer);

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(global)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
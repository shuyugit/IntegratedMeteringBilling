/* eslint-disable */
// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import 'lib-flexible'
import VideoPlayer from 'vue-video-player'
import 'element-ui/lib/theme-chalk/base.css'
import 'swiper/css/swiper.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Heatmap from 'heatmap.js'
import {
  post,errMsg
} from './httpserve/httpserve'
import 'view-design/dist/styles/iview.css';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(Viewer)
Vue.use(VideoPlayer)
Vue.use(Heatmap)
Vue.prototype.$post = post;
Vue.prototype.$errMsg = errMsg;
// fade/zoom 等
Vue.component(CollapseTransition.name, CollapseTransition)
// 核心插件
Vue.use(d2Admin)
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuAside)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')

<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{ grayMode: grayActive }"
  >
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1,
        }"
        flex-box="0"
        flex
      >
        <div
          class="logo-group"
          :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth }"
          flex-box="0"
        >
          <img
            v-if="asideCollapse"
            :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`"
          />
          <img
            v-else
            :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`"
          />
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars" />
        </div>
        <div flex-box="0" class="Header_Owntit">新奥能源配电营销计量系统</div>
        <d2-menu-header flex-box="1" />

        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->

          <!-- <d2-header-log/> -->
          <!-- <d2-header-fullscreen/> -->
          <!-- <d2-header-theme/> -->
          <!-- <d2-header-size/>-->
          -->
          <!-- <d2-header-locales/> -->
          <!-- <d2-header-search @click="handleSearchClick"/>  -->
          <d2-header-user />
          <div class="selfCreatBtn">
            <div
              @click="choseType(1)"
              :class="['selfCreatBtnItem', { addBorder: choseIndex == 1 }]"
            >
              营销
            </div>
            <div
              @click="choseType(2)"
              :class="['selfCreatBtnItem', { addBorder: choseIndex == 2 }]"
            >
              计量
            </div>
            <div
              @click="choseType(3)"
              :class="['selfCreatBtnItem', { addBorder: choseIndex == 3 }]"
            >
              基础
            </div>
          </div>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1,
          }"
        >
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search ref="panelSearch" @close="searchPanelClose" />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div
              v-if="!searchActive"
              class="d2-theme-container-main-layer"
              flex="dir:top"
            >
              <!-- 页面 -->
              <!-- <div style="width: 100%; height: 50px; background: red">
                <el-breadcrumb separator=">">
                  <span class="crumbBox"></span>
                  <el-breadcrumb-item
                    v-for="item in breadCrumbData"
                    :key="item.path"
                  >
                    <router-link :to="item.path">{{ item.title }}</router-link>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div> -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view />
                  </keep-alive>
                </transition>
              </div>
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from "./components/menu-side";
import d2MenuHeader from "./components/menu-header";
import d2Tabs from "./components/tabs";
import d2HeaderFullscreen from "./components/header-fullscreen";
import d2HeaderLocales from "./components/header-locales";
import d2HeaderSearch from "./components/header-search";
import d2HeaderSize from "./components/header-size";
import d2HeaderTheme from "./components/header-theme";
import d2HeaderUser from "./components/header-user";
import d2HeaderLog from "./components/header-log";
import d2HeaderColor from "./components/header-color";
import { mapState, mapGetters, mapActions } from "vuex";
import mixinSearch from "./mixins/search";
export default {
  name: "d2-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog,
    d2HeaderColor,
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: "180px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px",
      choseIndex: 2,
      breadCrumbData: [], //面包屑
    };
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      // this.getBreadcrumb();
    },
  },
  computed: {
    ...mapState("d2admin", {
      keepAlive: (state) => state.page.keepAlive,
      grayActive: (state) => state.gray.active,
      transitionActive: (state) => state.transition.active,
      asideCollapse: (state) => state.menu.asideCollapse,
    }),
    ...mapGetters("d2admin", {
      themeActiveSetting: "theme/activeSetting",
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...(this.themeActiveSetting.backgroundImage
          ? {
              backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`,
            }
          : {}),
      };
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    ...mapActions("d2admin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    },

    choseType(num) {
      // this.choseIndex=num;
    },
    getBreadcrumb() {
      //获取面包屑
      console.info('进入方法')
      var list = this.$route.fullPath.split("/");
      console.info('进入方法2',list)
      for (var i in list) {
        if (list[i].indexOf("?") > 0) {
          list[i] = list[i].split("?")[0];
        }
      }
      this.breadCrumbData = [];
      function fn(obj, arr, index, self) {
        if (obj.hasOwnProperty("children") && obj["children"].length > 0) {
          for (let one of obj.children) {
            if (one.name != "park" && one.name == arr[index]) {
              self.breadCrumbData.push({
                title: one.meta.title,
                path: list.slice(0, index + 1).join("/"),
              });
              return one.hasOwnProperty("children") &&
                one["children"].length > 0
                ? fn(one, arr, index + 1, self)
                : false;
            }
          }
        }
      }
      for (var i in list) {
        for (var j in this.$store.getters.routers) {
          if (this.$store.getters.routers[j].children.length > 0) {
            for (let one of this.$store.getters.routers[j].children) {
              if (one.hasOwnProperty("name") && one.name == list[i]) {
                this.breadCrumbData.push({
                  title: one.meta.title,
                  path: "/park/" + one.path,
                });
                fn(one, list, 2, this);
                break;
              }
            }
          }
        }
      }
       console.info('进入方法3',this.breadCrumbData)
    },
  },
};
</script>

<style lang="scss">
// 注册主题
@import "~@/assets/style/theme/register.scss";
</style>

<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >
      {{ time }}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            <!-- 时间是一切财富中最宝贵的财富 -->
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <img class="page-login--logo" src="./image/loginLogo.png" />
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="用户名"
                  >
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    placeholder="密码"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  color="#3882FB"
                  class="button-login"
                  >登录</el-button
                >
              </el-form>
            </el-card>
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p>-->
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />威思顿科技
          </p>
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>-->
        </div>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{ user.name }}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */

import dayjs from "dayjs";
import util from '@/libs/util.js';
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import { mapActions } from "vuex";
import localeMixin from "@/locales/mixin.js";
export default {
  mixins: [localeMixin],
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: "Admin",
          username: "admin",
          password: "admin",
        },
        {
          name: "Editor",
          username: "editor",
          password: "editor",
        },
        {
          name: "User1",
          username: "user1",
          password: "user1",
        },
      ],
      // 表单
      formLogin: {
        username: "",
        password: "",
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    loginMsg(userMsg) {
      this.login(userMsg).then((res) => {
        // 重定向对象不存在则返回顶层路径
        console.info("去某一页", res);
        this.$router.replace(this.$route.query.redirect || "/");
      });
    },
    fetchData: async function (info) {
      const db = await this.$store.dispatch("d2admin/db/database", {
        user: true,
      });
      db.set("userInfo", info).write();
    },
  
    getTimeList() {
      var that = this;
      var info = {};
      that.$post("1056", info, "获取中").then((response) => {
        console.info("时间列表", response);
        if (response.Code == 1) {
          this.fetchTimeList(response.Data);
        } else {
          this.$message({
            showClose: true,
            message: response.Msg,
            type: "error",
          });
        }
      });
    },
    submit() {
      this.$post("authorization?method=login", this.formLogin, "登录中").then((res) => {
        if (res.access_token) {
          util.cookies.set('token', res.token_type + ' ' + res.access_token)
          this.$router.push({name: 'index'})
          // // 获取下拉菜单集合
          // this.$sysApi.getAllDropMap('-1').then((res) => {
          //   localStorage.setItem('DropMap', JSON.stringify(res))
          // }).catch(err => {
          //   console.log(err)
          //   this.$Message.error('服务器错误请求失败')
          // })
          //
          // // 获取下拉K-V关系
          // this.$sysApi.getAllDropKV('1').then((res) => {
          //   localStorage.setItem('DropKV', JSON.stringify(res))
          //   this.$router.push({
          //     // name: 'upComing'
          //     name: 'home'
          //   })
          // }).catch(err => {
          //   console.log(err)
          //   this.$Message.error('服务器错误请求失败')
          // })
          // // 获取营业区域
          // this.$sysApi.getSysDropFromSql().then((res) => {
          //   localStorage.setItem('SysDropMap', JSON.stringify(res))
          // }).catch(err => {
          //   console.log(err)
          //   this.$Message.error('服务器错误请求失败')
          // })
        } else {
          let reg = /[\u4e00-\u9fa5]/g
          let names = res.msg.match(reg)
          let str = names.join('')
          this.$message({
            showClose: true,
            message: str,
            type: "error",
          });
        }

      }).catch(err=>{
          console.log(err,88888888888)
      })
      // var that = this;
      // var info = {
      //   loginAccount: this.formLogin.username,
      //   password: this.formLogin.password,
      // };
      // var userinfo = {
      //   ID: "9260ae35-6b3b-4593-8e42-b0f5ece16123",f
      //   LoginAccount: "admin",
      //   Name: "管理员",
      //   CodeName: "001",
      //   Phone: "17521216340",
      //   DateTime: "2020-03-25T14:14:07",
      //   _DateTime: "2020-03-25 14:14",
      // };
      // this.fetchData(userinfo);

    },
  },
};
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  width: 100%;
  height: 100%;
  background-image: url('./image/loginbakground.jpg');
  background-size:100% 100%;
  background-position: center 0;
  background-repeat: no-repeat;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
      background-color: #3d65b5 !important;
      border-color: #3d65b5 !important;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>

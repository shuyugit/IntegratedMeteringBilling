<template>
  <d2-container>
    <div id="SystemSize">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>计量</el-breadcrumb-item>
        <el-breadcrumb-item>资产统计</el-breadcrumb-item>
        <el-breadcrumb-item>系统规模查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="showMainPart"></div>
    </div>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { Loading } from "element-ui";
export default {
  name: "SystemSize",
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped>
#SystemSize {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(248, 248, 248, 1);
  padding: 20px 20px;
}
.showMainPart {
  width: 100%;
  height: 100%;
  padding: 0px 26px 0px 26px;
  margin-top: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
}
</style>

<style>
</style>
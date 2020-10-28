<template>
  <d2-container>
    <div id="FileRationalityCheck">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>计量</el-breadcrumb-item>
        <el-breadcrumb-item>电网档案</el-breadcrumb-item>
        <el-breadcrumb-item>档案合理性检查</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="showMainPart"></div>
    </div>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { Loading } from "element-ui";
export default {
  name: "FileRationalityCheck",
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
#FileRationalityCheck {
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
  margin-top: 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
}
</style>

<style>
</style>
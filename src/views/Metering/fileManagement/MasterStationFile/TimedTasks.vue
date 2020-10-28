<template>
  <d2-container>
    <div id="TimedTasks">
      <div class="tabSwitchPartRoot">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>计量</el-breadcrumb-item>
          <el-breadcrumb-item>主站档案</el-breadcrumb-item>
          <el-breadcrumb-item>定时任务配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-radio-group v-model="tabPosition" size='small' >
          <el-radio-button label="collection">采集任务编制</el-radio-button>
          <el-radio-button label="calculation">计算任务编制</el-radio-button>
          <el-radio-button label="assessment">数据考核规则</el-radio-button>
        </el-radio-group>
      </div>

      <div class="showMainPart"></div>
    </div>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { Loading } from "element-ui";
export default {
  name: "TimedTasks",
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      tabPosition:'collection',
      
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped>
#TimedTasks {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(248, 248, 248, 1);
  padding: 10px 20px;
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
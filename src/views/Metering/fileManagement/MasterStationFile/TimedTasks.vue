<template>
  <d2-container>
    <div id="TimedTasks">
      <div class="tabSwitchPartRoot">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>计量</el-breadcrumb-item>
          <el-breadcrumb-item>主站档案</el-breadcrumb-item>
          <el-breadcrumb-item>定时任务配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-radio-group v-model="tabPosition" size="small">
          <el-radio-button label="collection">采集任务编制</el-radio-button>
          <el-radio-button label="calculation">计算任务编制</el-radio-button>
          <el-radio-button label="assessment">数据考核规则</el-radio-button>
        </el-radio-group>
      </div>
      <div class="showMainPart">
        <Split v-model="split3">
          <div slot="left" class="demo-split-pane no-padding">
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="selection"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="wayName"
                label="采集机组名称"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="Effective"
                label="是否有效"
              ></el-table-column>
              <el-table-column align="center" label="分配主机">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handMation(scope.$index, scope.row)"
                    >{{ "主机个数：" + scope.row.hostmachine }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleEdit(scope.$index, scope.row)"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="right" class="demo-split-pane rightSplit">
            <Split v-model="split4">
              <div slot="top" class="demo-split-pane">
                <el-table
                  ref="multipleTable2"
                  :data="tableData2"
                  stripe
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    type="selection"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="wayName"
                    label="采集机组名称"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="Effective"
                    label="是否有效"
                  ></el-table-column>
                  <el-table-column align="center" label="分配主机">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handMation(scope.$index, scope.row)"
                        >{{ "主机个数：" + scope.row.hostmachine }}</el-button
                      >
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)"
                        >详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div slot="bottom" class="demo-split-pane">
                <el-table
                  ref="multipleTable3"
                  :data="tableData3"
                  stripe
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    type="selection"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="wayName"
                    label="采集机组名称"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="Effective"
                    label="是否有效"
                  ></el-table-column>
                  <el-table-column align="center" label="分配主机">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handMation(scope.$index, scope.row)"
                        >{{ "主机个数：" + scope.row.hostmachine }}</el-button
                      >
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)"
                        >详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </Split>
          </div>
        </Split>
      </div>
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
      tabPosition: "collection",
      split3: 0.3,
      split4: 1,
      tableData: [
        {
          wayName: "网络",
          wayType: "TCP服务",
          Effective: "是",
          order: 10,
          wayMaintain: "1",
          hostmachine: "1",
        },
      ],
      tableData1: [
        {
          wayName: "网络",
          wayType: "TCP服务",
          Effective: "是",
          order: 20,
          wayMaintain: "1",
          hostmachine: "1",
        },
      ],
      tableData3: [
        {
          wayName: "网络",
          wayType: "TCP服务",
          Effective: "是",
          order: 30,
          wayMaintain: "1",
          hostmachine: "1",
        },
      ],
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
.rightSplit {
  height: 100%;
  width: 100%;
}
</style>

<style>
</style>
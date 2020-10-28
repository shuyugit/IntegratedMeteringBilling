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
        <Split v-model="split3" >
          <div slot="left" class="demo-split-pane no-padding showHieghtAll">
            <div class="tableTileBar">任务模板</div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              row-key="id"
              border
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="selection"
              ></el-table-column>
              <el-table-column align="center" prop="Name" label="名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="isdefault"
                label="是否默认"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="Effective"
                label="是否有效"
              ></el-table-column>
            </el-table>
            <div class="tableFooterBar">
              <el-button
                @click="deletefun1"
                type="danger"
                size="small"
                icon="el-icon-delete"
                >删 除</el-button
              >
            </div>
          </div>
          <div slot="right" class="demo-split-pane rightSplit">
            <Split v-model="split4">
              <div slot="left" class="demo-split-pane showHieghtAll">
                <div class="tableTileBar">可选任务列表</div>
                <el-table
                  ref="multipleTable2"
                  :data="tableData2"
                  stripe
                  border
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
                <div class="tableFooterBar">
                  <el-button
                    @click="deletefun2"
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    >删 除</el-button
                  >
                </div>
              </div>
              <div slot="right" class="demo-split-pane showHieghtAll">
                <div class="tableTileBar">任务数据项</div>
                <el-table
                  ref="multipleTable3"
                  :data="tableData3"
                  stripe
                  border
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
                <div class="tableFooterBar">
                  <el-button
                    @click="deletefun3"
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    >删 除</el-button
                  >
                </div>
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
          id: "01",
          Name: "网络",
          Effective: "是",
          isdefault: "是",
          children: [
            {
              id: "02",
              Name: "网络",
              Effective: "是",
              isdefault: "是",
            },
            {
              id: "03",
              Name: "网络",
              Effective: "是",
              isdefault: "是",
            },
          ],
        },
      ],
      tableData2: [
        {
          wayName: "网络",
          wayType: "TCP服务",
         
          order: 20,
          wayMaintain: "1",
          hostmachine: "1",

          detail:'',
          taskName:"",
          tsakNum:'',
          taskType:'',
          priority:'',
 Effective: "是",
 pontType:'',
 objAttr:'',
 time:'',
 cycle:'',
 cycleCp:'',
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
  methods: {
    deletefun1() {},
    deletefun2() {},
    deletefun3() {},
  },
};
</script>

<style scoped>
#TimedTasks {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background: rgba(248, 248, 248, 1); */
  padding: 10px 20px;
}
.showMainPart {
  width: 100%;
  height: 100%;
  padding: 0px 26px 0px 26px;
  margin-top: 10px;
  box-sizing: border-box;
  overflow: hidden;
  /* background: rgba(255, 255, 255, 1); */
}
.rightSplit {
  height: 100%;
  width: 100%;
}
.tableTileBar {
  width: 100%;
  height: 58px;
  font-size: 18px;
  color: #303133;
  line-height: 58px;
  padding-left: 24px;
}
.demo-split-pane {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tableFooterBar {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.demo-split-pane{
  height:100%;
  
}
.showHieghtAll{
  background: #FFF;
  padding:0px 10px;
  box-sizing: border-box;
}
/* .demo-split-pane{
  height: 100%;
  width: 100%;
} */
</style>

<style>
</style>
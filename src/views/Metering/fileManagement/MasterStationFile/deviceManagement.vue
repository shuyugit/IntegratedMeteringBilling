<template>
  <d2-container>
    <div id="deviceManagement">
      <div class="tabSwitchPartRoot">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>计量</el-breadcrumb-item>
          <el-breadcrumb-item>主站档案</el-breadcrumb-item>
          <el-breadcrumb-item>主站设备管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="showMainPart">
        <div class="showMTitle">主站设备管理</div>
        <div class="operationBar">
          <div class="operationBarLeft">
            <el-button @click="getDataList" icon="el-icon-search" type="primary"
              >查询</el-button
            >
          </div>
          <div class="operationBarRight">
            <el-button @click="popModal(1)" icon="el-icon-plus">新建</el-button>
          </div>
        </div>
        <div class="tableContant">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column
              align="center"
              prop="id"
              label="编码"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="名称"
            ></el-table-column>
            <el-table-column align="center" prop="status" label="是否可用">
              <template slot-scope="scope">
                <span>
                  {{!scope.row.status?'-':scope.row.status == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="neta"
              label="A网地址"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="netb"
              label="B网地址"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="dactrlFlag"
              label="采集控制中心"
            >
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.dactrlFlag?'-':scope.row.dactrlFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="daFlag" label="前置机">
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.daFlag?'-':scope.row.daFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="calcctrlFlag"
              label="计算任务中心"
            >
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.calcctrlFlag?'-':scope.row.calcctrlFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="calcFlag" label="计算服务">
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.calcFlag?'-':scope.row.calcFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="mqFlag" label="MQ中心">
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.mqFlag?'-':scope.row.mqFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="webFlag" label="WEB主机">
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.webFlag?'-':scope.row.webFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="eventFlag" label="事项服务器">
              <template slot-scope="scope">
                <span>
                  {{ !scope.row.eventFlag?'-':scope.row.eventFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dbFlag" label="数据库服务器">
              <template slot-scope="scope">
                <span>
                  {{  !scope.row.dbFlag?'-':scope.row.dbFlag == 1 ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="popModal(2, scope.row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagitionSelf">
          <el-button
            @click="deletefun"
            type="danger"
            size="small"
            icon="el-icon-delete"
            >删 除</el-button
          >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <devicemanagementpop
      @closePop="closePop"
      :showflag="showflag"
      :id="itemid"
      ref="child1"
      :popType="popType"
    ></devicemanagementpop>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { Loading } from "element-ui";
import devicemanagementpop from "./components/devicemanagementpop";
export default {
  name: "deviceManagement",
  components: {
    devicemanagementpop,
  },
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      searchMsg: "",
      showflag: false,
      currentPage4: 4,
      popType: 1,
      itemid: "",
      tableData: [
        
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleEdit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    closePop(data) {
      console.info("关闭网页", data);
      if(data=='update'){
        this.getDataList()
      }
      this.showflag = false;
    },
    handleSelectionChange(val) {
      this.$loginfo(val);
      this.choseList = val;
      // this.multipleSelection = val;
    },
    popModal(type, value) {
      if (type == 1) {
        this.popType = 1;
        this.showflag = true;
        this.$refs.child1.callMethod('');
      } else {
        this.popType = 2;
        this.itemid = value.id;
        this.showflag = true;
        this.$refs.child1.callMethod(value.id);
      }
    },
    deletefun() {
      var that = this;
      var list = [];
      for (var a = 0; a < this.choseList.length; a++) {
        list.push(this.choseList[a].id);
      }
      this.$loginfo(list)
      if(list.length>1){
        this.$message.error('清单条修改');
        return
      }
      var info = {
        id: list[0],
      };
      that
        .$post("eis/PSysNode?method=delete", info, "获取中")
        .then((response) => {
          if (response.statusCode == 200) {
            this.getDataList();
          } else {
          }
        });
    },
    getDataList() {
      var that = this;
      var info = {};
      that
        .$post("eis/PSysNode?method=findByWhere", info, "获取中")
        .then((response) => {
          this.$loginfo(response);
          if (response.statusCode == 200) {
            this.tableData = response.resultData;
          } else {
          }
        });
    },
    searchMsgFun() {
      var that = this;
      var info = { searchMsg: this.searchMsg };
      that
        .$post("eis/PSysNode?method=findByWhere", info, "获取中")
        .then((response) => {
          if (response.statusCode == 200) {
            this.tableData = response.resultData;
          } else {
          }
        });
    },
  },
};
</script>

<style scoped>
#deviceManagement {
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
.showMTitle {
  width: 100%;
  height: 54px;
  line-height: 54px;
  font-size: 18px;
  color: "#303133";
}
.operationBar {
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e4e7ed;
}
.operationBarLeft {
  width: 228px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 10px;
}
.operationBarRight {
  height: 40px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tableContant {
  width: 100%;
  height: calc(100% - 180px);
  border-left: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.pagitionSelf {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

<style>
</style>
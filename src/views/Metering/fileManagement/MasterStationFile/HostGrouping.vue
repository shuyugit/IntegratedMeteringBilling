<template>
  <d2-container>
    <div id="HostGrouping">
      <div class="tabSwitchPartRoot">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>计量</el-breadcrumb-item>
          <el-breadcrumb-item>主站档案</el-breadcrumb-item>
          <el-breadcrumb-item>采集主机分组</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="showMainPart">
        <div class="showMTitle">主站设备管理</div>
        <div class="operationBar">
          <div class="operationBarLeft">
            <el-input
              placeholder="搜索"
              size="medium"
              suffix-icon="el-icon-search"
              v-model="searchMsg"
            >
            </el-input>
          </div>
          <div class="operationBarRight">
            <el-button type="primary">确定</el-button>
            <el-button @click="popModal" icon="el-icon-plus">新建</el-button>
          </div>
        </div>
        <div class="tableContant">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="wayName" label="采集机组名称">
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
        <div class="pagitionSelf">
          <el-button
            @click="deletefun"
            type="danger"
            size="small"
            icon="el-icon-delete"
            >删除</el-button
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
    <host-group-pop @closePop="closePop" :showflag="showflag"></host-group-pop>
    <host-group-machine-pop
      @closeMachinePop="closeMachinePop"
      :closeMachineflag="closeMachineflag"
    ></host-group-machine-pop>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { Loading } from "element-ui";

import hostGroupPop from "./components/hostGroupPop";
import hostGroupMachinePop from "./components/hostGroupMachinePop";
export default {
  name: "HostGrouping",
  components: {
    hostGroupPop,
    hostGroupMachinePop,
  },
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      showflag: false,
      closeMachineflag: false,
      searchMsg: "",
      currentPage4: 4,
      tableData: [
        {
          wayName: "网络",
          wayType: "TCP服务",
          Effective: "是",
          order: 10,
          wayMaintain: "1",
          hostmachine: "1",
        },
        {
          wayName: "网络",
          wayType: "TCP服务",
          Effective: "是",
          order: 20,
          wayMaintain: "1",
          hostmachine: "1",
        },
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
    handleEdit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    closePop(data) {
      console.info("关闭网页", data);
      this.showflag = false;
    },
    popModal() {
      console.info("打开");
      this.showflag = true;
    },
    handMation(value, value1) {
      this.closeMachineflag = true;
    },
    closeMachinePop() {
      this.closeMachineflag = false;
    },
    deletefun() {},
  },
};
</script>

<style scoped>
#HostGrouping {
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
  align-items: center;
  justify-content: center;
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


</style>

<style>
</style>
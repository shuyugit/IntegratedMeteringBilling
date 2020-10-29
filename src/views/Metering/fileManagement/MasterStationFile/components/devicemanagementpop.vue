<template>
  <div>
    <el-dialog
      :title="popType == 1 ? '新建系统节点' : '修改系统节点'"
      :visible="showflag"
      :show-close="false"
      width="50%"
    >
      <div class="inputPart">
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            编码
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写编码"
              size="mini"
              v-model="bindMsg.id"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            编号
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写编号"
              size="mini"
              v-model="bindMsg.code"
            ></el-input>
          </div>
        </div> -->
        <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            名称
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写名称"
              size="mini"
              v-model="bindMsg.name"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            别名
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写别名"
              size="mini"
              v-model="bindMsg.alias"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            是否有效</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.status"
              placeholder="选择是否可用"
            >
              <el-option
                v-for="acppop in statusList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            节点类型
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写节点类型"
              size="mini"
              v-model="bindMsg.type"
            ></el-input>
          </div>
        </div> -->
        <div class="demo-input-suffix">
          <div class="INputTitle">部署区域</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.wherein"
              placeholder="选择部署区域"
            >
              <el-option
                v-for="acppop in whereinList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            A网地址
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写A网地址"
              size="mini"
              v-model="bindMsg.neta"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            B网地址
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写B网地址"
              size="mini"
              v-model="bindMsg.netb"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            C网地址
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写C网地址"
              size="mini"
              v-model="bindMsg.netd"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            D网地址
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写D网地址"
              size="mini"
              v-model="bindMsg.nete"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">采集控制中心</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.dactrlFlag"
              placeholder="选择采集控制中心标识"
            >
              <el-option
                v-for="acppop in dactrlFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">前置机</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.daFlag"
              placeholder="选择前置机标识"
            >
              <el-option
                v-for="acppop in daFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">计算任务中心</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.calcctrlFlag"
              placeholder="选择计算任务中心标识"
            >
              <el-option
                v-for="acppop in calcctrlFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">计算服务</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.calcFlag"
              placeholder="选择计算服务"
            >
              <el-option
                v-for="acppop in calcFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            计算通信端口1
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写计算通信端口1"
              size="mini"
              type="number"
              v-model="bindMsg.comport1"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            计算通信端口2
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写计算通信端口2"
              size="mini"
              type="number"
              v-model="bindMsg.comport2"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            心跳端口1
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写心跳端口1"
              size="mini"
              type="number"
              v-model="bindMsg.hbPort1"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">
            心跳端口2
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写心跳端口2"
              size="mini"
              type="number"
              v-model="bindMsg.hbPort2"
            ></el-input>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">MQ中心</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.mqFlag"
              placeholder="选择MQ中心标识"
            >
              <el-option
                v-for="acppop in mqFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">WEB主机</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.webFlag"
              placeholder="选择WEB主机标识"
            >
              <el-option
                v-for="acppop in webFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">事项服务器</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.eventFlag"
              placeholder="选择事项服务器标识"
            >
              <el-option
                v-for="acppop in eventFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="demo-input-suffix">
          <div class="INputTitle">数据库</div>
          <div class="inputSize">
            <el-select
              size="mini"
              v-model="bindMsg.dbFlag"
              placeholder="选择数据库服务器标识"
            >
              <el-option
                v-for="acppop in dbFlagList"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            采集机组
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写采集机组"
              size="mini"
              v-model="bindMsg.daGroup"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            排序
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写排序"
              size="mini"
              v-model="bindMsg.weight"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            创建者
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写创建者"
              size="mini"
              v-model="bindMsg.creatorId"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            创建时间
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写创建时间"
              size="mini"
              v-model="bindMsg.createDate"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            最后修改者
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写最后修改者"
              size="mini"
              v-model="bindMsg.lastModifierId"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <div class="INputTitle">
            <span style="color: red">*</span>
            最后修改时间
          </div>
          <div class="inputSize">
            <el-input
              placeholder="请填写最后修改时间"
              size="mini"
              v-model="bindMsg.lastModifyTime"
            ></el-input>
          </div>
        </div> -->
        <div class="demo-input-suffix2">
          <div class="INputTitle2">
            备注
          </div>
          <div class="inputSize2">
            <el-input
              placeholder="请填写备注"
              size="mini"
              type="textarea"
              v-model="bindMsg.remark"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="popType == 1" type="primary" @click="insertList"
          >立即创建</el-button
        >
        <el-button v-if="popType == 2" type="primary" @click="upDateList"
          >确定修改</el-button
        >
        <el-button @click="closeFun">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "devicemanagementpop",
  props: ["showflag", "id", "popType"],
  components: {},
  data() {
    return {
      bindMsg: {
        id: "",
        code: "",
        name: "",
        alias: "",
        status: "",
        type: "",
        wherein: "",
        neta: "",
        netb: "",
        netd: "",
        nete: "",
        dactrlFlag: "",
        daFlag: "",
        calcctrlFlag: "",
        calcFlag: "",
        comport1: "",
        comport2: "",
        hbPort1: "",
        hbPort2: "",
        mqFlag: "",
        webFlag: "",
        eventFlag: "",
        dbFlag: "",
        remark: "",
        daGroup: "",
        weight: "",
        creatorId: "",
        createDate: "",
        lastModifierId: "",
        lastModifyTime: "",
      },
      statusList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      whereinList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      dactrlFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      daFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      calcctrlFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      calcFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      mqFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      webFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      eventFlagList: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      dbFlagList: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    closeFun() {
      this.$emit("closePop", this.searchMsg);
    },
    callMethod(res) {
      this.getDataDetail(res);
    },
    getDataDetail(id) {
      var that = this;
      var info = { id: id };
      that
        .$post("eis/PSysNode?method=findByKey", info, "获取中")
        .then((response) => {
          if (response.statusCode == 200) {
            this.bindMsg = response.resultData;
          } else {
          }
        });
    },
    insertList() {
      var that = this;
      if(this.bindMsg.name==''||!this.bindMsg.name||this.bindMsg.name==undefined){
        
        return
      }
      if(this.bindMsg.name==''||!this.bindMsg.name||this.bindMsg.name==undefined){

        return 
      }
      var info = { ...this.bindMsg };
      that
        .$post("eis/PSysNode?method=insert", info, "获取中")
        .then((response) => {
          if (response.statusCode == 200) {
            this.$message({
              message: response.message,
              type: "success",
            });
            this.$emit("closePop", this.searchMsg);
            // this.tableData = response.resultData;
          } else {
            this.$message.error(response.message);
          }
        });
    },
    upDateList() {
      var that = this;
      var info = { ...this.bindMsg };
      that
        .$post("eis/PSysNode?method=update", info, "获取中")
        .then((response) => {
          if (response.statusCode == 200) {
            this.$message({
              message: response.message,
              type: "success",
            });
            this.$emit("closePop", this.searchMsg);
            // this.tableData = response.resultData;
          } else {
             this.$message.error(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
#devicemanagementpop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(248, 248, 248, 1);
  padding: 20px 20px;
}
.inputPart {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.demo-input-suffix {
  width: 50%;
  height: auto;
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.demo-input-suffix2 {
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.INputTitle2 {
  width: 20%;
  padding-left: 50px;
  text-align: left;
}
.inputSize2 {
  width: 70%;
}
.INputTitle {
  width: 40%;
  padding-left: 50px;
  text-align: left;
}
.inputSize {
  width: 40%;
}
</style>

<style>
</style>
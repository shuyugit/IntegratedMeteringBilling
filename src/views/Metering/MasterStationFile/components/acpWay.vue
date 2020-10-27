<template>
  <div>
    <el-dialog
      title="通道维护"
      :visible="acpWayFlag"
      :show-close="false"
      width="45%"
    >
      <div class="inputPart">
        <div class="headBarPart">
          <div class="headBarPartLeft">
            <el-select size="mini" v-model="interNetValue" placeholder="通道组">
              <el-option
                v-for="item in internetOption"
                :key="item.ID"
                :label="item.label"
                :value="item.ID"
              >
              </el-option>
            </el-select>
            <el-select
              size="mini"
              v-model="machineValue"
              placeholder="控制主机"
            >
              <el-option
                v-for="item in machineOption"
                :key="item.ID"
                :label="item.label"
                :value="item.ID"
              >
              </el-option>
            </el-select>
            <el-select size="mini" v-model="rulerValue" placeholder="监听规约">
              <el-option
                v-for="item in rulerOption"
                :key="item.ID"
                :label="item.label"
                :value="item.ID"
              >
              </el-option>
            </el-select>
            <el-button
              size="mini"
              icon="el-icon-search"
              type="primary"
              circle
            ></el-button>
          </div>
          <div class="headBarPartRight">
            <el-button @click="popModal" icon="el-icon-plus">新建</el-button>
          </div>
        </div>
        <div class="acpTable" style="height: 300px">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            height="300px"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column
              fixed
              align="center"
              type="selection"
            ></el-table-column>
            <el-table-column fixed align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handinsidePop(scope.$index, scope.row)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              fixed
              align="center"
              prop="wayOneName"
              label="通道名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="wayCapName"
              label="通道组"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="Effective"
              label="是否有效"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="isonly"
              label="是否独占"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="address1"
              width="170px"
              label="设备地址1"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="address2"
              width="170px"
              label="设备地址2"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="contorlHost"
              label="控制主机"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="botelv"
              label="波特率"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="dataPont"
              label="数据位"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="StopPont"
              label="停止位"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="checkPont"
              label="校验位"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="InitStr"
              width="170px"
              label="初始化串"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="monitorRuler"
              label="监听规约"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer newFooter">
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
        <el-button @click="closeFun">关闭</el-button>
      </div>
      <el-dialog
        width="40%"
        title="修改通道信息"
        :visible.sync="insidePop"
        append-to-body
      >
        <div class="inputPart">
          <div
            v-for="(item, index) in inputList"
            :key="index"
            id="insidePop"
            class="demo-input-suffix"
          >
            <div class="INputTitle">
              <span v-if="item.isMust == 1" style="color: red">*</span>
              {{ item.name }}
            </div>
            <div class="inputSize">
              <el-input
                v-if="item.type == 1"
                :placeholder="item.placeMsg"
                size="mini"
                v-model="item.value"
              ></el-input>
              <el-select
                size="mini"
                v-if="item.type == 2"
                v-model="item.value"
                :placeholder="item.placeMsg"
              >
                <el-option
                  v-for="item2 in item.option"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                >
                </el-option>
              </el-select>
              <el-input
                v-if="item.type == 3"
                type="textarea"
                :placeholder="item.placeMsg"
                v-model="item.value"
              ></el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeinsidepop">保存</el-button>
          <el-button @click="closeinsidepop">取消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "acpWay",
  props: ["acpWayFlag"],
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      searchMsg: "关闭网页信息",
      inputList: [
        {
          name: "通道名称", //title
          value: "网络", //输入值
          placeMsg: "填写通道组名称", //placehold提示
          type: 1, //type1输入框，2下拉框,3textArea
          isMust: 1, //1必须，0非必填
          option: [], //下拉选项
        },

        {
          name: "通道组",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择通道组类型",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "11",
              label: "专线连接",
            },
            {
              value: "01",
              label: "网络",
            },
            {
              value: "02",
              label: "TCP服务",
            },
          ],
        },
        {
          name: "是否有效",
          value: "1",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "1",
              label: "是",
            },
            {
              value: "0",
              label: "否",
            },
          ],
        },
        {
          name: "是否独占",
          value: "1",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "1",
              label: "是",
            },
            {
              value: "0",
              label: "否",
            },
          ],
        },
        {
          name: "设备地址1",
          value: "196.168.1.121",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写别名",
          isMust: 1, //1必须，0非必填
          option: [],
        },
        {
          name: "设备地址2",
          value: "1",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写别名",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "波特率",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "12",
              label: "1600",
            },
            {
              value: "02",
              label: "3200",
            },
          ],
        },
        {
          name: "数据位",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "13",
              label: "6",
            },
            {
              value: "03",
              label: "7",
            },
          ],
        },
        {
          name: "停止位",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "14",
              label: "5",
            },
            {
              value: "04",
              label: "6",
            },
          ],
        },
        {
          name: "校验位",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "14",
              label: "无",
            },
            {
              value: "04",
              label: "奇",
            },
            {
              value: "24",
              label: "偶",
            },
          ],
        },
        {
          name: "初始化话串",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "请填写",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "监听规约",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "15",
              label: "367.1",
            },
            {
              value: "05",
              label: "贵州广西102规约",
            },
          ],
        },
        {
          name: "控制主机",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "15",
              label: "THCJRV1",
            },
          ],
        },
      ],
      interNetValue: "",
      machineValue: "",
      rulerValue: "",
      internetOption: [
        {
          ID: "11",
          label: "全部",
        },
        {
          ID: "21",
          label: "网络",
        },
      ],
      machineOption: [
        {
          ID: "12",
          label: "全部",
        },
        {
          ID: "22",
          label: "thcjsrv",
        },
      ],
      rulerOption: [
        {
          ID: "13",
          label: "全部",
        },
        {
          ID: "14",
          label: "重庆102规约",
        },
      ],
      tableData: [
        {
          wayOneName: "网络",
          wayCapName: "网络",
          Effective: "是",
          isonly: "是",
          address1: "192.168.1.8.198:990",
          address2: "",
          contorlHost: "thcjsrv1 ",
          botelv: "botelv",
          dataPont: "5",
          StopPont: "",
          checkPont: "无",
          InitStr: "初始化串",
          monitorRuler: "367.1",
        },
      ],
      insidePop: false,
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    closeFun() {
      this.$emit("closeAcpFUn", this.searchMsg);
    },
    handinsidePop(value, value1) {
      this.insidePop = true;
    },
    closeinsidepop() {
      this.insidePop = false;
    },
    popModal(){

    },
    callMethod(res) {
      this.classID = JSON.parse(localStorage.choseClass).ClassID;
      this.getClassRecord();
      this.$logInfo("方法2:直接调用调用成功" + res);
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 150px;
  margin-right: 10px;
}
#insidePop .el-select {
  width: 100%;
}
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
#acpWay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(248, 248, 248, 1);
  padding: 20px 20px;
}
.headBarPart {
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 1px solid #dedede;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.headBarPartLeft {
  width: auto;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.headBarPartRight {
  width: auto;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
}
.INputTitle {
  width: 40%;
  padding-left: 20px;
  text-align: left;
}
.inputSize {
  width: 60%;
  padding-right: 20px;
}
.acpTable {
  width: 100%;
  height: 300px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}
.newFooter {
  display: flex;
  justify-content: space-between;
}
</style>

<style>
</style>
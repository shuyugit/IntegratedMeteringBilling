<template>
  <div>
    <el-dialog
      title="主机通道关系"
      :visible="acpMachineFlag"
      :show-close="false"
      width="45%"
    >
      <div class="inputPart">
        <div class="headBarPart">
          <div class="headBarPartLeft">
            <el-select
              size="mini"
              v-model="machineValue"
              placeholder="采集主机"
            >
              <el-option
                v-for="item in machineOption"
                :key="item.ID"
                :label="item.label"
                :value="item.ID"
              >
              </el-option>
            </el-select>
            <el-select
              size="mini"
              v-model="wayCopName"
              placeholder="通道组名称"
            >
              <el-option
                v-for="item in wayCopOption"
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
              prop="collectMain"
              label="通道名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="wayCapName"
              label="通道组"
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
        title="修改采集主机通道组"
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
  name: "acpMachine",
  props: ["acpMachineFlag"],
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      searchMsg: "关闭网页信息",
      inputList: [
        {
          name: "采集主机",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择采集主机",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "11",
              label: "tsc",
            },
            {
              value: "01",
              label: "tpc",
            },
            {
              value: "02",
              label: "THC",
            },
          ],
        },
        {
          name: "通道组",
          value: "1",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择通道组",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "1",
              label: "网络",
            },
            {
              value: "2",
              label: "网络2",
            },
          ],
        },
      ],
      wayCopName: "",
      machineValue: "",
      rulerValue: "",
      wayCopOption: [
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
          collectMain: "网络",
          wayCapName: "网络",
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
    popModal() {},
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
  width: 100%;
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
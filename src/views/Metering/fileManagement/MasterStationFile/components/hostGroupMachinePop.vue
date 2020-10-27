<template>
  <div>
    <el-dialog
      title="分配主机"
      :visible="closeMachineflag"
      :show-close="false"
      width="45%"
    >
      <div class="inputPart">
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
            <el-table-column
              fixed
              align="center"
              prop="collectMain"
              label="采集机名称"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer newFooter">
        <span>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="success" icon="el-icon-refresh" circle></el-button>
        </span>
        <span>
          <el-button type="primary" @click="closeFun">保存</el-button>
          <el-button @click="closeFun">关闭</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "acpMachine",
  props: ["closeMachineflag"],
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
      this.$emit("closeMachinePop", this.searchMsg);
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
  justify-content: center;
}
.INputTitle {
  width: 25%;
  padding-left: 20px;
  text-align: left;
}
.inputSize {
  width: 50%;
  padding-right: 20px;
}
.acpTable {
  width: 100%;
  height: 300px;
  margin: 2px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-top: 1px solid #dedede;
  /* margin-top: 5px; */
}
.newFooter {
  display: flex;
  justify-content: space-between;
}
</style>

<style>
</style>
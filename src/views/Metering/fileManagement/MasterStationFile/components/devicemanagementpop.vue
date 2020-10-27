<template>
  <div>
    <el-dialog
      title="新建系统节点"
      :visible="showflag"
      :show-close="false"
      width="50%"
    >
      <div class="inputPart">
        <div
          v-for="(item, index) in inputList"
          :key="'devpop' + index"
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
                v-for="acppop in item.option"
                :key="acppop.value"
                :label="acppop.label"
                :value="acppop.value"
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
        <el-button type="primary" @click="closeFun">立即创建</el-button>
        <el-button @click="closeFun">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "devicemanagementpop",
  props: ["showflag"],
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      searchMsg: "关闭网页信息",
      inputList: [
        {
          name: "名称", //title
          value: "", //输入值
          placeMsg: "填写名称", //placehold提示
          type: 1, //type1输入框，2下拉框,3textArea
          isMust: 1, //1必须，0非必填
          option: [], //下拉选项
        },
        {
          name: "别名",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写别名",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "是否有效",
          value: "",
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
          name: "部署区域",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择部署区域",
          isMust: 0, //1必须，0非必填
          option: [
            {
              value: "1",
              label: "第一区域",
            },
            {
              value: "0",
              label: "第二区域",
            },
          ],
        },
        {
          name: "A网址",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写A网址",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "B网址",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写B网址",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "C网址",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写C网址",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "D网址",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写D网址",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "采集控制中心",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择采集控制中心",
          isMust: 0, //1必须，0非必填
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
          name: "前置机",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择前置机",
          isMust: 0, //1必须，0非必填
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
          name: "计算任务中心",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择计算任务中心",
          isMust: 0, //1必须，0非必填
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
          name: "计算服务",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择计算服务",
          isMust: 0, //1必须，0非必填
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
          name: "计算通信端口1",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写计算通信端口1",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "计算通信端口2",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写计算通信端口2",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "心跳端口1",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写心跳端口1",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "心跳端口2",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写心跳端口2",
          isMust: 0, //1必须，0非必填
          option: [],
        },
        {
          name: "MQ中心",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择MQ中心",
          isMust: 0, //1必须，0非必填
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
          name: "WEB",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择WEB",
          isMust: 0, //1必须，0非必填
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
          name: "事项服务器",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择事项服务器",
          isMust: 0, //1必须，0非必填
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
          name: "数据库",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "选择数据库",
          isMust: 0, //1必须，0非必填
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
          name: "备注",
          value: "",
          type: 3, //type1输入框，2下拉框
          placeMsg: "填写备注",
          isMust: 0, //1必须，0非必填
          option: [],
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
      this.classID = JSON.parse(localStorage.choseClass).ClassID;
      this.getClassRecord();
      this.$logInfo("方法2:直接调用调用成功" + res);
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
.INputTitle {
  width: 40%;
  padding-left: 20px;
  text-align: left;
}
.inputSize {
  width: 60%;
}
</style>

<style>
</style>
<template>
  <div>
    <el-dialog
      title="修改通道信息"
      :visible="showflag"
      :show-close="false"
      width="30%"
    >
      <div class="inputPart">
        <div
          v-for="(item, index) in inputList"
          :key="index"
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
        <el-button type="primary" @click="closeFun">立即创建</el-button>
        <el-button @click="closeFun">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "acquisitionchannelpop",
  props: ["showflag"],
  components: {},
  data() {
    return {
      activeName: this.$route.query.errbh ? this.$route.query.errbh : "all",
      searchMsg: "关闭网页信息",
      inputList: [
        {
          name: "通道组名称", //title
          value: "", //输入值
          placeMsg: "填写通道组名称", //placehold提示
          type: 1, //type1输入框，2下拉框,3textArea
          isMust: 1, //1必须，0非必填
          option: [], //下拉选项
        },

        {
          name: "通道组类型",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择通道组类型",
          isMust: 1, //1必须，0非必填
          option: [
            {
              value: "1",
              label: "专线连接",
            },
            {
              value: "0",
              label: "网络",
            },
            {
              value: "0",
              label: "TCP服务",
            },
          ],
        },
        {
          name: "是否有效",
          value: "",
          type: 2, //type1输入框，2下拉框
          placeMsg: "请选择",
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
          name: "显示顺序",
          value: "",
          type: 1, //type1输入框，2下拉框
          placeMsg: "填写别名",
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
#acquisitionchannelpop {
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
</style>

<style>
</style>
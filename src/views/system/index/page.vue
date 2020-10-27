<template>
  <d2-container>
    <div id="page">
      <card :BtnList="BtnList"></card>
    </div>
  </d2-container>
</template>

<script>
/* eslint-disable */
import card from "../../../components/main/card";
import dayjs from "dayjs";

export default {
  name: "mainHomePage",
  components: {
    card: card
  },
  watch: {
    cavWidth(curVal, oldVal) {
      var _this = this;
      this.cavWidth = curVal;
      if (oldVal != 0) {
        for (var i = 0; i < this.dataList2.length; i++) {
          this.dataList2[i].XValue = (
            (this.dataList2[i].XValue * curVal) /
            oldVal
          ).toFixed(0);
        }
      }

      // console.log("宽=" + curVal, oldVal);
    },
    cavHeight(curVal, oldVal) {
      var _this = this;
      this.cavHeight = curVal;
      if (oldVal != 0) {
        for (var i = 0; i < this.dataList2.length; i++) {
          this.dataList2[i].YValue = (
            (this.dataList2[i].YValue * curVal) /
            oldVal
          ).toFixed(0);
        }
      }
      // console.log("高=" + curVal, oldVal);
    }
  },
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      tempData: {},
      cavWidth: 0,
      cavHeight: 0,
      heatmap2Instance: Object,
      dataList: [],
      dataList2: [],
      timer: null,
      BtnList: [
        {
          BtnTit: "",
          BtnImg: "img/state05.png",
          BtnMsg: ""
        }
      ]
    };
  },
  mounted() {
    var _this = this;
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    console.info("消失");
    if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
    }
    this.timer = null;
  },
  methods: {
    setTimeinter() {
      var that = this;
      this.timer = setInterval(
        () => {
          that.getAir();
          that.getTemper();
          that.getPontList();
        },
        this.timeItem ? this.timeItem.VALUE * 1000 : 100000
      );
    },
    getTimeLits: async function() {
      const db = await this.$store.dispatch("d2admin/db/database", {
        user: true
      });
      const timeList = db.get("timeList").value();
      const userInfo = db.get("userInfo").value();
      this.timeItem = timeList.find(e => e.KEY === "ReError");
      console.info("信息", timeList);
      console.info("个人信息", userInfo);
    },
    gotopage: function() {
      this.$router.push({ path: "/abnormalInformation" });
    },
    showMsg(item, index) {
      console.info(item);
      this.$router.push({
        path: "/abnormalInformation",
        query: {
          errbh: item.type == 0 ? item.ErrorCode : item.ErrorCode.slice(0, 1)
        }
      });
    },
    refreshTime() {
      this.BtnList[0].BtnMsg = dayjs().format("HH:mm");
      this.BtnList[0].BtnTit = dayjs().format("YYYY年MM月DD日");
    },
    
    getTemper: function() {
      var that = this;
      var info = {};
      that.loading = true;
      that.$post("1036", info, "获取中").then(response => {
        console.info("获取环境温湿度", response);
        //  this.$message.error('获取接口失败');
        if (response.Code == 1) {
          this.BtnList[1].BtnMsg = response.Data.temperature;
          this.BtnList[2].BtnMsg = response.Data.humidity;
        } else {
          // this.$message.error('获取接口失败');
        }
      });
    },
    getAir: function() {
      var that = this;
      var info = {};
      that.loading = true;
      that.$post("1053", info, "获取中").then(response => {
        console.info("获取当前气压", response);
        //  this.$message.error('获取接口失败');
        if (response.Code == 1) {
          this.BtnList[3].BtnMsg = response.Data;
        } else {
          // this.$message.error('获取接口失败');
        }
      });
    },
    
    getPontList: function() {
      var that = this;
      var info = {};
      that.loading = true;
      that.$post("1054", info, "获取中").then(response => {
        this.cavWidth = document.getElementById("heatmap2").clientWidth
          ? document.getElementById("heatmap2").clientWidth
          : "";
        this.cavHeight = document.getElementById("heatmap2").clientHeight
          ? document.getElementById("heatmap2").clientHeight
          : "";
        console.info("宽：" + this.cavWidth);
        console.info("高：" + this.cavHeight);
        console.info("点位列表", response);
        if (response.Code == 1) {
          this.dataList = response.Data.list;
          for (var a = 0; a < response.Data.list.length; a++) {
            response.Data.list[a].YValue = (
              (response.Data.list[a].YValue * this.cavHeight) /
              1062
            ).toFixed(2);
            response.Data.list[a].XValue = (
              (response.Data.list[a].XValue * this.cavWidth) /
              2920
            ).toFixed(2);
          }
          this.dataList2 = response.Data.list;
          this.BtnList[0].BtnMsg = response.Data.errorAllNum;
        } else {
        }
        !this.timer && this.setTimeinter();
      });
    }
  }
};
</script>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 20px 20px;
  flex-direction: column;
  background: rgba(248, 248, 248, 0.5);
}
.showMSg {
  width: 100px;
  height: 30px;
  position: absolute;
  top: -35px;
  left: -40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
}
.divBottom {
  width: 100%;
  height: calc(100% - 130px);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.divBottomLeft {
  height: auto;
  width: 100%;
  position: relative;
}
.homepageimg {
  width: 100%;
  height: auto;
}
.divBottomRight {
  height: 100%;
  width: 390px;
  margin-left: 20px;
  overflow-y: auto;
}
.divBottomRight::-webkit-scrollbar {
  width: 4px;
}
.divBottomRight::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.divBottomRight::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.clickPont2 {
  width: 20px;
  height: 20px;
  background: red;
  position: absolute;
  z-index: 1;
  border-radius: 50%;
}
.errorCard {
  width: 387px;
  height: 140px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 21px 0px rgba(179, 179, 179, 0.26);
  opacity: 0.8;
  border-radius: 9px;
  margin-bottom: 20px;
}
.titleContent {
  width: 100%;
  height: 60px;
  background: #dcecea;
  border-radius: 9px 9px 0 0;
  display: flex;
}

.titleCoin {
  background: #fb6b45;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  color: #fff;
  margin: 20px 14px 0 20px;
}
.titleName {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  line-height: 60px;
}
.errorContent {
  font-size: 14px;
  color: #666666;
  line-height: 80px;
  margin-left: 39px;
}
</style>
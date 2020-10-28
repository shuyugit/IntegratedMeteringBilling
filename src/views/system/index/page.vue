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
    card: card,
  },
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      timer: null,
      BtnList: [
        {
          BtnTit: "",
          BtnImg: "img/state05.png",
          BtnMsg: "",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
    var _this = this;
    this.getTest();
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },

  beforeDestroy() {
    console.info("消失");
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
    this.timer = null;
  },
  methods: {
    fetchData: async function () {
      const db = await this.$store.dispatch('d2admin/user/load');
      var id = db.value();
      console.info("ID信息---", id);
    },
    getTimeLits: async function () {
      const db = await this.$store.dispatch("d2admin/db/database", {
        user: true,
      });
      const timeList = db.get("timeList").value();
      const userInfo = db.get("userInfo").value();
      this.timeItem = timeList.find((e) => e.KEY === "ReError");
      console.info("信息", timeList);
      console.info("个人信息", userInfo);
    },
    gotopage: function () {
      this.$router.push({ path: "/abnormalInformation" });
    },
    showMsg(item, index) {
      console.info(item);
      this.$router.push({
        path: "/abnormalInformation",
        query: {
          errbh: item.type == 0 ? item.ErrorCode : item.ErrorCode.slice(0, 1),
        },
      });
    },
    refreshTime() {
      this.BtnList[0].BtnMsg = dayjs().format("HH:mm");
      this.BtnList[0].BtnTit = dayjs().format("YYYY年MM月DD日");
    },
    getTest: function () {
      var that = this;
      var info = { id: 1 };
      that.loading = true;
      this.$loginfo("测试-----222");
      that
        .$post("eis/PChnlGroup?method=findByKey", info, "获取中")
        .then((response) => {
          console.info("获取环境温湿度", response);
          if (response.Code == 1) {
          } else {
          }
        });
    },
  },
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
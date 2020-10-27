<template>
  <div id="card">
    <div class="cardItem" v-for="(item,index) in BtnList" :key="index" @click="gotoPage(item)">
      <img class="cardImg" :src="item.BtnImg" alt />
      <div class="cardName">
        <div class="cardNameTit">{{item.BtnTit}}</div>
        <div class="cardNameMsg">{{item.BtnMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["BtnList"],
  methods: {
    gotoPage(item) {
      if (item.url) {
        this.$router.push({ path: item.url });
      }
    }
  }
};
</script>

<style scoped>
#card {
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: row;
  background: #f8f8f8;
}
.cardItem {
  width: 280px;
  height: 106px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  margin: 0px 25px 0px 0px;
  box-shadow: 0px 1px 21px 0px rgba(38,46,45,0.06);
}
.cardImg {
  width: 56px;
  height: 56px;
  margin-left: 30px;
  margin-right: 13px;
}
.cardNameTit {
  line-height: 24px;
  width: 100%;
  font-size: 18px;
  color: #666666;
}
.cardNameMsg {
  line-height: 24px;
  width: 100%;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  margin-left: 2px;
  margin-top: 7px;
}
</style>
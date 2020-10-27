<template>
  <div class="headPart">
    <el-avatar style="margin-right:10px" size="small" icon="el-icon-user-solid"></el-avatar>
    <el-dropdown size="small" class="d2-mr">
      <span class="btn-text">{{
        this.userInfo != "" ? `欢迎你，${this.userInfo.Name}` : "未登录"
      }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5" />注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("d2admin/user", ["info"]),
  },
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    logOff() {
      this.logout({
        confirm: true,
      });
    },
    fetchData: async function () {
      const db = await this.$store.dispatch("d2admin/db/database", {
        user: true,
      });
      this.userInfo = db.get("userInfo").value();
      console.info("个人信息", this.userInfo);
    },
  },
};
</script>

<style scoped>
.headPart{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>

<template>
    <div class="header">
        <el-menu mode="horizontal">
            <el-menu-item index="1" @click="onClickTitle">{{ title }}</el-menu-item>
        </el-menu>
        <el-dropdown class="avator" trigger="click" v-if="userName != ''" @command="onClickLogout">
            <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<style scoped>
.avator {
  line-height: 60px;
  position: absolute;
  right: 20px;
  top: 0;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 14px;
  color: #909399;
}
.header {
  z-index: 100000;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "tamate",
      userName: ""
    };
  },
  mounted: function() {
    axios
      .get(this.config.host + "/api/user")
      .then(res => {
        //if (res.data.name !== "unknown")
        this.userName = res.data.name;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onClickTitle: () => {
      location.href = "/dashboard";
    },
    onClickLogout: () => {
      location.href = "/login?logout=true";
    }
  }
};
</script>
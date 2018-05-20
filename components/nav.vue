<template>
    <el-menu :collapse="isCollapse">
        <!--
        <el-menu-item index="10" @click="onClickMenuItem('')">
            <i class="el-icon-menu"></i>
            <span slot="title">Overview</span>
        </el-menu-item>
        -->
        <el-menu-item index="20" @click="onClickMenuItem('datasources')">
            <i class="el-icon-goods"></i>
            <span slot="title">Datasources</span>
        </el-menu-item>
        <el-menu-item index="30" @click="onClickMenuItem('schemas')">
            <i class="el-icon-tickets"></i>
            <span slot="title">Schemas</span>
        </el-menu-item>
        <el-menu-item index="40" @click="onClickMenuItem('rows')">
            <i class="el-icon-news"></i>
            <span slot="title">Rows</span>
        </el-menu-item>
        <el-menu-item index="50" @click="onClickMenuItem('compare')">
                <i class="el-icon-sort"></i>
                <span slot="title">Compare</span>
            </el-menu-item>
        <!--
        <el-menu-item index="60" @click="onClickMenuItem('setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">Setting</span>
        </el-menu-item>
        -->
    </el-menu>
</template>

<style scoped>
.el-menu {
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      projectId: "",
      active: 1,
      isCollapse: true
    };
  },
  mounted() {
    this.projectId = location.pathname.split("/")[1];
  },
  methods: {
    onClickMenuItem: function(route) {
      const url = "/" + this.projectId + "/" + route;
      if (url === location.pathname) {
        return;
      }
      location.href = url;
    }
  }
};
</script>
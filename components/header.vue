<template>
    <el-menu class="el-menu header" mode="horizontal">
        <el-menu-item index="1" @click="onClickTitle()">{{ title }}</el-menu-item>
    </el-menu>
</template>

<style scoped>
.header {
  z-index: 100000;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
export default {
  data() {
    return {
      title: "tamate"
    };
  },
  methods: {
    onClickTitle: () => {
      location.href = "/dashboard";
    }
  }
};
</script>
<template>
    <el-menu class="el-menu" mode="horizontal">
        <el-menu-item index="1" @click="onClickTitle()">{{ title }}</el-menu-item>
    </el-menu>
</template>

<style>
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
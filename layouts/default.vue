<template>
    <el-container class="content" >
        <el-header>
            <tamate-header></tamate-header>
        </el-header>
        <el-main>
            <nuxt/>
        </el-main>
    </el-container>
</template>

<style>
/* color */
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.content {
  height: 100vh;
  width: 100vw;
  min-width: 760px;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 20px 0;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
</style>

<script>
import TamateHeader from "~/components/Header.vue";
export default {
  name: "default",
  components: {
    TamateHeader
  }
};
</script>
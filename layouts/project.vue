<template>
    <el-container class="content">
        <el-header>
            <tamate-header></tamate-header>
        </el-header>
        <el-main>
            <el-container style="height: 100%">
                <el-aside style="width: auto;">
                    <project-nav></project-nav>
                </el-aside>
                <el-container>
                    <nuxt/>
                </el-container>
            </el-container>
        </el-main>
    </el-container>
</template>

<style>
.content {
  height: 100vh;
  width: 100vw;
  min-width: 760px;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
</style>

<script>
import TamateHeader from "~/components/header.vue";
import ProjectNav from "~/components/nav.vue";
export default {
  name: "project",
  components: {
    TamateHeader,
    ProjectNav
  }
};
</script>
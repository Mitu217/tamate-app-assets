<template>
    <div class="content">
        <el-container>
            <el-header>
                <tamate-header></tamate-header>
            </el-header>
            <el-main>
                <el-container>
                    <el-aside style="width: auto;">
                        <project-nav></project-nav>
                    </el-aside>
                    <el-container>
                        <nuxt/>
                    </el-container>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>
<style>
.content {
  height: 100vh;
  width: 100vw;
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
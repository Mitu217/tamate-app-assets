<template>
    <div class="content">
        <el-container>
            <el-header>
                <tamate-header></tamate-header>
            </el-header>
            <el-main>
                <nuxt/>
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
import TamateHeader from "~/components/Header.vue";
export default {
  name: "default",
  components: {
    TamateHeader
  }
};
</script>
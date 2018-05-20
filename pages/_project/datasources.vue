<template>
    <el-main class="content" v-loading="loading">
        <el-row type="flex" justify="space-between" class="description-header">
            <el-col :span="6">
                <span style="line-height:32px">Datasource List</span>
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="onClickNew()">New Datasource</el-button>
            </el-col>
        </el-row>
        <datasource-list  :datasources="items"></datasource-list>
    </el-main>
</template>

<style scoped>
.description-header {
  padding: 4px 20px 8px;
  border-bottom: solid 1px #e6e6e6;
}
.content {
  padding: 18px 20px;
}
</style>

<script>
import axios from "axios";
import DatasourceList from "~/components/list/datasource.vue";
export default {
  layout: "project",
  components: {
    DatasourceList
  },
  data() {
    return {
      loading: false,
      type: "",
      projectId: "",
      datasourceId: "",
      schemaName: "",
      routes: [],
      items: []
    };
  },
  mounted() {
    const paths = location.pathname.split("/");
    const pathLength = paths.length;
    this.type = "datasources";
    const projectId = paths[1];
    this.projectId = projectId;
    this.routes.push(projectId);
    this.fetchDatasources();
  },
  methods: {
    fetchDatasources: function() {
      this.loading = true;
      axios
        .get(
          "http://localhost:8090/api/datasources?projectId=" + this.projectId
        )
        .then(res => {
          this.items = res.data.datasources;
        })
        .catch(err => {
          // TODO: エラーハンドリング系のUtil化
          if (!err.response) {
            this.$notify.error({
              title: "Error",
              message: "Network Error",
              duration: 0,
              position: "bottom-right"
            });
          } else {
            if (err.response.status === 422) {
              const res = err.response.data;
              this.$notify.error({
                title: "Error",
                message: "[ERROR:" + res.code + "]" + res.message,
                duration: 0,
                position: "bottom-right"
              });
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onClickNew: function() {
      location.href = "/datasources/new?projectId=" + this.projectId;
    }
  }
};
</script>
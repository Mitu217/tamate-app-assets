<template>
    <el-main slot="content">
        <div class="description-header">
            <el-button type="primary" @click="onClickNew()">New Datasource</el-button>
        </div>
        <datasource-list :loading="loading" :datasources="items"></datasource-list>
    </el-main>
</template>

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
<template>
    <el-main slot="content" :loading="loading">
        <div class="description-header">
            <el-cascader
                :options="options"
                :props="props"
                @change="handleItemChange"
            ></el-cascader>
        </div>

        <schema-list :loading="loading" :schemas="schemas"></schema-list>
    </el-main>
</template>

<script>
import axios from "axios";
import SchemaList from "~/components/list/schema.vue";
export default {
  layout: "project",
  components: {
    SchemaList
  },
  data() {
    return {
      projectId: "",
      loading: false,
      options: [],
      props: {
        label: "label",
        value: "value"
      },
      schemas: []
    };
  },
  mounted() {
    this.projectId = location.pathname.split("/")[1];
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
          const datasources = res.data.datasources;
          datasources.forEach(datasource => {
            this.options.push({
              value: datasource.id,
              label: datasource.name
            });
          });
          this.loading = false;
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
          this.loading = false;
        });
    },
    fetchSchemas: function(datasourceId) {
      this.loading = true;
      axios
        .get("http://localhost:8090/api/schemas?datasourceId=" + datasourceId)
        .then(res => {
          this.items = res.data.schemas;
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
    handleItemChange: function(item) {
      const datasourceId = item[0];
      this.fetchSchemas(datasourceId);
    }
  }
};
</script>
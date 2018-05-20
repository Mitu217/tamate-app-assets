<template>
    <el-main slot="content">
        <div class="description-header">
            <div class="description-header">
                <el-cascader
                    :options="options"
                    :props="props"
                    @active-item-change="handleItemChange"
                    @change="handleChange"
                ></el-cascader>
            </div>
        </div>

        <row-list :loading="loading" :rows="rows"></row-list>
    </el-main>
</template>

<script>
import axios from "axios";
import RowList from "~/components/list/row.vue";
export default {
  layout: "project",
  components: {
    RowList
  },
  data() {
    return {
      projectId: "",
      loading: false,
      options: [],
      props: {
        label: "label",
        value: "value",
        children: "children"
      },
      rows: []
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
              label: datasource.name,
              children: []
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
          const schemas = res.data.schemas;
          this.options.forEach((_, index) => {
            if (this.options[index].value === datasourceId) {
              schemas.forEach(schema => {
                this.options[index].children.push({
                  value: schema.name,
                  label: schema.name
                });
              });
            }
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchRows: function(datasourceId, schemaName) {
      this.loading = true;
      axios
        .get(
          "http://localhost:8090/api/tables/rows?datasourceId=" +
            datasourceId +
            "&schemaName=" +
            schemaName
        )
        .then(res => {
          this.rows = res.data.rows.values;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleItemChange: function(item) {
      if (item.length === 1) {
        const datasourceId = item[0];
        this.fetchSchemas(datasourceId);
      }
    },
    handleChange: function(item) {
      if (item.length < 2) {
        return;
      }
      const datasourceId = item[0];
      const schemaName = item[1];
      this.fetchRows(datasourceId, schemaName);
    }
  }
};
</script>
<template>
    <el-main slot="content">
        <div class="description-header">

            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(route, index) in routes" :key="route">
                    <span v-if="routes.length-1 !== index"><a href="/">{{route}}</a></span>
                    <span v-else>{{route}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>

        <row-list v-if="type === 'rows'" :loading="loading" :rows="items"></row-list>
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

    if (pathLength >= 3) {
      // datasources
      this.type = "datasources";
      const projectId = paths[1];
      this.projectId = projectId;
      this.routes.push(projectId);
    }
    if (pathLength >= 4) {
      // schemas
      this.type = "schemas";
      const datasourceId = paths[3];
      this.datasourceId = datasourceId;
      this.routes.push(datasourceId);
    }
    if (pathLength >= 5) {
      // rows
      this.type = "rows";
      const schemaName = paths[4];
      this.schemaName = paths[4];
      this.routes.push(paths[4]);
    }

    switch (this.type) {
      case "datasources":
        this.fetchDatasources();
        break;
      case "schemas":
        this.fetchSchemas(this.datasourceId);
        break;
      case "rows":
        this.fetchRows(this.datasourceId, this.schemaName);
        break;
    }
  },
  methods: {
    fetchDatasources: function() {
      this.loading = true;
      // TODO: API側がProjectごとのDatasourceに対応してない
      axios
        .get("http://localhost:8090/api/datasources")
        .then(res => {
          this.items = res.data.datasources;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchSchemas: function(datasourceId) {
      this.loading = true;
      axios
        .get("http://localhost:8090/api/schemas?dscId=" + datasourceId)
        .then(res => {
          this.items = res.data.schemas;
        })
        .catch(err => {
          // TODO: エラータイプが認証が必要なやつなら個別に対応

          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchRows: function(datasourceId, schemaName) {
      this.loading = true;
      axios
        .get(
          "http://localhost:8090/api/tables/rows?dscId=" +
            datasourceId +
            "&scn=" +
            schemaName
        )
        .then(res => {
          console.log(res);
          this.items = res.data.rows.values;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<template>
    <el-main>
        <el-row type="flex" justify="space-between" class="description-header">
            <el-col :span="12">
                <span style="line-height:33px;">Import</span>
            </el-col>
        </el-row>
        <el-form label-width="0px" class="demo-dynamic">
            <el-form-item>
                <el-main>
                    <el-card >
                        <el-row>
                            <el-col :span="11" style="text-align: right;">
                                <el-cascader
                                    :options="options"
                                    style="width:100%"
                                    v-model="selectedLeftOptions"
                                    @active-item-change="handleItemChange"
                                    @change="handleChange"
                                ></el-cascader>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">
                                <i class="el-icon-d-arrow-right"/>
                            </el-col>
                            <el-col :span="11">
                                <el-cascader
                                    :options="options"
                                    style="width:100%"
                                    v-model="selectedRightOptions"
                                    @active-item-change="handleItemChange"
                                    @change="handleChange"
                                ></el-cascader>
                            </el-col>
                        </el-row>
                        <div class="diff-content">
                            <el-tabs type="border-card">
                                <el-tab-pane>
                                    <span slot="label">
                                        Add<el-badge :value="add ? add.length : ''" :max="99" class="mark" />
                                    </span>
                                    <diff-table :diff="add"></diff-table>
                                </el-tab-pane>
                                <el-tab-pane :label="'Modify'">
                                    <span slot="label">
                                        Modify<el-badge v-bind:value="modify ? modify.length : ''" :max="99" class="mark"/>
                                    </span>
                                    <diff-table :diff="modify"></diff-table>
                                </el-tab-pane>
                                <el-tab-pane :label="'Delete'">
                                    <span slot="label">
                                        Delete<el-badge :value="del ? del.length : ''" :max="99" class="mark"/>
                                    </span>
                                    <diff-table :diff="del"></diff-table>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-card>
                </el-main>
            </el-form-item>
            <el-form-item style="text-align:right; padding:0 20px">
                <el-button type="primary" @click="onClickImport">Import</el-button>
                <el-button type="error" @click="onClickExportJson">ExportJSON</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<style>
.diff-content {
  margin: 20px 0 0;
}
.description-header {
  padding: 4px 20px 8px;
  border-bottom: solid 1px #e6e6e6;
}
.el-tabs {
  line-height: normal;
  box-shadow: none;
}
</style>

<script>
import axios from "axios";
import DiffTable from "~/components/table/diff.vue";
export default {
  layout: "project",
  components: {
    DiffTable
  },
  data() {
    return {
      options: [],
      add: null,
      modify: null,
      del: null,
      selectedLeftOptions: [],
      selectedRightOptions: []
    };
  },
  mounted: function() {
    const paths = location.href.split("#");
    if (paths.length === 0) {
      location.herf = "/";
    }
    const projectId = paths[1];

    axios
      .get(this.config.host + "/api/datasources?projectId=" + projectId)
      .then(res => {
        const datasources = res.data.datasources;
        let options = [];
        datasources.forEach(function(datasource) {
          let option = {
            value: datasource.id,
            label: datasource.name,
            children: []
          };
          options.push(option);
        });
        this.options = options;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleItemChange(val) {
      const datasourceId = val[0];
      axios
        .get(this.config.host + "/api/schemas?datasourceId=" + datasourceId)
        .then(res => {
          const self = this;
          const schemas = res.data.schemas;
          let children = [];
          this.options.forEach(function(option, index) {
            if (option.value === datasourceId) {
              schemas.forEach(function(schema) {
                const child = {
                  value: schema.name,
                  label: schema.name
                };
                children.push(child);
              });
              self.options[index].children = children;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(val) {
      if (
        this.selectedLeftOptions.length == 0 ||
        this.selectedRightOptions.length == 0
      ) {
        return;
      }
      axios
        .post(this.config.host + "/api/tables/diff", {
          left_datasource_id: this.selectedLeftOptions[0],
          left_schema_name: this.selectedLeftOptions[1],
          right_datasource_id: this.selectedRightOptions[0],
          right_schema_name: this.selectedRightOptions[1]
        })
        .then(res => {
          this.add = res.data.diff.add;
          this.modify = res.data.diff.modify;
          this.del = res.data.diff.delete;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickImport() {
      if (
        this.selectedLeftOptions.length == 0 ||
        this.selectedRightOptions.length == 0
      ) {
        return;
      }
      axios
        .post("this.config.host + /api/tables/import", {
          left_datasource_id: this.selectedLeftOptions[0],
          left_schema_name: this.selectedLeftOptions[1],
          right_datasource_id: this.selectedRightOptions[0],
          right_schema_name: this.selectedRightOptions[1]
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    onClickExportJson() {
      if (
        this.selectedLeftOptions.length == 0 ||
        this.selectedRightOptions.length == 0
      ) {
        return;
      }
      const query =
        "leftDatasourceId=" +
        this.selectedLeftOptions[0] +
        "&rightDatasourceId=" +
        this.selectedRightOptions[0] +
        "&leftSchemaName=" +
        this.selectedLeftOptions[1] +
        "&rightSchemaName=" +
        this.selectedRightOptions[1];
      axios
        .get(this.config.host + "/api/tables/export-json?" + query, {
          responseType: "blob"
        })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "sample.json");
          document.body.appendChild(link);
          link.click();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
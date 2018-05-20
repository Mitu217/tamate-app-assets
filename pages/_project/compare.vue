<template>
    <el-main>
        <div>
            <div class="block">
                <span class="demonstration">Left</span>
                <el-cascader
                    :options="options"
                    v-model="selectedLeftOptions"
                    @active-item-change="handleItemChange"
                    @change="handleChange"
                ></el-cascader>
            </div>
            <div class="block">
                <span class="demonstration">Right</span>
                <el-cascader
                    :options="options"
                    v-model="selectedRightOptions"
                    @active-item-change="handleItemChange"
                    @change="handleChange"
                ></el-cascader>
            </div>
            <div v-if="diff !== null">
                <el-tabs type="border-card">
                    <el-tab-pane :label="'Add(' + ')'">
                        <diff-table :data="diff.add"></diff-table>
                    </el-tab-pane>
                    <el-tab-pane :label="'Modify(' + ')'">
                        <diff-table :data="diff.modify"></diff-table>
                    </el-tab-pane>
                    <el-tab-pane :label="'Delete(' + ')'">
                        <diff-table :data="diff.delete"></diff-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </el-main>
</template>

<script>
import axios from "axios";
export default {
  layout: "project",
  data() {
    return {
      options: [],
      diff: null,
      selectedLeftOptions: [],
      selectedRightOptions: []
    };
  },
  mounted: function() {
    const projectId = location.pathname.split("/")[1];

    // TODO: API側がProjectごとのDatasourceに対応してない
    axios
      .get("http://localhost:8090/api/datasources")
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
        .get("http://localhost:8090/api/schemas?dscId=" + datasourceId)
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
        .post("http://localhost:8090/api/tables/diff", {
          left_datasource_id: this.selectedLeftOptions[0],
          left_schema_name: this.selectedLeftOptions[1],
          right_datasource_id: this.selectedRightOptions[0],
          right_schema_name: this.selectedRightOptions[1]
        })
        .then(res => {
          this.diff = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
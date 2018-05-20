<template>
    <div id="content">
        <div class="description-header">
            <div>Create a new Datasource</div>
        </div>
        <div class="form">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item
                    prop="project_id"
                    label="ProjectID"
                    :rules="[
                        { required: true, message: 'ProjectID is required.' },
                    ]">
                    <el-input v-model="form.project_id"></el-input>
                </el-form-item>
                <el-form-item
                    prop="name"
                    label="Name"
                    :rules="[
                        { required: true, message: 'Name is required.'},
                    ]">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    prop="type"
                    label="Type"
                    :rules="[
                        { required: true, message: 'Type is required.' },
                    ]">
                    <el-select v-model="form.type">
                        <el-option v-for="type in types" :key="type" :label="type" :value="type"></el-option>
                    </el-select>
                </el-form-item>

                <!-- CSV -->
                    <el-form-item
                        v-if="form.type === 'CSV'"
                        prop="config.csv.uri"
                        label="URI"
                        :rules="[
                            { required: true, message: 'URI is required.' },
                        ]">
                        <el-input v-model="form.config.csv.uri"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="form.type === 'CSV'"
                        prop="config.csv.column_row_index"
                        label="ColumnRowIndex"
                        :rules="[
                            { required: true, message: 'ColumnRowIndex is required'},
                            { type: 'number', message: 'ColumnRowIndex must be a number'}
                        ]">
                        <el-input v-model.number="form.config.csv.column_row_index" auto-complete="off"></el-input>
                    </el-form-item>

                <!-- SQL -->
                    <el-form-item
                        v-if="form.type === 'SQL'"
                        prop="config.sql.driver_name"
                        label="Driver"
                        :rules="[
                            { required: true, message: 'Driver is required.' },
                        ]">
                        <el-select v-model="form.config.sql.driver_name">
                            <el-option v-for="driver in sql_drivers" :key="driver" :label="driver" :value="driver"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="form.type === 'SQL'"
                        prop="config.sql.dsn"
                        label="DSN"
                        :rules="[
                            { required: true, message: 'DSN is required.' },
                        ]">
                        <el-input v-model="form.config.sql.dsn" placeholder="user:password@tcp(127.0.0.1:3306)/dbname"></el-input>
                    </el-form-item>

                <!-- Spreadsheet -->
                    <el-form-item
                        v-if="form.type === 'Spreadsheet'"
                        prop="config.spreadsheet.spreadsheet_id"
                        label="SheetID"
                        :rules="[
                            { required: true, message: 'SheetID is required.' },
                        ]">
                        <el-input v-model="form.config.spreadsheet.spreadsheet_id"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="form.type === 'Spreadsheet'"
                        prop="config.spreadsheet.ranges"
                        label="Ranges"
                        :rules="[
                            { required: true, message: 'Ranges is required.' },
                        ]">
                        <el-input v-model="form.config.spreadsheet.ranges" placeholder="A1:XX"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="form.type === 'Spreadsheet'"
                        prop="config.spreadsheet.column_row_index"
                        label="ColumnRowIndex"
                        :rules="[
                            { required: true, message: 'ColumnRowIndex is required'},
                            { type: 'number', message: 'ColumnRowIndex must be a number'}
                        ]">
                        <el-input v-model.number="form.config.spreadsheet.column_row_index" auto-complete="off"></el-input>
                    </el-form-item>

                <!-- Spanner -->
                     <el-form-item
                        v-if="form.type === 'Spanner'"
                        prop="config.spanner.dsn"
                        label="DSN"
                        :rules="[
                            { required: true, message: 'DSN is required.' },
                        ]">
                        <el-input v-model="form.config.spanner.dsn"></el-input>
                    </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">Create Project</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      projectId: "",
      loading: false,
      types: ["CSV", "SQL", "Spreadsheet", "Spanner"], // support datasource type list
      sql_drivers: ["MySQL"], // support sql driver list
      form: {
        project_id: "",
        name: "",
        type: "",
        config: {
          csv: {
            uri: "",
            column_row_index: 1
          },
          sql: {
            driver_name: "",
            dsn: ""
          },
          spreadsheet: {
            spreadsheet_id: "",
            ranges: "A1:XX",
            column_row_index: 1
          },
          spanner: {
            dsn: ""
          }
        }
      }
    };
  },
  mounted() {
    // get query params
    var args = {};
    var param = location.search.substring(1).split("&");
    for (var i = 0; i < param.length; i++) {
      var keySearch = param[i].search(/=/);
      var key = "";
      if (keySearch != -1) key = param[i].slice(0, keySearch);
      var val = param[i].slice(param[i].indexOf("=", 0) + 1);
      if (key != "") args[key] = decodeURI(val);
    }
    // set data
    this.projectId = args.projectId;
    this.form.project_id = args.projectId;
  },
  methods: {
    onSubmit: function() {
      this.loading = true;
      // check validate
      this.$refs["form"].validate(valid => {
        if (valid) {
          // encoding config
          let config = "";
          switch (this.form.type) {
            case "CSV":
              config = JSON.stringify(this.form.config.csv);
              break;
            case "SQL":
              config = JSON.stringify(this.form.config.sql);
              break;
            case "Spreadsheet":
              config = JSON.stringify(this.form.config.spreadsheet);
              break;
            case "Spanner":
              config = JSON.stringify(this.form.config.spanner);
              break;
          }
          // post request
          axios
            .post("http://localhost:8090/api/datasources/create", {
              project_id: this.form.project_id,
              name: this.form.name,
              type: this.form.type.toLowerCase(),
              config: config
            })
            .then(res => {
              location.href = "/" + this.projectId + "/tree";
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
          return true;
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>
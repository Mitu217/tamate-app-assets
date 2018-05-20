<template>
    <el-table
        :data="datasources"
        :show-header="false"
        class="datasource-list">
        <el-table-column>
            <template slot-scope="scope">
                <i class="el-icon-goods"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column width="180">
            <template slot-scope="scope">
                <div style="text-align: right;">
                    <!--
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    -->
                    <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)">Delete</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
.datasource-list {
  padding: 0;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deleteDialogVisible: false,
      deleteDatasourceID: ""
    };
  },
  props: ["datasources"],
  methods: {
    onClick: id => {
      // FIXME: 遷移だけとは限らない
      location.href =
        "/" +
        location.pathname
          .split("/")
          .splice(1)
          .join("/") +
        "/" +
        id;
    },
    onClickDelete(index, row) {
      this.deleteDatasourceID = row.id;
      this.deleteDialogVisible = true;

      // FIXME:
      axios
        .post("http://localhost:8090/api/datasources/delete", {
          id: this.deleteDatasourceID
        })
        .then(res => {
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


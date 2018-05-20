<template>
    <el-table
        :data="schemas"
        :show-header="false"
        class="schema-list">
        <el-table-column>
            <template slot-scope="scope">
                <i class="el-icon-tickets"></i>
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
                    <!--
                    <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)">Delete</el-button>
                    -->
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
export default {
  props: ["schemas"],
  methods: {
    onClick: name => {
      // FIXME: 遷移だけとは限らない
      location.href =
        "/" +
        location.pathname
          .split("/")
          .splice(1)
          .join("/") +
        "/" +
        name;
    }
  }
};
</script>

<template>
    <div class="row-table">
        <el-table v-if="data.length > 0" :data="data" border style="width: 100%">
            <el-table-column v-for="key in Object.keys(data[0])" :prop="key" :label="key" :formatter="cellValueRenderer" :key="key">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  props: ["rows"],
  methods: {
    cellValueRenderer(row, column, cellValue) {
      const isBool = typeof cellValue === "boolean";
      return isBool ? (cellValue ? "✓" : " ") : cellValue;
    }
  },
  watch: {
    rows: function(newRows) {
      this.data = [];
      newRows.forEach(newRow => {
        this.data.push(newRow.values);
      });
    }
  }
};
</script>

<style>
.row-table {
  padding: 20px;
}
</style>

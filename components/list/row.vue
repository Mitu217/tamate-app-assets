<template>
    <div class="row-table">
        <el-table v-if="rows.length > 0" :data="rows" border style="width: 100%">
            <el-table-column v-for="key in Object.keys(rows[0])" :prop="key" :label="key" :formatter="cellValueRenderer" :key="key">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  props: ["rows"],
  methods: {
    cellValueRenderer(row, column, cellValue) {
      const isBool = typeof cellValue === "boolean";
      return isBool ? (cellValue ? "✓" : " ") : cellValue;
    }
  }
};
</script>

<style>
.row-table {
  padding: 20px;
}
</style>

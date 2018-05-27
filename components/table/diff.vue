<template>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%; margin-top: 20px;">
        <div class="hidden-columns">
            <div v-for="diffColumn in diffColumns" v-bind:key="diffColumn.name"></div>
        </div>
        <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
                <colgroup>
                    <col v-for="(diffColumn, index) in diffColumns" v-bind:name="'el-table-diff_column_' + index" v-bind:key="index"/>
                </colgroup>
                <thead class="has-gutter">
                    <tr>
                        <th v-for="(diffColumn, index) in diffColumns" colspan="1" rowspan="1" v-bind:class="'el-table-diff_column_' + index + ' is-leaf'" v-bind:key="index">
                            <div class="cell">
                                {{ diffColumn }}
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="el-table__body-wrapper is-scrolling-none">
            <table v-if="diffColumns.length > 0" cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                <colgroup>
                    <col v-for="(diffColumn, index) in diffColumns" :name="'el-table-diff_column_' + index" v-bind:key="index"/>
                </colgroup>
                <tbody>
                    <tr v-for="(d, index) in data" class="el-table__row" v-bind:key="index">
                        <td v-for="(diffColumn, columnIndex) in diffColumns" colspan="1" rowspan="1" :class="'el-table-diff_column_' + columnIndex + ' is-leaf'" v-bind:key="diffColumn.name">
                            <div class="cell">
                                <div v-if="d.left !== null && d.right !== null && d.left.values[diffColumn] && d.right.values[diffColumn]">
                                    <div v-if="d.left.values[diffColumn] === d.right.values[diffColumn]">
                                        <p>{{ d.left.values[diffColumn] }}</p>
                                    </div>
                                    <div v-if="d.left.values[diffColumn] !== d.right.values[diffColumn]">
                                        <p style="color:red">{{ d.left.values[diffColumn] }}</p>
                                        <p style="color:green">{{ d.right.values[diffColumn] }}</p>
                                    </div>
                                </div>
                                <div v-else-if="d.left !== null && d.left.values[diffColumn]">
                                    <div>
                                        <p style="color:green">{{ d.left.values[diffColumn] }}</p>
                                    </div>
                                </div>
                                <div v-else-if="d.right !== null && d.right.values[diffColumn]">
                                    <div>
                                        <p style="color:red">{{ d.right.values[diffColumn] }}</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="el-table__empty-block"><span class="el-table__empty-text">データなし</span></div>
            <div class="el-table__column-resize-proxy" style="display: none;"></div>
        </div>
    </div>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      data: [],
      diffColumns: []
    };
  },
  props: ["diff"],
  watch: {
    diff: function(newDiff) {
      this.data = newDiff;

      let diffColumns = [];
      if (
        this.data !== undefined &&
        this.data !== null &&
        this.data.length > 0
      ) {
        const data = this.data[0];
        diffColumns = [
          ...Object.keys(data.left !== null ? data.left.values : []),
          ...Object.keys(data.right !== null ? data.right.values : [])
        ];
        diffColumns = diffColumns.filter(function(item, pos) {
          return diffColumns.indexOf(item) == pos;
        });
      }
      this.diffColumns = diffColumns;
    }
  }
};
</script>


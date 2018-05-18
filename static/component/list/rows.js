(() => {
    Vue.component('row-list', Vue.extend({
        props: [ 'loading', 'rows' ],
        methods: {
            cellValueRenderer(row, column, cellValue) {
                const isBool = typeof cellValue === 'boolean';
                return isBool ? cellValue ? '✓' : ' ' : cellValue;
            },
        },
        template:
            `
            <el-table v-if="rows.length > 0" :data="rows" border style="width: 100%">
                <el-table-column v-for="key in Object.keys(rows[0])" :prop="key" :label="key" :formatter="cellValueRenderer" :key="key">
                </el-table-column>
            </el-table>
            `
    }));
})();
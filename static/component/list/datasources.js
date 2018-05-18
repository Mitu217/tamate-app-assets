(() => {
    Vue.component('datasource-list', Vue.extend({
        props: [ 'loading', 'datasources' ],
        methods: {
            onClick: (id) => {
                // FIXME: 遷移だけとは限らない
                location.href = '/' + location.pathname.split('/').splice(1).join('/') + '/' + id;
            },
        },
        template:
            `
            <el-menu
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                class="datasource-list-content">
                <div v-for="(datasource, index) in datasources" :key="index" class="text item">
                    <el-menu-item  index="datasource.id" @click="onClick(datasource.id)">
                        <i class="el-icon-goods"></i>
                        <span>{{ datasource.name }}</span>
                    </el-menu-item>
                </div>
            </el-menu>
            `
    }));
})();
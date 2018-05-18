(() => {
    Vue.component('schema-list', Vue.extend({
        props: [ 'loading', 'schemas' ],
        methods: {
            onClick: (name) => {
                // FIXME: 遷移だけとは限らない
                location.href = '/' + location.pathname.split('/').splice(1).join('/') + '/' + name;
            },
        },
        template:
            `
            <el-menu
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                class="datasource-list-content">
                <div v-for="(schema, index) in schemas" :key="index" class="text item">
                    <el-menu-item  index="schema.id" @click="onClick(schema.name)">
                        <i class="el-icon-goods"></i>
                        <span>{{ schema.name }}</span>
                    </el-menu-item>
                </div>
            </el-menu>
            `
    }));
})();
(() => {
    Vue.component('app-header', Vue.extend({
        data: function(){
            return {}
        },
        props: [ 'title' ],
        methods: {
            onClickTitle: function() {
                location.href = '/';
            },
        },
        template:
            `
            <el-menu class="el-menu" mode="horizontal">
                <el-menu-item index="1" @click="onClickTitle()">{{ title }}</el-menu-item>
            </el-menu>
            `
    }));
})();
(() => {
    Vue.component('project-nav', Vue.extend({
        data: function(){
            return {
                projectId: '',
                active: 1,
                isCollapse: true,
            }
        },
        props: [],
        created: function() {
            this.projectId = location.pathname.split('/')[1];
        },
        methods: {
            onClickMenuItem: function(route) {
                const url = "/" + this.projectId + "/" + route;
                if (url === location.pathname) {
                    return;
                }
                location.href = url;
            },
        },
        template:
            `
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                <el-menu-item index="1" @click="onClickMenuItem('')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Overview</span>
                </el-menu-item>
                <el-menu-item index="2" @click="onClickMenuItem('tree')">
                    <i class="el-icon-news"></i>
                    <span slot="title">Tree</span>
                </el-menu-item>
                <el-menu-item index="3" @click="onClickMenuItem('compare')">
                        <i class="el-icon-sort"></i>
                        <span slot="title">Compare</span>
                    </el-menu-item>
                <el-menu-item index="4" @click="onClickMenuItem('setting')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">Setting</span>
                </el-menu-item>
            </el-menu>
            `
    }));
})();
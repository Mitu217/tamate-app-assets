(() => {
    Vue.component('project-layout', Vue.extend({
        template:
            `
            <el-container>
                <el-header>
                    <slot name="header"></slot>
                </el-header>
                    <el-container>
                        <el-aside style="width: auto;">
                            <slot name="nav"></slot>
                        </el-aside>
                        <el-container>
                            <slot name="content"></slot>
                        </el-container>
                    </el-container>
            </el-container>
            `
    }));
})();
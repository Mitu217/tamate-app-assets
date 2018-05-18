(() => {
    Vue.component('main-layout', Vue.extend({
        template:
            `
            <el-container>
                <el-header>
                    <slot name="header"></slot>
                </el-header>
                <el-main>
                    <slot name="content"></slot>
                </el-main>
            </el-container>
            `
    }));
})();
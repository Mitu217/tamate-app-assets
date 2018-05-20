<template>
    <div id="dashboard">
        <!-- Project List -->
        <el-card class="project-card">
            <div slot="header" class="project-card-header">
                <span>Project</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="onClickNewProject()">New Project</el-button>
            </div>
            <el-menu
                v-loading="project.loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                class="project-card-content">
                <div v-for="project in project.items" :key="project.id" class="text item">
                    <el-menu-item :index="project.id" @click="onClickProject(project.id)">
                        <i class="el-icon-goods"></i>
                        <span>{{project.name}}</span>
                    </el-menu-item>
                </div>
            </el-menu>
        </el-card>
    </div>
</template>

<style>
.activity-card {
  flex: 1;
  margin: 8px;
}
.project-card-header {
}
.project-card-content {
  height: 100%;
}
.project-card {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 360px;
  margin: 8px;
}
.el-card__header {
}
.el-card__body {
  padding: 0;
  flex: 1;
}
#dashboard {
  display: flex;
  flex-direction: row;
  max-width: 960px;
  margin: 0 auto;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity: {
        loading: false
      },
      project: {
        items: [],
        loading: false
      }
    };
  },
  created() {
    this.project.loading = true;
    axios
      .get("http://localhost:8090/api/projects")
      .then(res => {
        this.project.items = res.data.projects;
        this.project.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onClickNewProject: function() {
      location.href = "/projects/new";
    },
    onClickProject: function(projectId) {
      location.href = projectId + "/";
    }
  }
};
</script>
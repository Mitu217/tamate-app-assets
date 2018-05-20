<template>
    <el-row class="dashboard-content">
        <el-col class="activity-content" v-loading="activity.loading">
            <div class="activity-card-content">
                <el-table :data="activity.items" :show-header="false">
                    <el-table-column prop="message"></el-table-column>
                </el-table>
            </div>
        </el-col>
        <el-col class="project-content">
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
        </el-col>
    </el-row>
</template>

<style scoped>
.activity-card-content {
  margin: 20px;
}
.activity-card {
  padding: 18px 20px;
  max-width: 480px;
  margin: 0 auto;
}

.project-card-content {
  height: 100%;
}
.project-card {
  display: flex;
  flex-direction: column;

  height: 360px;
  margin: 8px;
}
.el-menu {
  border-right: 0px;
}

.el-card__body {
  padding: 0;
  flex: 1;
}

.activity-content {
  flex: 1;
}
.project-content {
  width: 260px;
}

.dashboard-content {
  display: flex;
  flex-direction: row;
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity: {
        items: [
          {
            id: "",
            message: "adminがtamateを作成しました"
          },
          {
            id: "",
            message: "これはLatestActivityのモックです"
          },
          {
            id: "",
            message: "ここにはすべてのログが時系列順に表示されます"
          }
        ],
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
      //location.href = projectId + "/";
      location.href = projectId + "/datasources";
    }
  }
};
</script>
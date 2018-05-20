<template>
    <div id="content">
        <div class="description-header">
            <div>Create a new Project</div>
        </div>
        <div class="form">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="Project name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="Thumbnail">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="/"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small">select file</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">Create Project</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    onSubmit: function() {
      this.loading = true;
      this.submitUpload();
      axios
        .post("http://localhost:8090/api/projects/create", {
          name: this.form.name,
          description: this.form.description,
          thumbnail_uri: this.thubmnailFile
        })
        .then(res => {
          location.href = "/dashboard";
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitUpload: function() {
      console.log("not support");
      //this.$refs.upload.submit();
    }
  }
};
</script>

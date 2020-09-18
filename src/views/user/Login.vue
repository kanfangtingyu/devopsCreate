<template>
  <div class="main">
    <div class="banner">
      <img alt="Vue logo" style="width: 64px; height: 64px" src="../../assets/logo.png" />
      <h3 style="margin-top: 1rem">私有云登陆页面</h3>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value) => {
      if (value === '') {
        this.$message({
          message: '请输入用户名',
          type: 'warning',
        });
      }
    };
    const validatePassword = (rule, value) => {
      if (value === '') {
        this.$message({
          message: '请输入密码',
          type: 'warning',
        });
      }
    };
    return {
      loginUrl: '/api/user/login',
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      const _this = this;
      const params = this.ruleForm;
      this.axios({
        url: this.loginUrl,
        method: 'post',
        data: params,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            _this.$message({
              type: 'success',
              message: '登录成功',
            });
            _this.$router.push({ path: '/menu' });
          } else {
            _this.$message({
              message: '用户名/密码错误!!!',
              type: 'warning',
            });
          }
        })
        .catch((error) => {
          console.log(123);
          throw error;
        //   _this.$message({
        //     message: '用户名/密码错误',
        //     type: 'warning',
        //   });
        //   console.log(error);
        });
    },
    resetForm(formName) {
      this.$router.push({ path: '/menu' });
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}
</style>

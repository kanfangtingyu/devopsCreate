<template>
  <div id="userLayout">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">供应链金融运营平台</span>
          </a>
        </div>
        <div class="desc">
        </div>
      </div>
      <div class="main">
        <login-form></login-form>
      </div>
      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2020 中移动金融科技有限公司 版权所有
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/views/user/Login.vue';

export default {
  name: 'UserLayout',
  // eslint-disable-next-line vue/no-unused-components
  components: { Login },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style scoped>
#userLayout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 100%;
  background-size: 100%;
}

.container {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
}

a {
  text-decoration: none;
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}

.badge {
  position: absolute;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-left: -12px;
  margin-top: -10px;
  opacity: 0.8;
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
  border-style: none;
}

.title {
  font-size: 25px;
  color: rgba(0, 0, 0, .85);
  font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}

.main {
  min-width: 260px;
  width: 368px;
  height: 311.5px;
  margin: 0 auto;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
}
#components-form-demo-vuex .language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}

.copyright {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>

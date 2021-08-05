<template>
  <div class="login-container">
    <div class="login-title">
      <h1>为安全保驾护航</h1>
      <h4>通扬线高邮段航道整治工程桥梁全寿命健康监测系统</h4>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
      label-width="0px"
    >

      <div class="title-container">
        <h3 class="title"> 监测管理系统 </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          size="small"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          size="small"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.code"
          size="small"
          :type="passwordType"
          name="code"
          tabindex="3"
          placeholder="验证码"
        />
      </el-form-item>
      <el-form-item
        prop="rememberMe"
        class="rememberMe"
      >
        <el-checkbox
          v-model="loginForm.rememberMe"
          class="checkbox"
        >
          记住我
        </el-checkbox>
        <div class="login-code">
          <img :src="codeUrl">
        </div>
      </el-form-item>
      <div class="login-warp">
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="handleLogin"
        > 登 录 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: 'data:image/png;base64,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',
      loginForm: {
        username: 'admin',
        password: '111111',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{
          required: true, trigger: 'change', validator: (rule, value, callback) => {
            if (!validUsername(value)) {
              callback(new Error('请输入用户名'))
            } else {
              callback()
            }
          }
        }],
        password: [{
          required: true, trigger: 'change', validator: (rule, value, callback) => {
            if (value.length < 6) {
              callback(new Error('请输入6位数密码'))
            } else {
              callback()
            }
          }
        }],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ]
      },
      redirect: undefined,
      passwordType: 'password',
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #fff;
$light_gray: #303133;
$cursor: #303133;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

@media only screen and (max-width: 470px) {
  .login-title {
    display: none !important;
  }
  .login-container {
    justify-content: center !important;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    color: #454545;
    border-radius: 5px;
    background: #fff;
    background: rgba(0, 0, 0, 0.022);
    // border: 1px solid rgba(255, 255, 255, 0.66);
    .el-form-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &.rememberMe {
      background: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #303133;
$light_gray: #303133;
$cursor: #303133;

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: 50%;
  justify-content: space-between;
  background-image: url("~@/assets/layout/loginbg.png");
  .login-title {
    h1 {
      font-size: 2.6em;
    }
    color: #fff;
    padding-left: 20%;
  }
  .login-form {
    margin-right: 2%;
    padding: 74px 20px;
    width: 340px;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("~@/assets/layout/login_form.png");
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-warp {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-button {
      width: 80%;
      padding: 14px;
    }
  }
}
</style>

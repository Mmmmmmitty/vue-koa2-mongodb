<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
      <div class="register-button">
        <van-button type="primary" @click="axiosRegisterUser" :loading="openLoading" size="large">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import axios from "axios";
import { Toast } from 'vant'
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading:false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
      let self = this
      self.openLoading = true
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          self.openLoading = false
          console.log(response);
          //如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.data.code == 200) {
            Toast.success("注册成功");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败");
          }
          console.log(response.data.code);
        })
        .catch(error => {
          self.openLoading = false
          Toast.fail("注册失败");
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
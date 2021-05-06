<template>
  <div>
    <components
      :is="currentLoginTheme"
      :userInfo="userInfo"
      :loginForm.sync="loginForm"
      :loginState="loginState"
      :loginLoading="loginLoading"
      :loginError="loginError"
      :loginErrorMsg="loginErrorMsg"
      :login="login"
      :logout="logout"
    ></components>
  </div>
</template>

<script>
import { login, getInfo, logout } from "@/api/user";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import storage from "store";
import MikuLogin from "./themes/Miku";
import WifeLogin from "./themes/Wife";
import { MIKU_THEME_NAME, WIFE_THEME_NAME } from "@/config/theme/types.js";
const LoginThemeComponentMap = {
  [MIKU_THEME_NAME]: "MikuLogin",
  [WIFE_THEME_NAME]: "WifeLogin"
};
export default {
  inject: ["app"],
  components: {
    MikuLogin,
    WifeLogin
  },
  data() {
    return {
      loginForm: {
        // emali: "",
        phone: "",
        password: ""
      },
      loginState: storage.get(LOGIN_STATE) || 0,
      userInfo: storage.get(USER_INFO) || null,
      loginLoading: false,
      loginError: false,
      loginErrorMsg: "",
      logoutLoading: false
    };
  },
  computed: {
    currentLoginTheme() {
      let result = "";
      const currentTheme = this.app.currentTheme;
      if (currentTheme in LoginThemeComponentMap) {
        result = LoginThemeComponentMap[currentTheme];
      }
      return result;
    }
  },
  created() {
    this.$bus.$on("login-state-change", () => {
      this.loginState = storage.get(LOGIN_STATE) || 0;
      this.userInfo = storage.get(USER_INFO) || null;
      storage.get(LOGIN_STATE) === 1 &&
        getInfo()
          .then(res => {
            const {
              avatar,
              deleted,
              email,
              id,
              lastLoginTime,
              name,
              password,
              phone,
              points,
              roleId,
              status
            } = {
              ...res.data
            };
            storage.set(USER_INFO, {
              avatar,
              deleted,
              email,
              id,
              lastLoginTime,
              name,
              password,
              phone,
              points,
              roleId,
              status
            });
          })
          .catch(() => {
            storage.set(LOGIN_STATE, 0);
            storage.remove(USER_INFO);
            this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
          });
    });
    storage.get(LOGIN_STATE) === 1 &&
      getInfo()
        .then(res => {
          const {
            avatar,
            deleted,
            email,
            id,
            lastLoginTime,
            name,
            password,
            phone,
            points,
            roleId,
            status
          } = {
            ...res.data
          };
          storage.set(USER_INFO, {
            avatar,
            deleted,
            email,
            id,
            lastLoginTime,
            name,
            password,
            phone,
            points,
            roleId,
            status
          });
        })
        .catch(() => {
          storage.set(LOGIN_STATE, 0);
          storage.remove(USER_INFO);
          this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
        });
  },
  mounted() {},
  methods: {
    login() {
      this.loginLoading = true;
      this.loginError = false;
      this.loginErrorMsg = "";
      login(this.loginForm)
        .then(res => {
          storage.set(LOGIN_STATE, 1);
          this.loginState = 1;
          const { avatar, email, id, lastLoginTime, name, phone, points } = {
            ...res.data
          };
          storage.set(USER_INFO, {
            avatar,
            email,
            id,
            lastLoginTime,
            name,
            phone,
            points
          });
          this.userInfo = storage.get(USER_INFO);
          this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
        })
        .catch(e => {
          console.log(e, "e");
          this.loginError = true;
          this.loginErrorMsg = e.message;
          this.loginState = 0;
          storage.set(LOGIN_STATE, 0);
          storage.remove(USER_INFO);
          this.userInfo = storage.get(USER_INFO);
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
    logout() {
      this.logoutLoading = true;
      logout()
        .then(() => {
          this.loginState = 0;
          storage.set(LOGIN_STATE, 0);
          storage.remove(USER_INFO);
          this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
        })
        .catch(e => {
          console.log(e, "e");
          this.loginState = 0;
          storage.set(LOGIN_STATE, 0);
          storage.remove(USER_INFO);
          this.userInfo = storage.get(USER_INFO);
          this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
        })
        .finally(() => {
          this.logoutLoading = false;
        });
    }
  }
};
</script>

<style></style>

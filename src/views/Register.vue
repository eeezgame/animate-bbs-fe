<template>
  <div class="mt-8 mx-auto bg-miku-1100" style="width:600px;">
    <div class="px-4 py-2 ">
      <form ref="form" class="space-y-4" @submit.prevent="onSubmit">
        <h2 class=" text-3xl font-bold text-center">注册用户</h2>
        <t-alert variant="error" :show="error">
          {{ errorMsg }}
        </t-alert>
        <t-input-group label="用户昵称:" feedback="">
          <t-input variant="" v-model="form.name" type="text" required />
        </t-input-group>
        <t-input-group label="电子邮箱:" feedback="">
          <t-input variant="" v-model="form.email" type="email" required />
        </t-input-group>
        <t-input-group
          label="手机号码:"
          :variant="formState.phone.variant"
          :feedback="formState.phone.feedback"
        >
          <t-input
            v-model="form.phone"
            :variant="formState.phone.variant"
            type="text"
            required
          />
        </t-input-group>
        <t-input-group label="用户密码:" feedback="">
          <t-input
            variant=""
            v-model="form.password"
            type="password"
            required
          />
        </t-input-group>
        <button
          class="w-full px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-500 "
        >
          {{ loading ? "注册登录中..." : "注册并登录" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import storage from "store";
import { addUser } from "@/api/user-manage";
const defalutForm = {
  avatar: "/images/avatar/avatar.jpg",
  email: "",
  name: "",
  password: "",
  phone: ""
};
const rules = {
  phone: {
    pattern: /^(?:(?:\+|00)86)?1\d{10}$/
  }
};
const defalutFormState = {
  phone: {
    variant: "",
    feedback: ""
  }
};
export default {
  name: "Register",
  data() {
    return {
      form: Object.assign({}, defalutForm),
      formState: Object.assign({}, defalutFormState),
      error: false,
      errorMsg: "",
      loading: false
    };
  },
  methods: {
    onSubmit() {
      let result = true;
      if (!rules.phone.pattern.test(this.form.phone)) {
        result = false;
        this.formState.phone = Object.assign({}, this.formState.phone, {
          variant: "error",
          feedback: "请输入正确的手机号码"
        });
      }

      if (result) {
        this.error = false;
        this.errorMsg = "";
        this.loading = true;
        addUser(this.form)
          .then(() => {
            login(this.form)
              .then(res => {
                storage.set(LOGIN_STATE, 1);
                const {
                  avatar,
                  email,
                  id,
                  lastLoginTime,
                  name,
                  phone,
                  points
                } = {
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
                // this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
                window.location.href = "/";
              })
              .catch(e => {
                console.log(e, "e");
                this.loginState = 0;
                storage.set(LOGIN_STATE, 0);
                storage.remove(USER_INFO);
              })
              .finally(() => {
                this.loading = false;
              });
            this.resetForm();
          })
          .catch(e => {
            this.error = true;
            this.errorMsg = e.message;
            this.loading = false;
          });
      }
    },
    resetForm() {
      this.form = Object.assign({}, this.form, defalutForm);
      this.formState = Object.assign({}, this.formState, defalutForm);
    }
  }
};
</script>

<template>
  <div class="px-8">
    <div class="flex flex-col bg-white max-w-sm  mx-auto rounded-sm shadow-md">
      <div class="px-6 py-4">
        <p class=" font-bold">animate-bbs</p>
        <p class="text-gray-300">动漫论坛</p>
      </div>
      <div class="text-center py-4 space-y-2 border-t border-gray-200">
        <p class="">
          没有账号?<a class="text-blue-500 hover:underline" href="#"
            >现在注册</a
          >
        </p>
        <form class="px-2 space-y-2">
          <div>
            <input
              v-model="loginForm.phone"
              type="text"
              name="phone"
              class="h-8 w-full p-1 rounded-sm border border-gray-300"
              placeholder="手机号"
            />
          </div>
          <div>
            <input
              v-model="loginForm.password"
              type="password"
              name="password"
              placeholder="密码"
              class="h-8 w-full p-1 rounded-sm border border-gray-300"
            />
          </div>
        </form>
        <p class="px-2">
          <button
            class="w-full px-2 py-1 bg-miku-500 text-gray-100 font-bold rounded hover:bg-miku-400 "
            @click="login"
          >
            立即登录
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      loginForm: {
        // emali: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log("登录", this.loginForm);
      login(this.loginForm);
    }
  }
};
</script>

<style></style>

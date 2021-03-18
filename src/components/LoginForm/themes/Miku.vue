<template>
  <div class="px-8">
    <div
      class="flex flex-col max-w-sm  mx-auto rounded-sm shadow-md"
      style="background: #B6DDDE;border-color: #8FCCCD;"
    >
      <div class="px-6 py-4">
        <p class="font-bold">animate-bbs</p>
        <p class="">动漫论坛</p>
      </div>
      <div
        v-if="loginState === 0"
        class="text-center py-4 space-y-2 border-t border-gray-200"
      >
        <p class="">
          没有账号?
          <router-link to="/register" class="text-blue-500 hover:underline"
            >现在注册</router-link
          >
        </p>
        <form class="px-2 space-y-2">
          <t-alert variant="error" :show="loginError">
            {{ loginErrorMsg }}
          </t-alert>
          <div>
            <input
              :value="loginForm.phone"
              @input="handleLoginFormChange('phone', $event.target.value)"
              type="text"
              name="phone"
              class="h-8 w-full p-1 rounded-sm border border-gray-300"
              placeholder="手机号"
            />
          </div>
          <div>
            <input
              :value="loginForm.password"
              @input="handleLoginFormChange('password', $event.target.value)"
              type="password"
              name="password"
              placeholder="密码"
              class="h-8 w-full p-1 rounded-sm border border-gray-300"
            />
          </div>
        </form>
        <p class="px-2">
          <button
            class="w-full px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-400 "
            @click="login"
          >
            {{ loginLoading ? "登录中..." : "立即登录" }}
          </button>
        </p>
      </div>
      <div v-if="loginState === 1 && userInfo" class=" mb-4">
        <img
          class="w-16 h-16 cursor-pointer rounded-full mx-auto"
          :src="$imgURL + userInfo.avatar"
          alt=""
          @click="$router.push({ name: 'Space', params: { id: userInfo.id } })"
        />
        <p class=" text-center">
          {{ userInfo.name }}
        </p>
        <p class="px-2">
          <button
            class="w-full px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-400 "
            @click="logout"
          >
            {{ loginLoading ? "登出中..." : "登出" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "userInfo",
    "loginForm",
    "loginState",
    "loginLoading",
    "loginError",
    "loginErrorMsg",
    "login",
    "logout"
  ],
  methods: {
    handleLoginFormChange(field, value) {
      this.$emit(
        "update:login-form",
        Object.assign({}, this.loginForm, { [field]: value })
      );
    }
  }
};
</script>

<style></style>

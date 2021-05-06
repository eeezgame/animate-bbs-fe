<template>
  <div id="app">
    <!-- <div id="nav" class="container">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>z
    </div> -->
    <nav
      class="fixed z-50 w-full top-0 left-0 bg-gray-100 hover:bg-miku-100 px-6 shadow"
    >
      <div
        class="flex flex-col h-6 container mx-auto md:flex-row md:items-center md:justify-between"
      >
        <div class="flex justify-between items-center">
          <div>
            <router-link
              to="/"
              class="text-gray-800 hover:text-pink-500 text-sm"
              >首页</router-link
            >
          </div>
          <div>
            <button
              type="button"
              class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                <path
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="md:flex flex-col md:flex-row md:-mx-4 hidden space-x-2">
          <router-link
            v-if="loginState === 1"
            to="/shop"
            class=" text-black hover:text-pink-500 md:my-0"
            >[积分商城]</router-link
          >
          <router-link
            v-if="loginState === 1"
            to="/send-post"
            class="my-0 px-2 bg-miku-700 text-gray-100 font-bold hover:bg-miku-400 md:mx-4 "
            >发帖</router-link
          >
          <t-dropdown
            :text="userInfo && userInfo.name"
            variant="text"
            toggleOnClick
          >
            <div class="py-1 rounded-md shadow-xs" slot-scope="{ hide }">
              <div
                class="py-1  text-left"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <router-link
                  tag="p"
                  v-if="loginState === 1"
                  to="/my-orders"
                  class="cursor-pointer hover:bg-gray-100 text-left px-4 py-2 text-sm text-gray-700"
                  >我的订单</router-link
                >
                <router-link
                  tag="p"
                  v-if="loginState === 1"
                  :to="'/space/' + userInfo.id"
                  class="cursor-pointer hover:bg-gray-100 text-left px-4 py-2 text-sm text-gray-700"
                  >我的空间</router-link
                >
                <p
                  class="cursor-pointer hover:bg-gray-100 text-left px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  @click="
                    hide();
                    logout();
                  "
                >
                  登出
                </p>
              </div>
            </div>
          </t-dropdown>
          <t-dropdown text="[主题]" variant="text" toggleOnClick>
            <div class="py-1 rounded-md shadow-xs" slot-scope="{ hide }">
              <span
                v-for="theme in themes"
                :key="theme"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @click="
                  hide();
                  changeTheme(theme);
                "
              >
                {{ theme }}
              </span>
            </div>
          </t-dropdown>
        </div>
      </div>
    </nav>
    <main class="pt-6" :class="[currentTheme]">
      <router-view class="mb-16" />
    </main>
    <footer
      class="bg-green-50 text-xs w-full border-solid border-gray-600 border-t p-1 fixed left-0 bottom-0"
      style="z-index: 1000;"
    >
      <div class="flex items-end">
        <img
          src="./assets/miku_fighting.png"
          alt=""
          class="w-4 h-4 inline-block"
        />
        <p class="divide-x divide-gray-400">
          <a
            href="#"
            class="text-blue-600 hover:text-pink-500 no-underline px-1"
            >首页版规</a
          >
          <a
            href="/"
            class="text-blue-600 hover:text-pink-500 no-underline px-1"
            >微博</a
          >
          <a
            href="/"
            class="text-blue-600 hover:text-pink-500 no-underline px-1"
            >知乎</a
          >
        </p>
      </div>
      <div class="flex items-end">
        <img
          src="./assets/miku_happy.png"
          alt=""
          class="w-4 h-4 inline-block"
        />
        <a href="/" class="text-blue-600 hover:text-pink-500 no-underline px-1"
          >联系站长</a
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { MIKU_THEME_NAME, WIFE_THEME_NAME } from "@/config/theme/types.js";
import ClickOutside from "vue-click-outside";
import { LOGIN_STATE, USER_INFO, THEME } from "@/store/mutation-types";
import storage from "store";
import { getInfo, logout } from "@/api/user";
let bodyEl = document.querySelector("body");
bodyEl && (bodyEl.className = storage.get(THEME) || MIKU_THEME_NAME);
export default {
  directives: {
    ClickOutside
  },
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      loginState: storage.get(LOGIN_STATE) || 0,
      userInfo: storage.get(USER_INFO) || null,
      userMenuOpen: false,
      currentTheme: storage.get(THEME) || MIKU_THEME_NAME,
      themes: [MIKU_THEME_NAME, WIFE_THEME_NAME]
    };
  },
  created() {
    this.$bus.$on("login-state-change", () => {
      this.loginState = storage.get(LOGIN_STATE) || 0;
      this.userInfo = storage.get(USER_INFO) || null;
    });
  },
  methods: {
    logout() {
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
        });
    },
    changeTheme(theme) {
      storage.set(THEME, theme);
      this.currentTheme = theme;
      bodyEl.className = theme;
    },
    updateUserInfo() {
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
            this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
          })
          .catch(() => {
            storage.set(LOGIN_STATE, 0);
            storage.remove(USER_INFO);
            this.$bus.$emit("login-state-change", storage.get(LOGIN_STATE));
          });
    }
  }
};
</script>
<style lang="scss">
body {
  font-family: arial, helvetica, sans-serif;
  color: black;
  font-size: 10pt;
}
body.miku {
  background: #d2ffee;
}
main.miku {
  background: url("./assets/fade-miku.png") top repeat-x;
}

body.wife {
  background: #d1e1e6;
}
/* main.wife {
  // background: url("./assets/fade-miku.png") top repeat-x;

} */
</style>

<template>
  <components
    :is="currentSpaceTheme"
    :loginState="loginState"
    :userInfo="userInfo"
    :taInfo="taInfo"
    :postCollections="postCollections"
    :userPosts="userPosts"
    :fans="fans"
    :attentions="attentions"
    :isMySpace="isMySpace"
    :getUserById="getUserById"
    :getUserPost="getUserPost"
    :getUserCollect="getUserCollect"
    :getFollow="getFollow"
    :getFollowed="getFollowed"
    :follow="follow"
    :cancelFollow="cancelFollow"
  ></components>
</template>

<script>
import storage from "store";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import { getUserCollect } from "@/api/post-collect";
import { getUserPost, getAllUserPost } from "@/api/post";
import { getUserById } from "@/api/user-manage";
import { getFollow, getFollowed, follow, cancelFollow } from "@/api/follow";
import { MIKU_THEME_NAME, WIFE_THEME_NAME } from "@/config/theme/types.js";
const SpaceThemeComponentMap = {
  [MIKU_THEME_NAME]: "MikuSpace",
  [WIFE_THEME_NAME]: "WifeSpace"
};
export default {
  name: "Space",
  components: {
    MikuSpace: () => import("./themes/Miku.vue"),
    WifeSpace: () => import("./themes/Wife.vue")
  },
  inject: ["app"],
  data() {
    return {
      loginState: storage.get(LOGIN_STATE) || 0,
      userInfo: storage.get(USER_INFO) || null,
      taInfo: {
        avatar: ""
      },
      postCollections: [],
      userPosts: [],
      fans: [],
      attentions: []
    };
  },
  computed: {
    currentSpaceTheme() {
      let result = "";
      const currentTheme = this.app.currentTheme;
      if (currentTheme in SpaceThemeComponentMap) {
        result = SpaceThemeComponentMap[currentTheme];
      }
      return result;
    },
    isMySpace() {
      return this.userInfo && this.userInfo.id === this.$route.params.id;
    }
  },
  created() {
    this.$bus.$on("login-state-change", () => {
      this.loginState = storage.get(LOGIN_STATE) || 0;
      this.userInfo = storage.get(USER_INFO) || null;
    });

    this.getUserPost();
    this.getFollow();
    this.getFollowed();
  },
  mounted() {
    !this.isMySpace && this.getUserById();
  },
  methods: {
    getUserById() {
      getUserById({ id: this.$route.params.id }).then(res => {
        this.taInfo = res.data;
      });
    },
    getUserPost() {
      storage.get(LOGIN_STATE) === 1
        ? this.isMySpace
          ? getUserPost(
              Object.assign(
                {},
                {
                  page: 1,
                  limit: 5
                }
              )
            ).then(res => {
              const { records } = { ...res.data };
              this.userPosts = records;
            })
          : getAllUserPost(
              Object.assign(
                {
                  userId: this.$route.params.id
                },
                {
                  page: 1,
                  limit: 5
                }
              )
            ).then(res => {
              const { records } = { ...res.data };
              this.userPosts = records;
            })
        : (this.plates = []);
    },
    getUserCollect() {
      storage.get(LOGIN_STATE) === 1 && this.isMySpace
        ? getUserCollect().then(res => {
            this.postCollections = res.data;
          })
        : (this.postCollections = []);
    },
    getFollow() {
      this.attentions = [];
      getFollow().then(res => {
        this.attentions = res.data.map(item => {
          this.$set(item, "_isFollowed", true);
          return item;
        });
      });
    },
    getFollowed() {
      this.fans = [];
      getFollowed().then(res => {
        this.fans = res.data;
      });
    },
    follow(item) {
      !item._isFollowed &&
        follow({ followId: item.id }).then(() => {
          const row = this.attentions.find(
            attention => attention.id === item.id
          );
          row && (row._isFollowed = true);
        });
    },
    cancelFollow(item) {
      item._isFollowed &&
        cancelFollow({ followId: item.id }).then(() => {
          const row = this.attentions.find(
            attention => attention.id === item.id
          );
          row && (row._isFollowed = false);
        });
    }
  }
};
</script>

<style></style>

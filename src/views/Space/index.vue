<template>
  <div>
    <t-dialog
      v-model="changeEmailDialogVisible"
      title="更换邮箱"
      type="confirm"
      @before-close="handleChangeEmailDialogBeforeClose"
    >
      <div class="text-left space-y-3 mt-2 py-4" v-if="userInfo">
        <t-alert variant="error" :show="updateUserInfoError">
          {{ updateUserInfoErrorMsg }}
        </t-alert>
        <t-input-group label="原邮箱">
          <p>{{ userInfo.email }}</p>
        </t-input-group>
        <t-input-group label="新邮箱">
          <t-input v-model="newUserInfo.email" type="text" />
        </t-input-group>
      </div>
    </t-dialog>
    <t-dialog
      v-model="changePhoneDialogVisible"
      title="更换手机"
      type="confirm"
      @before-close="handleChangePhoneDialogBeforeClose"
    >
      <div class="text-left space-y-3 mt-2 py-4" v-if="userInfo">
        <t-alert variant="error" :show="updateUserInfoError">
          {{ updateUserInfoErrorMsg }}
        </t-alert>
        <t-input-group label="原手机">
          <p>{{ userInfo.phone }}</p>
        </t-input-group>
        <t-input-group label="新手机">
          <t-input v-model="newUserInfo.phone" type="text" />
        </t-input-group>
      </div>
    </t-dialog>
    <t-dialog
      v-model="changePasswordDialogVisible"
      title="修改密码"
      type="confirm"
      @before-close="handleChangePasswordDialogBeforeClose"
    >
      <div class="text-left space-y-3 mt-2 py-4" v-if="userInfo">
        <t-alert variant="error" :show="updateUserInfoError">
          {{ updateUserInfoErrorMsg }}
        </t-alert>
        <t-input-group label="新密码">
          <t-input v-model="changePasswordForm.password" type="password" />
        </t-input-group>
        <t-input-group label="确认新密码">
          <t-input v-model="changePasswordForm.checkPass" type="password" />
        </t-input-group>
      </div>
    </t-dialog>
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
      :handleShowChangePasswordDialog="handleShowChangePasswordDialog"
      :handleShowChangeEmailDialog="handleShowChangeEmailDialog"
      :handleShowChangePhoneDialog="handleShowChangePhoneDialog"
    ></components>
  </div>
</template>

<script>
import storage from "store";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import { getUserCollect } from "@/api/post-collect";
import { getUserPost, getAllUserPost } from "@/api/post";
import { getUserById, updateUser } from "@/api/user-manage";
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
      newUserInfo: {
        avatar: "",
        id: "",
        email: "",
        phone: "",
        name: "",
        password: "",
        status: 0
      },
      changePasswordForm: {
        password: "",
        checkPass: ""
      },
      taInfo: {
        avatar: ""
      },
      postCollections: [],
      userPosts: [],
      fans: [],
      attentions: [],
      changeEmailDialogVisible: false,
      changePasswordDialogVisible: false,
      changePhoneDialogVisible: false,
      updateUserInfoError: false,
      updateUserInfoErrorMsg: ""
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
    this.getUserCollect();
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
    },
    handleShowChangePasswordDialog() {
      this.resetUpdateUserInfoError();
      this.copyUserinfoAsNewUserInfo();
      this.changePasswordForm.password = "";
      this.changePasswordForm.checkPass = "";
      this.changePasswordDialogVisible = true;
    },
    handleChangePasswordDialogBeforeClose({ cancel, reason }) {
      if (reason === "ok") {
        cancel();
        let validateResult = true;
        if (this.changePasswordForm.password === "") {
          validateResult = false;
          this.updateUserInfoError = true;
          this.updateUserInfoErrorMsg = "新密码不能为空";
        } else if (
          this.changePasswordForm.password === this.userInfo.password
        ) {
          validateResult = false;
          this.updateUserInfoError = true;
          this.updateUserInfoErrorMsg = "新密码不能与旧密码一致";
        } else if (
          this.changePasswordForm.password !== this.changePasswordForm.checkPass
        ) {
          validateResult = false;
          this.updateUserInfoError = true;
          this.updateUserInfoErrorMsg = "新密码与确认密码必须一致";
        }
        validateResult &&
          updateUser(
            Object.assign({}, this.newUserInfo, {
              password: this.changePasswordForm.password
            })
          )
            .then(() => {
              this.changePasswordDialogVisible = false;
              this.app.updateUserInfo();
            })
            .catch(e => {
              this.updateUserInfoError = true;
              this.updateUserInfoErrorMsg = e.message;
            });
      }
    },
    handleShowChangeEmailDialog() {
      this.resetUpdateUserInfoError();
      this.copyUserinfoAsNewUserInfo();
      this.changeEmailDialogVisible = true;
    },
    handleChangeEmailDialogBeforeClose({ cancel, reason }) {
      if (reason === "ok") {
        cancel();
        updateUser(this.newUserInfo)
          .then(() => {
            this.changeEmailDialogVisible = false;
            this.app.updateUserInfo();
          })
          .catch(e => {
            this.updateUserInfoError = true;
            this.updateUserInfoErrorMsg = e.message;
          });
      }
    },
    handleShowChangePhoneDialog() {
      this.resetUpdateUserInfoError();
      this.copyUserinfoAsNewUserInfo();
      this.changePhoneDialogVisible = true;
    },
    handleChangePhoneDialogBeforeClose({ cancel, reason }) {
      if (reason === "ok") {
        cancel();
        this.resetUpdateUserInfoError();
        updateUser(this.newUserInfo)
          .then(() => {
            this.changePhoneDialogVisible = false;
            this.app.updateUserInfo();
          })
          .catch(e => {
            this.updateUserInfoError = true;
            this.updateUserInfoErrorMsg = e.message;
          });
      }
    },
    copyUserinfoAsNewUserInfo() {
      const { avatar, id, email, phone, name, password, status } = {
        ...this.userInfo
      };
      this.newUserInfo = Object.assign({}, this.newUserInfo, {
        avatar,
        id,
        email,
        phone,
        name,
        password,
        status
      });
    },
    resetUpdateUserInfoError() {
      this.updateUserInfoError = false;
      this.updateUserInfoErrorMsg = "";
    }
  }
};
</script>

<style></style>

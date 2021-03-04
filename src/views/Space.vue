<template>
  <div>
    <div class="w-8/12 mx-auto mt-8" v-if="userInfo">
      <div>
        <h3 class="bg-miku-1100 py-1 px-2">个人信息</h3>
        <div class="bg-gray-50 py-2 px-6">
          <div class="group w-16 h-16 mx-auto cursor-pointer  relative">
            <img
              class="w-16 h-16 rounded-full"
              :src="$imgURL + this.userInfo.avatar"
              alt=""
            />
            <div
              class="group-hover:opacity-100 opacity-0 transition-opacity duration-200 w-16 h-16 bg-black bg-opacity-60 text-center text-gray-100 absolute top-0 left-0  rounded-full "
              style="line-height:4rem;"
              @click="handleChangeAvatar"
            >
              更换头像
            </div>
            <input
              ref="avatarUpload"
              type="file"
              name="file"
              accept="image/*"
              id="upload"
              @change="updateAvatar"
            />
            <!-- class="hidden" -->
          </div>
          <p class="text-center">
            {{ userInfo.name }}
          </p>
        </div>
      </div>
      <div>
        <h3 class="bg-miku-1100 py-1 px-2">
          我的帖子<span class="hover:text-red-500 cursor-pointer float-right"
            >[更多]</span
          >
        </h3>
        <div class=" bg-gray-50">
          <t-table
            :headers="['标题', '板块', '分类', '时间']"
            :data="userPosts"
          >
            <template v-slot:row="props">
              <tr :class="[props.trClass]">
                <td :class="props.tdClass">
                  <router-link
                    :to="{ name: 'Post', params: { id: props.row.id } }"
                    class="text-gray-800 hover:text-red-500 text-sm"
                  >
                    {{ props.row.title }}</router-link
                  >
                </td>
                <td :class="props.tdClass">{{ props.row.postPlate.name }}</td>
                <td :class="props.tdClass">
                  {{ props.row.postCategory.name }}
                </td>
                <td :class="props.tdClass">{{ props.row.createTime }}</td>
              </tr>
            </template>
            <template v-if="!userPosts.length" v-slot:tbody="props">
              <tbody :class="props.tbodyClass">
                <tr :class="[props.trClass, 'text-center']">
                  <td :class="props.tdClass" colspan="4">
                    暂无数据
                  </td>
                </tr>
              </tbody>
            </template>
          </t-table>
        </div>
      </div>
      <div v-if="isMySpace">
        <h3 class="bg-miku-1100 py-1 px-2">
          我的收藏<span class="hover:text-red-500 cursor-pointer float-right"
            >[更多]</span
          >
        </h3>
        <div class=" bg-gray-50">
          <t-table
            :headers="['标题', '板块', '分类', '时间']"
            :data="postCollections"
          >
            <template v-slot:row="props">
              <tr :class="[props.trClass]">
                <td :class="props.tdClass">
                  <router-link
                    :to="{ name: 'Post', params: { id: props.row.id } }"
                    class="text-gray-800 hover:text-red-500 text-sm"
                  >
                    {{ props.row.title }}</router-link
                  >
                </td>
                <td :class="props.tdClass">{{ props.row.postPlate.name }}</td>
                <td :class="props.tdClass">
                  {{ props.row.postCategory.name }}
                </td>
                <td :class="props.tdClass">{{ props.row.createTime }}</td>
              </tr>
            </template>
            <template v-if="!postCollections.length" v-slot:tbody="props">
              <tbody :class="props.tbodyClass">
                <tr :class="[props.trClass, 'text-center']">
                  <td :class="props.tdClass" colspan="4">
                    暂无数据
                  </td>
                </tr>
              </tbody>
            </template>
          </t-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "store";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import { getUserCollect } from "@/api/post-collect";
import { getUserPost, getAllUserPost } from "@/api/post";

export default {
  name: "Space",
  data() {
    return {
      loginState: storage.get(LOGIN_STATE) || 0,
      userInfo: storage.get(USER_INFO) || null,
      postCollections: [],
      userPosts: []
    };
  },
  computed: {
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
  },
  methods: {
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
    handleChangeAvatar() {
      this.$refs.avatarUpload && this.$refs.avatarUpload.click();
    },
    getUserCollect() {
      storage.get(LOGIN_STATE) === 1 && this.isMySpace
        ? getUserCollect().then(res => {
            this.postCollections = res.data;
          })
        : (this.postCollections = []);
    },
    updateAvatar(e) {
      console.log(e, "e");
      this.$refs.avatarUpload.files && this.$refs.avatarUpload.files[0];

      // URL.createObjectURL()
    }
  }
};
</script>

<style></style>

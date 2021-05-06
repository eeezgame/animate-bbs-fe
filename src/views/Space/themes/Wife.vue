<template>
  <div>
    <div class="w-8/12 mx-auto mt-8 space-y-3" v-if="userInfo">
      <div v-if="isMySpace">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card header="个人信息">
          <div class="py-2 px-6">
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
                class="hidden"
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
            <div class="mx-auto flex" style="width: 300px;">
              <span class="flex-1 text-center cursor-pointer hover:text-red-500"
                >关注:{{ attentions.length }}</span
              >
              <span class="flex-1 text-center cursor-pointer hover:text-red-500"
                >粉丝:{{ fans.length }}</span
              >
              <span class="flex-1 text-center">积分:{{ userInfo.points }}</span>
            </div>
          </div>
          <div class="w-full mx-auto my-8 space-y-8">
            <div class="flex" style="height: 18px;">
              <div class="w-5/12 pl-8 flex space-x-2">
                <span class="safe-icon"></span><span>邮箱</span>
              </div>
              <div class="w-5/12">{{ userInfo.email }}</div>
              <a
                class="w-2/12 text-blue-500 hover:text-blue-300 cursor-pointer"
                @click="handleShowChangeEmailDialog"
                >更换邮箱</a
              >
            </div>
            <div class="flex" style="height: 18px;">
              <div class="w-5/12 pl-8 flex space-x-2">
                <span class="safe-icon"></span><span>联系方式</span>
              </div>
              <div class="w-5/12">{{ userInfo.phone }}</div>
              <a
                class="w-2/12 text-blue-500 hover:text-blue-300 cursor-pointer"
                @click="handleShowChangePhoneDialog"
                >更换手机</a
              >
            </div>
            <div class="flex" style="height: 18px;">
              <div class="w-5/12 pl-8 flex space-x-2">
                <span class="safe-icon"></span><span>设置密码</span>
              </div>
              <div class="w-5/12">已设置</div>
              <a
                class="w-2/12 text-blue-500 hover:text-blue-300 cursor-pointer"
                @click="handleShowChangePasswordDialog"
              >
                修改密码
              </a>
            </div>
          </div>
        </t-card>
      </div>
      <div v-if="!isMySpace">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card header="TA的信息">
          <div class="bg-gray-50 py-2 px-6">
            <div class="group w-16 h-16 mx-auto cursor-pointer  relative">
              <img
                class="w-16 h-16 rounded-full"
                :src="$imgURL + this.taInfo.avatar"
                alt=""
              />
            </div>
            <p class="text-center">
              {{ taInfo.name }}
            </p>
          </div>
        </t-card>
      </div>
      <div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card>
          <template v-slot:header>
            <h3>
              {{ isMySpace ? "我" : "TA" }}的帖子<span
                class="hover:text-red-500 cursor-pointer float-right"
                >[更多]</span
              >
            </h3>
          </template>
          <div class="bg-gray-50">
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
        </t-card>
      </div>
      <div v-if="isMySpace">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card>
          <template v-slot:header>
            <h3>
              {{ isMySpace ? "我" : "TA" }}的收藏<span
                class="hover:text-red-500 cursor-pointer float-right"
                >[更多]</span
              >
            </h3>
          </template>
          <div>
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
        </t-card>
      </div>
      <div v-if="isMySpace">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card>
          <template v-slot:header>
            <h3>
              {{ isMySpace ? "我" : "TA" }}的关注<span
                class="hover:text-red-500 cursor-pointer float-right"
                >[更多]</span
              >
            </h3>
          </template>
          <div>
            <t-table :headers="['头像', '名称', '操作']" :data="attentions">
              <template v-slot:row="props">
                <tr :class="[props.trClass]">
                  <td :class="props.tdClass">
                    <router-link
                      :to="{ name: 'Post', params: { id: props.row.id } }"
                      class="text-gray-800 hover:text-red-500 text-sm"
                    >
                      <img
                        :src="$imgURL + props.row.avatar"
                        alt=""
                        class="w-4 h-4"
                    /></router-link>
                  </td>
                  <td :class="props.tdClass">{{ props.row.name }}</td>
                  <td :class="props.tdClass">
                    <button
                      v-if="props.row._isFollowed"
                      class="bg-gray-300 text-gray-600 hover:text-red-500 px-2 rounded"
                      @click="cancelFollow(props.row)"
                    >
                      取消关注
                    </button>
                    <button
                      v-else
                      class="bg-white border border-miku-1000 text-gray-600 hover:text-miku-400 px-2 rounded"
                      @click="follow(props.row)"
                    >
                      关注
                    </button>
                  </td>
                </tr>
              </template>
              <template v-if="!attentions.length" v-slot:tbody="props">
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
        </t-card>
      </div>
      <div v-if="isMySpace">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        ></div>
        <t-card>
          <template v-slot:header>
            <h3>
              {{ isMySpace ? "我" : "TA" }}的粉丝<span
                class="hover:text-red-500 cursor-pointer float-right"
                >[更多]</span
              >
            </h3>
          </template>
          <div>
            <t-table :headers="['头像', '名称']" :data="fans">
              <template v-slot:row="props">
                <tr :class="[props.trClass]">
                  <td :class="props.tdClass">
                    <router-link
                      :to="{ name: 'Post', params: { id: props.row.id } }"
                      class="text-gray-800 hover:text-red-500 text-sm"
                    >
                      <img
                        :src="$imgURL + props.row.avatar"
                        alt=""
                        class="w-4 h-4"
                    /></router-link>
                  </td>
                  <td :class="props.tdClass">{{ props.row.name }}</td>
                </tr>
              </template>
              <template v-if="!fans.length" v-slot:tbody="props">
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
        </t-card>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "@/api/upload";
import { updateUser } from "@/api/user-manage";
export default {
  props: [
    "loginState",
    "userInfo",
    "taInfo",
    "postCollections",
    "userPosts",
    "fans",
    "attentions",
    "isMySpace",
    "getUserById",
    "getUserPost",
    "getUserCollect",
    "getFollow",
    "getFollowed",
    "follow",
    "cancelFollow",
    "handleShowChangeEmailDialog",
    "handleShowChangePhoneDialog",
    "handleShowChangePasswordDialog"
  ],
  methods: {
    handleChangeAvatar() {
      this.$refs.avatarUpload && this.$refs.avatarUpload.click();
    },
    updateAvatar() {
      this.$refs.avatarUpload.files && this.$refs.avatarUpload.files[0];
      let fd = new FormData();
      fd.append("file", this.$refs.avatarUpload.files[0]);
      uploadImage(fd).then(res => {
        updateUser(
          Object.assign({}, this.userInfo, {
            avatar: res.data,
            lastLoginTime: void 0
          })
        ).then(() => {
          this.userInfo.avatar = res.data;
        });
      });
    }
  }
};
</script>

<style scoped>
.safe-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxRURGMkVFRTA5MjExRTY5MUE4QTdEQTA0MUZDODExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxRURGMkVGRTA5MjExRTY5MUE4QTdEQTA0MUZDODExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjFFREYyRUNFMDkyMTFFNjkxQThBN0RBMDQxRkM4MTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjFFREYyRURFMDkyMTFFNjkxQThBN0RBMDQxRkM4MTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75ocM0AAABf0lEQVR42mL02NvGgAU4AXE4lJaDij0C4n1AvAqI96JrYEHjawDxdCB2wGK4ChSnAfEBIM4E4hswSSYkhfZAfAqHIejAAarWHt0gkEs2AjEvA/GAF6pHA2YQIxDPB2J+BtIBP1QvI8ggZyC2YCAfgPQ6gwwKI1YHNws7Q4dhFEOvcSy6VBgTNIqJMqTFIJxBX1Aea3IBGSSLLDLBJJ5hmlkygxAbD4YhGnzSDHc+v2BouLQG3SBZkEE/YTxGqCZFHjGGTqMosGHohlRdWMHw+fd3DCcxAlM2KFGpwwTEOPgZOoHhIMEpwPDk21uGL39+EDQECO4xQRMWHLz68ZGh/PwyhhffPzDIcAkTYwgIHAUZtBRdFGbYY6CLbn56RsgQEFgC8hooaI5RkJZOALEVyEX/gTgRiD+SYQhITxLIDFheAwW4PxB/JsGQz1A919Fz/0EgNoM6lRjvmEH1YC2PQC6zAmJXIA6B5kNQgv0FxI+B+DAQg1LjbmiQwAFAgAEA/XR0Tmys6bMAAAAASUVORK5CYII=)
    no-repeat;
}
</style>

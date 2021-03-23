<template>
  <div class="mb-12" style="">
    <reply-drawer ref="relpyDrawer" @on-submit="replyPost"></reply-drawer>
    <div class="p-2 sm:w-11/12 md:w-10/12 lg:w-8/12 mx-auto ">
      <t-card class="py-2 mb-16" style="min-height:308px;">
        <p class="">
          <span
            class="h-6 w-6 cursor-pointer float-right"
            @click="postInfo.collected ? postCancelCollect() : postCollect()"
          >
            <svg
              t="1614671347711"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3197"
              :fill="postInfo.collected ? 'yellow' : 'gray'"
            >
              <path
                d="M815.784 1019.361c0.244 1.632-0.729 2.299-2.162 1.481L508.337 846.937c-1.434-0.817-3.799-0.853-5.256-0.078l-309.94 164.568c-1.457 0.774-2.413 0.078-2.123-1.546l63.752-357.768c0.29-1.624-0.405-3.931-1.542-5.126L7.853 389.293c-1.138-1.195-0.731-2.355 0.903-2.579l344.573-47.072c1.635-0.224 3.565-1.619 4.29-3.102L516.008 12.592c0.725-1.482 1.876-1.466 2.559 0.036l149.351 328.618c0.683 1.502 2.572 2.954 4.2 3.227l343.14 57.51c1.628 0.273 2 1.446 0.828 2.608L763.644 654.723c-1.172 1.161-1.931 3.446-1.687 5.078l53.827 359.56z"
                p-id="3198"
              ></path>
            </svg>
          </span>
        </p>
        <h1 class="text-center p-6 text-yellow-900 font-extrabold text-5xl">
          {{ postInfo.title }}
        </h1>
        <p class="h-4 text-right space-x-0.5">
          <span class="">
            {{
              postInfo.adopted === 1
                ? `🙏待采纳`
                : postInfo.adopted === 3
                ? `✅已采纳`
                : ""
            }}</span
          >
          <span>
            {{
              postInfo.adopted === 1
                ? `💰${postInfo.adoptedPoints}`
                : postInfo.adopted === 3
                ? `💰${postInfo.adoptedPoints}`
                : ""
            }}
          </span>
          <span
            @click="$refs.relpyDrawer.open = true"
            class="cursor-pointer hover:text-red-500"
            >[回复]</span
          >
        </p>
        <div class="flex" v-if="postInfo.user">
          <popper
            trigger="hover"
            :options="{
              placement: 'top-start',
              modifiers: { offset: { offset: '2rem,1rem' } }
            }"
            @show="onFloorMasterUserCardShow(postInfo)"
          >
            <div class="popper">
              <t-card>
                <div style="width: 300px" class="flex">
                  <img
                    :src="$imgURL + postInfo.user.avatar"
                    :alt="postInfo.user.name"
                    class="h-10 w-10 rounded-full"
                  />
                  <div
                    style="height: 100px"
                    class="w-full text-left px-2 space-y-2"
                  >
                    <p>
                      <span
                        class="cursor-pointer text-miku-700 hover:text-miku-400 font-bold text-lg"
                      >
                        {{ postInfo.user.name }}
                      </span>
                    </p>

                    <p v-if="postInfo.user && '_isFollowed' in postInfo.user">
                      <button
                        v-if="!postInfo.user._isFollowed"
                        class="w-16 px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-400"
                        @click="followFloorMaster(postInfo.userId)"
                      >
                        关注
                      </button>
                      <button
                        v-else
                        class="w-32 px-2 py-1 bg-gray-500 text-gray-100 font-bold rounded"
                        @click="cancelFollowFloorMaster(postInfo.userId)"
                      >
                        取消关注
                      </button>
                    </p>
                  </div>
                </div>
              </t-card>
            </div>

            <span slot="reference">
              <img
                :src="$imgURL + postInfo.user.avatar"
                :alt="postInfo.name"
                class="w-16 h-16"
              />
            </span>
          </popper>

          <div class="px-2">
            <div class="w-full">
              {{ postInfo.user.name
              }}<span class="float-right">{{ postInfo.createTime }}</span>
            </div>
            <div v-html="postInfo.postContent"></div>
          </div>
        </div>
      </t-card>
      <template v-for="item in postReplyList">
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full"
          :key="item.id + 'bar1'"
        ></div>
        <div
          class="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          :key="item.id + '-bar2'"
        ></div>
        <t-card
          class="relative mb-3 wife-post bg-opacity-50"
          :class="[item.adopted === 1 ? 'bg-yellow-100' : 'bg-white']"
          :key="item.id"
        >
          <p v-if="item.adopted === 1" class="absolute -top-6 -right-4 ">
            <img
              class="w-8 h-8 transform rotate-45"
              src="@/assets/miku_happy.png"
              alt="已采纳"
            />
          </p>
          <p v-if="item.adopted === 1" class="mb-2">
            <span class="font-bold text-lg">🏅最佳回复 </span
            ><span>Yes,I am!</span>
          </p>

          <div class="flex w-full " style="min-height:408px;">
            <div
              class="border-r border-dashed border-indigo-300"
              style="width:200px;"
            >
              <popper
                trigger="hover"
                :options="{
                  placement: 'top-start',
                  modifiers: { offset: { offset: '2rem,1rem' } }
                }"
                @show="onFloorUserCardShow(item)"
              >
                <div class="popper">
                  <t-card>
                    <div style="width: 300px" class="flex">
                      <img
                        :src="$imgURL + item.user.avatar"
                        :alt="item.user.name"
                        class="h-10 w-10 rounded-full"
                      />
                      <div
                        style="height: 100px"
                        class="w-full text-left px-2 space-y-2"
                      >
                        <p>
                          <span
                            class="cursor-pointer text-miku-700 hover:text-miku-400 font-bold text-lg"
                          >
                            {{ item.user.name }}
                          </span>
                        </p>
                        <p>
                          <button
                            v-if="!item._isFollowed"
                            class="w-16 px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-400"
                            @click="followLouxia(item)"
                          >
                            关注
                          </button>
                          <button
                            v-else
                            class="w-32 px-2 py-1 bg-gray-500 text-gray-100 font-bold rounded"
                            @click="cancelFollowLouxia(item)"
                          >
                            取消关注
                          </button>
                        </p>
                      </div>
                    </div>
                  </t-card>
                </div>

                <template slot="reference">
                  <img
                    class="w-16 h-16 mx-auto"
                    :src="$imgURL + item.user.avatar"
                    :alt="item.user.name"
                  />
                </template>
              </popper>
              <div />
              <div
                class="mt-2 mx-2 p-1 border border-indigo-200 bg-gray-100 space-y-1 "
              >
                <p
                  class=" font-bold text-lg text-blue-600 hover:underline cursor-pointer"
                >
                  {{ item.user.name }}
                </p>

                <p class="overflow-hidden whitespace-nowrap overflow-ellipsis">
                  UID:{{ item.userId }}
                </p>
                <pet-dio></pet-dio>
                <p>今日的心情:</p>
                <p>赛高尼,high！</p>
              </div>
            </div>
            <div class="px-2 w-full flex flex-col">
              <div>
                <span
                  class="cursor-pointer text-miku-700 hover:text-miku-400 font-bold text-lg"
                >
                  {{ item.user.name }}
                </span>
                <span class="float-right">#{{ item.floor }}</span>
              </div>
              <div class="pl-4 py-1" v-html="item.content"></div>
              <div class="text-sm mt-auto">
                <span class="text-gray-500">{{ item.createTime }}</span>
                <span
                  v-if="
                    postInfo.adopted !== 3 &&
                      postInfo.adopted === 1 &&
                      userInfo.id !== item.userId &&
                      userInfo.id === postInfo.userId
                  "
                  class="float-right cursor-pointer hover:text-red-500"
                  @click="handleAdopt(item.id)"
                  >[采纳]</span
                >
                <span
                  class="float-right cursor-pointer hover:text-red-500"
                  @click="
                    item.liked ? replyCancelLike(item.id) : replyLike(item.id)
                  "
                  >[{{ item.liked ? "已点赞" : "点赞" }}
                  {{ item.likeNums > 0 ? item.likeNums : "" }}]</span
                >
              </div>
            </div>
          </div>
        </t-card>
      </template>
    </div>
  </div>
</template>

<script>
import { replyPost } from "@/api/post";
import ReplyDrawer from "@/components/ReplyDrawer";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import PetDio from "@/components/Pets/Dio.vue";
export default {
  components: {
    ReplyDrawer,
    Popper,
    PetDio
  },
  props: [
    "postInfo",
    "postReplyList",
    "collected",
    "loginState",
    "userInfo",
    "handleAdopt",
    "adoptReply",
    "replyLike",
    "replyCancelLike",
    "postCollect",
    "postCancelCollect",
    "onFloorMasterUserCardShow",
    "followFloorMaster",
    "cancelFollowFloorMaster",
    "onFloorUserCardShow",
    "followLouxia",
    "cancelFollowLouxia",
    "fetchData"
  ],
  methods: {
    replyPost({ content }) {
      replyPost({
        postId: this.$route.params.id,
        content
      }).then(res => {
        this.$refs.relpyDrawer.open = false;
        this.$refs.relpyDrawer.$refs.editor.setContent("");
        this.fetchData();

        console.log(res, "res");
      });
    }
  }
};
</script>

<style scoped>
.wife-post:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(../../../assets/wife.webp);
  background-repeat: repeat;
  filter: opacity(25%);
}
</style>

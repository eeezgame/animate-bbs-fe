<template>
  <div class="mb-12" style="">
    <reply-drawer ref="relpyDrawer" @on-submit="replyPost"></reply-drawer>
    <div
      class="p-2 sm:w-11/12 md:w-8/12 lg:w-6/12 mx-auto divide-y-2 divide-miku-900 divide-dotted"
    >
      <div class="p-2">
        <h1 class="text-center p-6 text-yellow-900 font-extrabold text-5xl">
          {{ postInfo.title }}
        </h1>
        <p class="h-4 text-right">
          <span class="">
            {{
              postInfo.adopted === 1
                ? `[待采纳][💰${postInfo.adoptedPoints}]`
                : postInfo.adopted === 3
                ? `[已采纳][💰${postInfo.adoptedPoints}]`
                : ""
            }}</span
          >
          <span
            @click="$refs.relpyDrawer.open = true"
            class="cursor-pointer hover:text-red-500"
            >[回复]</span
          >
        </p>
        <p>
          {{ postInfo.userId }} {{ postInfo.createTime }}
          <span class="float-right">#0</span>
        </p>
        <div v-html="postInfo.postContent"></div>
      </div>
      <div
        class="flex p-2"
        style="background: #B6DDDE;border-color: #8FCCCD;"
        v-for="item in postReplyList"
        :key="item.id"
      >
        <div class="h-16 w-16 ">
          <img :src="$imgURL + item.user.avatar" :alt="item.user.name" />
        </div>
        <div class="px-2 w-full">
          <div>
            <span
              class=" cursor-pointer text-miku-700 hover:text-miku-400 font-bold text-lg"
            >
              {{ item.user.name }}
            </span>
            <span class="float-right">#{{ item.floor }}</span>
          </div>
          <div class="pl-4 py-1" v-html="item.content"></div>
          <div class="text-sm">
            <span class="text-gray-500">{{ item.createTime }}</span>
            <span class="float-right cursor-pointer hover:text-red-500"
              >[采纳]</span
            >
            <span class="float-right cursor-pointer hover:text-red-500"
              >[点赞]</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById, replyPost } from "@/api/post";
import ReplyDrawer from "@/components/ReplyDrawer";
// import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
// import storage from "store";
export default {
  name: "Post",
  components: {
    ReplyDrawer
  },
  data() {
    return {
      postInfo: {},
      postReplyList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$route.params &&
        this.$route.params.id &&
        getPostById({ postId: this.$route.params.id }).then(res => {
          this.postInfo = res.data;
          const { postReplyList } = { ...res.data };
          this.postReplyList = postReplyList;
        });
    },
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

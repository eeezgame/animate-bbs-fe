<template>
  <div class="mb-12" style="">
    <reply-drawer ref="relpyDrawer" @on-submit="replyPost"></reply-drawer>

    <div
      class="p-2 sm:w-11/12 md:w-8/12 lg:w-6/12 mx-auto divide-y-2 divide-miku-900 divide-dotted"
    >
      <div class="p-2">
        <p class=" ">
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
                ? `/待采纳/`
                : postInfo.adopted === 3
                ? `/已采纳/`
                : ""
            }}</span
          >
          <span>
            {{
              postInfo.adopted === 1
                ? `/💰${postInfo.adoptedPoints}/`
                : postInfo.adopted === 3
                ? `/💰${postInfo.adoptedPoints}/`
                : ""
            }}
          </span>
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
            <span
              class="float-right cursor-pointer hover:text-red-500"
              @click="handleAdopt(item.id)"
              >[采纳]</span
            >
            <span
              class="float-right cursor-pointer hover:text-red-500"
              @click="replyLike(item.id)"
              >[点赞 {{ item.likeNums > 0 ? item.likeNums : "" }}]</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById, replyPost, replyAdopt, replyLike } from "@/api/post";
import { collect, cancelCollect } from "@/api/post-collect";

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
      postReplyList: [],
      collected: false
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
          this.postInfo = Object.assign({}, res.data, { collected: 0 });
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
    },
    handleAdopt(id) {
      this.$dialog
        .confirm({
          title: "采纳回答",
          text: "是否将该回答采纳为最佳答案?"
        })
        .then(result => {
          const { isOk } = { ...result };
          isOk && this.adoptReply(id);
        });
    },
    adoptReply(id) {
      replyAdopt({
        postId: this.$route.params.id,
        replyId: id
      });
    },
    handleLike() {},
    replyLike(id) {
      replyLike({
        replyId: id
      })
        .then(() => {
          const reply = this.postReplyList.find(reply => reply.id === id);
          reply && (reply.likeNums += 1);
        })
        .catch(e => {
          alert(e.message);
        });
    },
    postCollect() {
      this.postInfo.collected = 1;
      collect({ postId: this.$route.params.id })
        .then(res => {
          console.log(res);
          this.postInfo.collected = 1;
        })
        .catch(e => {
          console.log(e);
          this.postInfo.collected = 0;
        });
    },
    postCancelCollect() {
      this.postInfo.collected = 0;
      cancelCollect({ postId: this.$route.params.id })
        .then(res => {
          console.log(res);
          this.postInfo.collected = 0;
        })
        .catch(e => {
          console.log(e);
          this.postInfo.collected = 1;
        });
    }
  }
};
</script>

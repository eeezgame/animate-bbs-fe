<template>
  <div class="mb-12" style="">
    <reply-drawer></reply-drawer>
    <div
      class="p-2 sm:w-11/12 md:w-8/12 lg:w-6/12 mx-auto bg-white divide-y-2 divide-miku-900 divide-dotted"
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
          <span>[回复]</span>
          <span>[回复]</span>
        </p>
      </div>
      <div class="bg-white p-2">
        <p>
          {{ postInfo.userId }} {{ postInfo.createTime }}
          <span class="float-right">#1</span>
        </p>
        <div v-html="postInfo.postContent"></div>
      </div>
      <div class="p-2" v-for="i in 10" :key="i">
        <p>#{{ i }}</p>
        <p>nice nice</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById } from "@/api/post";
import ReplyDrawer from "@/components/ReplyDrawer";
export default {
  name: "Post",
  components: {
    ReplyDrawer
  },
  data() {
    return {
      postInfo: {}
    };
  },
  created() {
    this.$route.params &&
      this.$route.params.id &&
      getPostById({ postId: this.$route.params.id }).then(res => {
        this.postInfo = res.data;
      });
  }
};
</script>

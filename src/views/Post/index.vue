<template>
  <components
    :is="currentPostTheme"
    :postInfo="postInfo"
    :postReplyList="postReplyList"
    :collected="collected"
    :loginState="loginState"
    :userInfo="userInfo"
    :handleAdopt="handleAdopt"
    :adoptReply="adoptReply"
    :replyLike="replyLike"
    :replyCancelLike="replyCancelLike"
    :postCollect="postCollect"
    :postCancelCollect="postCancelCollect"
    :onFloorMasterUserCardShow="onFloorMasterUserCardShow"
    :followFloorMaster="followFloorMaster"
    :cancelFollowFloorMaster="cancelFollowFloorMaster"
    :onFloorUserCardShow="onFloorUserCardShow"
    :followLouxia="followLouxia"
    :cancelFollowLouxia="cancelFollowLouxia"
    :fetchData="fetchData"
  ></components>
</template>

<script>
import {
  getPostById,
  replyPost,
  replyAdopt,
  replyLike,
  cancelReplyLike
} from "@/api/post";
import { collect, cancelCollect } from "@/api/post-collect";
import { isFollow, Follow, CancelFollow } from "@/api/user";
// import ReplyDrawer from "@/components/ReplyDrawer";
// import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import { LOGIN_STATE, USER_INFO } from "@/store/mutation-types";
import { MIKU_THEME_NAME, WIFE_THEME_NAME } from "@/config/theme/types.js";
const PostThemeComponentMap = {
  [MIKU_THEME_NAME]: "MikuPost",
  [WIFE_THEME_NAME]: "WifePost"
};

import storage from "store";

export default {
  name: "Post",
  components: {
    // ReplyDrawer,
    // Popper,
    MikuPost: () => import("./themes/Miku.vue"),
    WifePost: () => import("./themes/Wife.vue")
  },
  inject: ["app"],
  data() {
    return {
      postInfo: {},
      postReplyList: [],
      collected: false,
      loginState: storage.get(LOGIN_STATE) || 0,
      userInfo: storage.get(USER_INFO) || null
    };
  },
  computed: {
    currentPostTheme() {
      let result = "";
      const currentTheme = this.app.currentTheme;
      if (currentTheme in PostThemeComponentMap) {
        result = PostThemeComponentMap[currentTheme];
      }
      return result;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$route.params &&
        this.$route.params.id &&
        getPostById({ postId: this.$route.params.id }).then(res => {
          this.postInfo = Object.assign({}, res.data, {
            user: {
              ...res.data.user,
              _isFollowed: false
            }
          });
          const { postReplyList } = { ...res.data };
          this.postReplyList = postReplyList.map(item => {
            this.$set(item, "_isFollowed", false);
            return item;
          });
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
    replyLike(id) {
      replyLike({
        replyId: id
      })
        .then(() => {
          const reply = this.postReplyList.find(reply => reply.id === id);
          if (reply) {
            reply.likeNums += 1;
            reply.liked = true;
          }
        })
        .catch(e => {
          alert(e.message);
        });
    },
    replyCancelLike(id) {
      cancelReplyLike({
        replyId: id
      })
        .then(() => {
          const reply = this.postReplyList.find(reply => reply.id === id);
          if (reply) {
            reply.likeNums -= 1;
            reply.liked = false;
          }
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
    },
    onFloorMasterUserCardShow(postInfo) {
      const { userId } = { ...postInfo };
      isFollow({ userTwo: userId }).then(res => {
        res.data === 0
          ? (this.postInfo.user._isFollowed = false)
          : res.data === 1
          ? (this.postInfo.user._isFollowed = true)
          : "";
      });
    },
    followFloorMaster(userId) {
      Follow({ followId: userId }).then(() => {
        this.postInfo.user._isFollowed = true;
      });
    },
    cancelFollowFloorMaster(userId) {
      CancelFollow({ followId: userId }).then(() => {
        this.postInfo.user._isFollowed = false;
      });
    },
    onFloorUserCardShow(replyInfo) {
      // const { id, userId } = { ...replyInfo };
      const replyItem = this.postReplyList.find(
        reply => reply.id == replyInfo.id
      );
      if (replyItem) {
        isFollow({ userTwo: replyInfo.userId }).then(res => {
          res.data === 0
            ? (replyItem._isFollowed = false)
            : res.data === 1
            ? (replyItem._isFollowed = true)
            : "";
        });
      }
    },
    followLouxia(replyInfo) {
      const replyItem = this.postReplyList.find(
        reply => reply.id == replyInfo.id
      );
      replyItem &&
        Follow({ followId: replyItem.userId }).then(() => {
          replyItem._isFollowed = true;
        });
    },
    cancelFollowLouxia(replyInfo) {
      const replyItem = this.postReplyList.find(
        reply => reply.id == replyInfo.id
      );
      replyItem &&
        CancelFollow({ followId: replyItem.userId }).then(() => {
          replyItem._isFollowed = false;
        });
    }
  }
};
</script>

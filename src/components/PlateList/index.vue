<template>
  <div class="w-full lg:w-8/12">
    <!-- <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-700 md:text-2xl">plate</h1>
      <div>
        <select
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option>Latest</option>
          <option>Last Week</option>
        </select>
      </div>
    </div> -->
    <div class="mb-6 divide-y">
      <div
        v-for="item in plates"
        :key="item.id"
        class="max-w-4xl px-3 py-2 bg-white rounded-sm shadow-md"
      >
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tbody>
            <tr>
              <td width="48" valign="top" align="center">
                <a href="/member/Index98"
                  ><img
                    :src="item.avatar"
                    class=" rounded-sm"
                    border="0"
                    align="default"
                    alt="Index98"
                /></a>
              </td>
              <td width="10"></td>
              <td width="auto" valign="middle">
                <span class="item_title"
                  ><a href="/t/749886#reply79" class="topic-link">{{
                    item.title
                  }}</a></span
                >
                <div class="sep5"></div>
                <span class="topic_info"
                  ><div class="votes"></div>
                  <strong
                    ><a href="/member/Index98">{{ item.authorName }}</a></strong
                  >
                  <!-- <span title="2021-01-31 15:43:58 +08:00">5 分钟前</span>
                  <strong><a href="/member/cmllwxxl">cmllwxxl</a></strong> -->
                </span>
              </td>
              <td width="70" align="right" valign="middle">
                <a href="/t/749886#reply79" class="count_livid">233</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex">
        <a
          href="#"
          class="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed"
        >
          上一页
        </a>
        <a
          href="#"
          class="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-miku-500 hover:text-white rounded-md"
        >
          1
        </a>
        <a
          href="#"
          class="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-miku-500 hover:text-white rounded-md"
        >
          2
        </a>
        <a
          href="#"
          class="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-miku-500 hover:text-white rounded-md"
        >
          3
        </a>
        <a
          href="#"
          class="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-miku-500 hover:text-white rounded-md"
        >
          下一页
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserPost } from "@/api/post";

let plates = new Array(10).fill({
  time: "Jun 1, 2020",
  label: "miku",
  title: "《进击的miku》中日字幕下载",
  shortContent:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
  avatar:
    "https://cdn.v2ex.com/gravatar/40184bd14ed53de97a6e2a665560896b?s=48&d=retro",
  authorName: "Runki"
});
export default {
  data() {
    return {
      plates: [],
      queryParam: {
        title: "进击的巨人",
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.plates = plates;
    this.getUserPost();
  },
  methods: {
    getUserPost() {
      getUserPost(this.queryParam).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style></style>

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
                    :src="$imgURL + item.user.avatar"
                    class=" rounded-sm"
                    border="0"
                    align="default"
                    alt="Index98"
                /></a>
              </td>
              <td width="10"></td>
              <td width="auto" valign="middle">
                <span class="item_title">
                  <router-link
                    :to="{ name: 'Post', params: { id: item.id } }"
                    class="text-gray-800 hover:text-red-500 text-sm"
                  >
                    {{
                      item.adopted === 1
                        ? `[待采纳][💰${item.adoptedPoints}]`
                        : item.adopted === 3
                        ? `[已采纳][💰${item.adoptedPoints}]`
                        : ""
                    }}
                    {{ item.title }}</router-link
                  ></span
                >
                <div class="sep5"></div>
                <span class="topic_info"
                  ><div class="votes"></div>
                  <strong
                    ><a href="/member/Index98">{{ item.user.name }}</a></strong
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

export default {
  data() {
    return {
      plates: [],
      queryParam: {
        title: "",
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.getUserPost();
  },
  methods: {
    getUserPost() {
      getUserPost(this.queryParam).then(res => {
        const { list } = { ...res.data };
        this.plates = list;
      });
    }
  }
};
</script>

<style></style>

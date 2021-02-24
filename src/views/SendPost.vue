<template>
  <div class="flex flex-col" style="height:calc(100vh - 1.5rem - 41px);">
    <form>
      <div class="shadow h-16">
        <div class="px-5">
          <div class="flex">
            <div class="mr-4">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >发布板块</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="h-8 space-y-0 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>漫画区</option>
                <option>资源区</option>
              </select>
            </div>
            <div class="mr-4">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >帖子分类</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="h-8 space-y-0 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>讨论帖</option>
                <option>求助帖</option>
              </select>
            </div>
            <div class=" float-right self-end ml-auto">
              <button
                class="h-8  px-8 py-1 bg-gray-100 text-black font-bold border border-gray-400 hover:bg-miku-100 "
                @click="onSubmit"
              >
                发布
              </button>
            </div>
            <!-- <div class="">
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <input
                type="text"
                name="first_name"
                id="first_name"
                autocomplete="given-name"
                class="h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
                class="h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="">
              <label
                for="email_address"
                class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <input
                type="text"
                name="email_address"
                id="email_address"
                autocomplete="email"
                class="h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div> -->
          </div>
        </div>
      </div>
    </form>
    <div class="flex px-5 space-x-8 mt-6">
      <div class="">
        <tinymce v-model="content" width="50vw" :height="600" />
      </div>
      <div
        style="width:50vw;border-color:#c5c5c5"
        class="bg-white shadow border"
      >
        <div v-html="content" />
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "SendPost",
  components: {
    Tinymce
  },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.content);
    }
  }
};
</script>

<style></style>

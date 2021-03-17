<template>
  <div class="w-full">
    <components
      :is="currentPostTheme"
      :plateOptions="plateOptions"
      :queryParam.sync="queryParam"
      :listQuery.sync="listQuery"
      :postCategoryOptions="postCategoryOptions"
      :plates="plates"
      :total="total"
      :getAllUserPost="getAllUserPost"
      :loginState="loginState"
    ></components>
  </div>
</template>

<script>
import { getAllUserPost } from "@/api/post";
import { LOGIN_STATE } from "@/store/mutation-types";
import storage from "store";
import { getPostPlateList } from "@/api/post-plate";
import { getPostCategoryList } from "@/api/post-category";
import { MIKU_THEME_NAME, WIFE_THEME_NAME } from "@/config/theme/types.js";
// import Loading from "./modules/Loading";
const PostThemeComponentMap = {
  [MIKU_THEME_NAME]: "MikuPost",
  [WIFE_THEME_NAME]: "WifePost"
};

export default {
  inject: ["app"],
  components: {
    MikuPost: () => ({
      component: import("./themes/Miku.vue")
    }),
    WifePost: () => import("./themes/Wife.vue")
  },
  data() {
    return {
      plates: [],
      postCategoryOptions: [],
      plateOptions: [],
      queryParam: {
        title: "",
        categoryId: "",
        plateId: ""
      },
      listQuery: {
        page: 1,
        limit: 5
      },
      total: 0,
      loginState: storage.get(LOGIN_STATE) || 0
    };
  },
  created() {
    this.getAllUserPost();
    this.getPostPlateList();
    this.getPostCategoryList();
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
  mounted() {
    this.$bus.$on("login-state-change", state => {
      this.getAllUserPost();
      this.getPostPlateList();
      this.getPostCategoryList();
      this.loginState = state;
    });
  },
  methods: {
    getAllUserPost() {
      storage.get(LOGIN_STATE) === 1
        ? getAllUserPost(
            Object.assign({}, this.queryParam, this.listQuery)
          ).then(res => {
            const { records, total } = { ...res.data };
            this.plates = records;
            this.total = total;
          })
        : (this.plates = []);
    },
    getPostPlateList() {
      storage.get(LOGIN_STATE) === 1
        ? getPostPlateList({}).then(res => {
            const { data } = { ...res };
            this.plateOptions = data;
          })
        : (this.plateOptions = []);
    },
    getPostCategoryList() {
      storage.get(LOGIN_STATE) === 1
        ? getPostCategoryList({}).then(res => {
            const { data } = { ...res };
            this.postCategoryOptions = data;
          })
        : (this.postCategoryOptions = []);
    },
    handleCurrentChange() {
      this.getAllUserPost();
    }
  }
};
</script>

<style lang="scss" scoped></style>

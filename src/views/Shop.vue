<template>
  <div>
    <div class="flex justify-around p-16">
      <div v-for="item in items" :key="item.id" class="w-5/12">
        <t-card variant="miku">
          <div
            class="relative flex cursor-pointer item-container bg-miku-1000"
            @click="handleBuyGood(item)"
          >
            <div
              style="height: 233px;width: 175px;flex-basis: 175px;"
              class="relative"
            >
              <img
                :src="$imgURL + item.image"
                alt="商品图"
                class="item-image absolute border border-gray-400 rounded-md transition-all transform"
                style="height: 233px;width: 175px;"
              />
            </div>
            <div class="p-2 space-x-1 flex flex-col">
              <h2 class="font-bold ">{{ item.name }}</h2>
              <p>{{ item.remark }}</p>
              <p class="mt-auto">💰{{ item.points }}</p>
            </div>
          </div>
        </t-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodList } from "@/api/good";
import { createOrder } from "@/api/order";

export default {
  name: "Shop",
  data() {
    return {
      items: [],
      listQuery: {
        page: 1,
        limit: 5
      }
    };
  },
  created() {
    getGoodList(this.listQuery).then(res => {
      this.items = res.data.records;
    });
  },
  methods: {
    handleBuyGood(good) {
      this.$dialog
        .confirm({
          title: "积分商品兑换",
          text: `是否花费💰${good.points}兑换该商品?`
        })
        .then(result => {
          const { isOk } = { ...result };
          isOk &&
            createOrder({ goodId: good.id }).then(res => {
              console.log(res, "res");
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.item-container {
  .item-image {
    bottom: 2rem;
  }
  &:hover {
    .item-image {
      bottom: 3rem;
    }
  }
}
</style>

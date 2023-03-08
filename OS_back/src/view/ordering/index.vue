<template>
  <div class="orderingBox h-full w-full">
    <div class="flex h-full w-full space-x-4 pt-4">
      <!-- 购物车 / 结算 -->
      <div class=" w-1/4 box-border bg-white rounded-sm relative">
        <div
          class="flex justify-between items-center border-b p-5 bg-gray-200 h-24 absolute left-0 top-0 w-full z-10"
        >
          <span class=" text-m font-bold ">用餐人数:</span>
          <template>
            <el-input-number
              v-model="number"
              :min="1"
              size="mini"
            ></el-input-number>
          </template>
        </div>

        <!-- 菜 -->
        <div class="flex flex-col pr-5 pl-5 pt-24 pb-20 h-full overflow-auto">
          <div
            v-for="c_goods in goodsCart"
            :key="c_goods._id"
            class="flex justify-between  mt-3 mb-3 pb-3 border-b items-end"
          >
            <div>
              <p class="goodsName text-l font-bold">{{ c_goods.goodsName }}</p>
              <!-- TODO -->
              <p class="goodsdes text-sm">
                {{ c_goods.goodsType.gt_specifications[0].value }}
              </p>
              <p class="goodsPrice text-sm text-red-500">
                ${{ c_goods.goodsPrice }}元
              </p>
            </div>

            <div class="flex w-1/2">
              <el-button
                icon="el-icon-plus"
                size="mini"
                @click="changeGoodsCount(c_goods._id, 1)"
              ></el-button>
              <el-input
                v-model="c_goods.goodsCount"
                size="mini"
                :disabled="true"
              ></el-input>
              <el-button
                icon="el-icon-minus"
                size="mini"
                @click="changeGoodsCount(c_goods._id, -1)"
              ></el-button>
            </div>
            <el-button
              icon="el-icon-delete"
              size="mini"
              @click="removeGoodsCart(c_goods)"
            ></el-button>
          </div>
        </div>

        <!-- 结算 -->
        <div
          class=" absolute bottom-0 left-0 border-t h-20 w-full bg-gray-200 p-4 flex items-center z-10"
        >
          <p class="w-1/2 ">
            结算金额:
            <span class=" text-xl font-bold">{{ totalAmount }}</span> 元
          </p>
          <el-button type="primary" class="flex-1">结算</el-button>
        </div>
      </div>
      <!-- 点餐区域 -->
      <div class=" w-3/4 box-border bg-white rounded-sm p-5 relative">
        <div
          class="w-full flex items-center justify-between absolute top-0 z-10 bg-white left-0 h-20 pl-5 pr-5 shadow-sm"
        >
          <div class="space-x-4">
            <el-tag
              @click="changeGC('全部商品')"
              class=" cursor-pointer"
              :type="currentGoodsCategory === '全部商品' ? '' : 'info'"
              >全部菜单</el-tag
            >
            <el-tag
              @click="changeGC(gc)"
              class=" cursor-pointer"
              v-for="gc in goodsCategoryInfo"
              :key="gc"
              :type="currentGoodsCategory === gc ? '' : 'info'"
              >{{ gc }}</el-tag
            >
          </div>
          <div class="flex">
            <el-input
              v-model="searchText"
              size="mini"
              ref="searchText"
            ></el-input>
            <el-button size="mini" @click="searchHandel">搜索</el-button>
          </div>
        </div>

        <div
          class="goodsList w-full max-h-full overflow-auto flex flex-wrap pt-20 "
        >
          <div
            class="goods w-1/6 box-border p-5 flex flex-col items-center cursor-pointer bg-gray-50 hover:shadow-md duration-300"
            @click="insertGoods(goods)"
            v-for="(goods, i) in goodsInfo"
            :key="i"
          >
            <img alt="" srcset="" />
            <img
              :src="
                goods.goodsImgs[0] ||
                  require('../../public/images/defaultFood.png')
              "
              alt=""
              class="pb-2 cursor-pointer"
            />
            <p class="pb-2">{{ goods.goodsName }}</p>
            <p class="text-red-500">${{ goods.goodsPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1, // 用餐人数
      cat: [], //购物车
      currentGoodsCategory: "全部商品", //当前的商品分类
      searchText: "", //搜索的关键词
      isSearch: false //表示当前是否处于搜索状态
    };
  },
  computed: {
    goodsInfo() {
      //全部商品
      if (this.isSearch) {
        return this.$store.state.goodsInfo.filter(goods => {
          return goods.goodsName.includes(this.searchText);
        });
      }
      if (this.currentGoodsCategory === "全部商品") {
        return this.$store.state.goodsInfo;
      } else {
        let gc_obj = this.$store.state.goodsCategoryInfo.find(item => {
          return item.gc_name === this.currentGoodsCategory;
        });
        return gc_obj && gc_obj.goodsInfo;
      }
    },
    goodsCategoryInfo() {
      // 全部分类
      let res = this.$store.state.goodsCategoryInfo.map(item => {
        return item.gc_name;
      });
      return res;
    },
    goodsCart() {
      return this.$store.getters.goodsCart;
    },
    totalAmount() {
      // 商品总金额
      return this.$store.getters.totalAmount;
    }
  },
  watch: {
    searchText(newText) {
      if (newText === "") {
        this.isSearch = false;
      }
    }
  },
  methods: {
    changeGC(key) {
      // 改变关键词
      this.currentGoodsCategory = key;
      this.searchText = "";
    },
    searchHandel() {
      if (this.searchText === "") {
        this.$refs.searchText.focus();
      } else {
        this.isSearch = true;
      }
    },
    insertGoods(goods) {
      // 新添商品
      this.$store.dispatch("insertGoods", goods);
    },
    changeGoodsCount(goodsId, num) {
      // 改变商品的数量;
      this.$store.dispatch("changeGoodsCount", {
        goodsId,
        num
      });
    },
    removeGoodsCart(goods) {
      // 删除商品
      this.$store.dispatch("removeGoods", goods._id);
    }
  },
  created() {
    this.goodsCategoryInfo;
  }
};
</script>

<style scoped>
.goodsList::-webkit-scrollbar {
  width: 0 !important;
}
</style>

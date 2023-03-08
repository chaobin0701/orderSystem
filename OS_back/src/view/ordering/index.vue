<template>
  <div class="orderingBox h-full w-full">
    <div class="flex h-full w-full space-x-4 pt-4">
      <!-- 购物车 / 结算 -->
      <div class="w-1/4 box-border bg-white rounded-sm relative">
        <div
          class="flex flex-col justify-between items-center border-b-2 h-28 absolute left-0 top-0 w-full z-10"
        >
          <div class="flex justify-between w-full">
            <span
              class="w-1/4 text-center box-border bg-gray-300 duration-300 pt-2 pb-2 cursor-pointer"
              :class="diningMethod == '1' ? 'bg-blue-200 w-3/4' : ''"
              @click="diningMethod = '1'"
              >堂食</span
            >
            <span
              class="w-1/4 text-center box-border bg-gray-300 duration-300 pt-2 pb-2 cursor-pointer"
              :class="diningMethod == '2' ? 'bg-blue-200 w-3/4' : ''"
              @click="diningMethod = '2'"
              >打包</span
            >
          </div>
          <div
            class="flex justify-between items-center w-full p-5"
            
          >
            <template v-if="diningMethod == '1'">
              <span class="text-xl font-bold">用餐人数:</span>
              <el-input-number
                v-model="number"
                :min="1"
                size="mini"
              ></el-input-number>
            </template>
            <span v-else class="text-xl font-bold">当前为打包</span>
          </div>
        </div>

        <!-- 菜 -->
        <div class="flex flex-col pr-5 pl-5 pt-28 pb-20 h-full overflow-auto">
          <div
            v-for="c_goods in goodsCart"
            :key="c_goods._id"
            class="flex justify-between mt-3 mb-3 pb-3 border-b items-end"
          >
            <div>
              <p class="goodsName text-l font-bold">{{ c_goods.goodsName }}</p>
              <!-- TODO -->
              <p class="goodsdes text-sm">
                {{
                  c_goods.goodsType.gt_specifications.reduce((p, n) => {
                    return p + n.value;
                  }, "")
                }}
              </p>
              <p class="goodsPrice text-sm text-red-500">
                ${{ c_goods.goodsPrice }}元
              </p>
            </div>

            <div class="flex">
              <el-button
                icon="el-icon-plus"
                size="mini"
                @click="changeGoodsCount(c_goods, 1)"
              ></el-button>
              <span class="border pr-6 pl-6 font-bold leading-6">{{
                c_goods.goodsCount
              }}</span>
              <el-button
                icon="el-icon-minus"
                size="mini"
                @click="changeGoodsCount(c_goods, -1)"
              ></el-button>

              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="removeGoodsCart(c_goods)"
              ></el-button>
            </div>
          </div>
        </div>

        <!-- 结算 -->
        <div
          class="absolute bottom-0 left-0 border-t-2 h-20 w-full p-4 flex items-center z-10"
        >
          <p class="w-1/2">
            结算金额:
            <span class="text-xl font-bold">{{ totalAmount }}</span> 元
          </p>
          <el-button type="primary" class="flex-1">结算</el-button>
        </div>
      </div>
      <!-- 点餐区域 -->
      <div class="w-3/4 box-border bg-white rounded-sm p-5 relative">
        <div
          class="w-full flex items-center justify-between absolute top-0 z-10 bg-white left-0 h-24 pl-5 pr-5 shadow-sm"
        >
          <div class="w-3/4 border-r-2">
            <el-tag
              @click="changeGC('全部商品')"
              class="cursor-pointer mr-2 mb-2"
              :type="currentGoodsCategory === '全部商品' ? '' : 'info'"
              >全部菜单</el-tag
            >
            <el-tag
              @click="changeGC(gc)"
              class="cursor-pointer mr-2 mb-2"
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
          class="goodsList w-full max-h-full overflow-auto flex flex-wrap pt-24"
        >
          <div
            class="goods w-1/6 box-border p-5 flex flex-col items-center cursor-pointer bg-gray-50 hover:bg-gray-300 duration-300"
            @click="insertGoods(goods)"
            v-for="(goods, i) in goodsInfo"
            :key="i"
          >
            <img
              :src="
                (goods.goodsImgs[0] && goods.goodsImgs[0].url) ||
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
      isSearch: false, //表示当前是否处于搜索状态
      diningMethod: "1", // 用餐方式
    };
  },
  computed: {
    goodsInfo() {
      //全部商品
      if (this.isSearch) {
        return this.$store.state.goodsInfo.filter((goods) => {
          return goods.goodsName.includes(this.searchText);
        });
      }
      if (this.currentGoodsCategory === "全部商品") {
        return this.$store.state.goodsInfo;
      } else {
        let gc_obj = this.$store.state.goodsCategoryInfo.find((item) => {
          return item.gc_name === this.currentGoodsCategory;
        });
        return gc_obj && gc_obj.goodsInfo;
      }
    },
    goodsCategoryInfo() {
      // 全部分类
      let res = this.$store.state.goodsCategoryInfo.map((item) => {
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
    },
  },
  watch: {
    searchText(newText) {
      if (newText === "") {
        this.isSearch = false;
      }
    },
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
    changeGoodsCount(goods, num) {
      if (goods.goodsCount + num > 0) {
        // 改变商品的数量;
        this.$store.dispatch("changeGoodsCount", {
          goodsId: goods._id,
          num,
        });
      } else {
        // TODO 提醒
      }
    },
    removeGoodsCart(goods) {
      // 删除商品
      this.$store.dispatch("removeGoods", goods._id);
    },
  },
  created() {
    this.goodsCategoryInfo;
  },
};
</script>

<style scoped>
.goodsList::-webkit-scrollbar {
  width: 0 !important;
}
</style>

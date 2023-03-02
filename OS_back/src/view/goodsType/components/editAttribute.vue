<template>
  <el-form-item :label="label">
    <div
      v-for="(item, index) in attributes"
      :key="index"
      class="flex justify-between mb-3 flex-col"
    >
      <editAttributeItem
        :index="index"
        :attribute="item"
        :label="label"
        @delAttribute="delAttribute(index)"
      ></editAttributeItem>
    </div>
    <!-- 添加更多商品属性 -->
    <el-button icon="el-icon-plus" circle class="m-2" @click="addAttribute">
    </el-button>
  </el-form-item>
</template>

<script>
import editAttributeItem from "./editAttributeItem.vue";

export default {
  data() {
    return {};
  },
  components: { editAttributeItem },
  props: {
    label: {
      type: String,
      default: "属性"
    },
    attributes: {
      type: Array
    }
  },
  methods: {
    // 添加属性
    addAttribute() {
      this.attributes.push({
        type: "text",
        title: ""
      });
    },
    // 删除属性
    delAttribute(index) {
      this.attributes.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>

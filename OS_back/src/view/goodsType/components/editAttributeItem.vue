<template>
  <div>
    <div class="flex space-x-3 mb-1">
      <!-- 属性名称 -->
      <el-input
        type="text"
        :placeholder="`${label}名称`"
        v-model="attribute.title"
        class="w-2/3"
      ></el-input>
      <!-- 选择属性类型 -->
      <el-select
        v-model="attribute.type"
        placeholder="请选择"
        @change="changeAttributeType"
      >
        <el-option label="文本" value="text"> </el-option>
        <el-option label="选项" value="option"> </el-option>
      </el-select>
      <!-- 删除属性 -->
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="delAttribute()"
      ></el-button>
    </div>
    <!-- 如果属性类型是option,可以创建选项 -->
    <div v-if="attribute.type === 'option'" class="space-x-2">
      <!-- 属性列表 -->
      <el-tag
        v-for="(tag, i) in attribute.value"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="delAttributeItem(i)"
      >
        {{ tag }}
      </el-tag>
      <!-- 添加新属性; enter确认 -->
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="text"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="addAttributeItem()"
      >
      </el-input>
      <!-- 添加新属性,点击出现input框 -->
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >添加新{{ label }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      text: ""
    };
  },
  props: {
    label: {
      type: String,
      default: "默认标题"
    },
    attribute: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 删除属性
    delAttribute() {
      this.$emit("delAttribute");
    },
    // 删除属性的选项
    delAttributeItem(i) {
      this.attribute.value.splice(i, 1);
    },
    // 添加属性的选项
    addAttributeItem() {
      this.attribute.value.push(this.text);
      this.inputVisible = false;
      this.text = "";
    },
    // 显示属性
    showInput() {
      this.inputVisible = true;
    },
    // 改变类型
    changeAttributeType(value) {
      if (value === "text") {
        this.attribute.value = null;
      } else {
        this.attribute.value = [];
      }
    }
  }
};
</script>

<style scoped></style>

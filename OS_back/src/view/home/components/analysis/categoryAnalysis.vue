<template>
  <div class="chartBox">
    <chart-header title="分类销售数据分析">
      <template v-slot:right>
        <div class="tabs">
          <div
            class="tabs-item"
            @click="activeName = 'day'"
            :class="activeName == 'day' ? 'active' : ''"
          >
            今天
          </div>
          <div
            class="tabs-item"
            @click="activeName = 'week'"
            :class="activeName == 'week' ? 'active' : ''"
          >
            本周
          </div>
          <div
            class="tabs-item"
            @click="activeName = 'month'"
            :class="activeName == 'month' ? 'active' : ''"
          >
            本月
          </div>
        </div>
      </template>
    </chart-header>
    <div
      class="chart"
      ref="box"
      style="width: 100%; height: 100%"
      v-loading="isLoading"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { salesVolume } from "@/api/dataAnalysis";
import chartHeader from "./components/chartHeader.vue";
export default {
  data() {
    return {
      activeName: "day",
      isLoading: false,
    };
  },
  name: "chartOne",
  components: { chartHeader },
  methods: {
    // 获取数据
    async salesVolume(model) {
      this.isLoading = true;
      try {
        let { data: result } = await salesVolume({ model });
        // 处理数据
        let salesVolumesInfo = result.map((item) => {
          return { value: item.totalCount, name: item.meals_category };
        });
        // 处理数据
        let salesAmountInfo = result.map((item) => {
          return {
            value: Number(item.total.toFixed(2)),
            name: item.meals_category,
          };
        });
        this.isLoading = false;
        // 传递给echarts实例
        this.myEcharts(salesVolumesInfo, salesAmountInfo);
      } catch (error) {
        console.log("发生错误", error);
      }
    },
    // echarts配置
    myEcharts(salesVolumesInfo, salesAmountInfo) {
      // 基于准备好的dom，初始化echarts实例
      this.myChartLine = echarts.init(this.$refs.box);
      let color = [
        "rgb(54,142,243)",
        "rgb(2,217,217)",
        "rgb(255,237,91)",
        "rgb(255,158,91)",
        "rgb(84,95,255)",
      ];
      // 计算总销售量
      let total = salesVolumesInfo.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      // 计算总销售额
      let totalAmount = salesAmountInfo.reduce((a, b) => {
        return a + b.value;
      }, 0);
      totalAmount = totalAmount.toFixed(2);
      // 返回选择的数据集的标识
      const activeModel = (model) => {
        switch (model) {
          case "day":
            return "今天";
          case "month":
            return "本月";
          case "week":
            return "本周";
        }
      };

      // 指定图表的配置项和数据
      var option = {
        color: color,
        tooltip: {
          formatter: "{b} - {c}",
        },
        title: [
          {
            text:
              "{name|" +
              activeModel(this.activeName) +
              "总销售数量" +
              "}\n{val|" +
              total +
              "}{c|件}",
            top: "50%",
            left: "33%",
            textStyle: {
              rich: {
                name: {
                  fontSize: 16,
                  color: "rgb(132,159,186)",
                  padding: [10, 0, 5, 15],
                },
                val: {
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgb(61,153,252)",
                  padding: [0, 10, 0, 15],
                },
                c: {
                  fontSize: 15,
                  color: "rgb(132,159,186)",
                },
              },
            },
          },
          {
            text:
              "{name|" +
              activeModel(this.activeName) +
              "总销售金额" +
              "}\n{val|" +
              totalAmount +
              "}{c|元}",
            top: "50%",
            left: "75%",
            textStyle: {
              rich: {
                name: {
                  fontSize: 16,
                  color: "rgb(132,159,186)",
                  padding: [10, 0, 5, 15],
                },
                val: {
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgb(61,153,252)",
                  padding: [0, 10, 0, 15],
                },
                c: {
                  fontSize: 15,
                  color: "rgb(132,159,186)",
                },
              },
            },
          },
        ],
        legend: {
          icon: "rect",
          x: "25%",
          y: "10%",
          textStyle: {
            color: "rgb(132,159,186)",
            fontSize: 15,
            padding: [0, 0, 0, 10],
          },
        },
        series: [
          {
            type: "pie",
            radius: ["0%", "60%"],
            center: ["20%", "57%"],
            data: salesVolumesInfo,
            label: {
              formatter: (params) => {
                return params.name + "-" + params.value + "件";
              },
            },
          },
          {
            type: "pie",
            radius: ["0%", "60%"],
            center: ["60%", "57%"],
            data: salesAmountInfo,
            label: {
              show: true,
              formatter: (params) => {
                return params.name + "-" + params.value + "元";
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChartLine.setOption(option);
    },
  },
  watch: {
    // 选择不同日期的数据
    activeName(newValue) {
      this.myChartLine = null;
      this.salesVolume(newValue);
    },
  },
  created() {
    this.salesVolume();
  },
  beforeDestroy() {
    //实例销毁之前调用
    if (!this.myChartLine) {
      return;
    }
    this.myChartLine.dispose();
    this.myChartLine = null;
  },
};
</script>

<style >
.tabs {
  height: 100%;
  display: flex;
  align-items: center;
}

.tabs .tabs-item {
  color: #333;
  font-size: 14px;
  padding: 3px 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs .tabs-item.active {
  color: #25abbe;
  background-color: rgba(220, 220, 220, 0.2);
  border-radius: 50px;
}
</style>


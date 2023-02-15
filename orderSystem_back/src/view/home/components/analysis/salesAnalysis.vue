<template>
  <div class="chartBox">
    <chartHeader title="近15天销售数据分析" :volume="false"></chartHeader>
    <div ref="box" style="width: 100%; height: 90%" v-loading="isLoading"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chartHeader from "./components/chartHeader.vue";

import { salesAmountVolume } from "@/api/dataAnalysis";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  name: "chartOne",
  components: { chartHeader },
  methods: {
    myEcharts(xData, yData1, yData2) {
      // 最大值 / 6 后向上取整=最大间隔
      // 最大间隔 * 6 = 最大值;
      let intervalY1 = Math.ceil(Math.max(...yData1) / 6);
      let intervalY2 = Math.ceil(Math.max(...yData2) / 6);
      // 因为暂时没数据。可设置为 0 时默认间隔,此处为 1
      intervalY1 = intervalY1 == 0 ? 1 : intervalY1;
      intervalY2 = intervalY2 == 0 ? 1 : intervalY2;
      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      this.myChartLine = echarts.init(this.$refs.box);

      // 指定图表的配置项和数据
      var option = {
        backgroundColor: "#fff",
        color: colors,
        // 移动显示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 位置标注
        grid: {
          right: "5%",
          left: "5%",
          bottom: "10%",
        },
        // 顶部显示
        legend: {
          data: ["订单数量", "销售金额"],
        },
        // x轴数据 => 日期
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        // y轴数据的描述
        yAxis: [
          {
            type: "value",
            name: "销售金额",
            min: 0,
            // 不想数据=max,可手动更改interval*7 或 (interval*6)+ 20
            max: intervalY1 * 6, // 最大值
            splitNumber: 6, // 坐标轴的分割段数(预估值)
            interval: intervalY1, // 强制设置坐标轴分割间隔。
            axisLabel: {
              formatter: "{value}元",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#D1D9EB",
                type: "dashed",
              },
            },
          },
          {
            type: "value",
            name: "订单数量",
            position: "right",
            min: 0,
            // 不想数据=max,可手动更改interval*7 或 (interval*6)+ 20
            max: intervalY2 * 6, // 最大值
            splitNumber: 6, // 坐标轴的分割段数(预估值)
            interval: intervalY2, // 强制设置坐标轴分割间隔。
            axisLabel: {
              formatter: "{value}份",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#D1D9EB",
                type: "dashed",
              },
            },
          },
        ],
        // 数据
        series: [
          {
            name: "销售金额",
            type: "bar",
            data: yData1,
            barWidth: "30px",
            label: {
              show: true,
              position: "insideBottom",
              rotate: 90,
              align: "left",
              verticalAlign: "middle",
              formatter: "{c} 元",
              fontSize: 10,
              rich: {
                name: {},
              },
            },
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "订单数量",
            type: "bar",
            data: yData2,
            barWidth: "30px",
            yAxisIndex: 1,
            label: {
              show: true,
              position: "insideBottom",
              rotate: 90,
              align: "left",
              verticalAlign: "middle",
              fontSize: 10,
              formatter: "{c} 份",
              rich: {
                name: {},
              },
            },
            emphasis: {
              focus: "series",
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChartLine.setOption(option);
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      let { data: result } = await salesAmountVolume();
      this.isLoading = false;
      let data = result.reduce(
        (prev, next) => {
          prev[0].push(next.day);
          prev[1].push(next.totalPrice);
          prev[2].push(next.totalCount);
          return prev;
        },
        [[], [], []]
      );
      this.myEcharts(data[0], data[1], data[2]);
    } catch (error) {
      console.log(error);
    }
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
</style>


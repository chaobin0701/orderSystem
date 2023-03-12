<template>
  <div class="chartBox">
    <chart-header title="餐品销售数据分析" :volume="false">
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
      style="width: 100%; height: 90%"
      v-loading="isLoading"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { MealsVolume } from "@/api/dataAnalysis";
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
    async MealsVolume(model) {
      this.isLoading = true;
      try {
        let { data: result } = await MealsVolume({ model });
        // 处理数据
        result = result.reduce(
          (prev, next) => {
            prev[0].push(next.goodsName);
            prev[1].push(next.total.toFixed(2));
            prev[2].push(next.totalCount);
            return prev;
          },
          [[], [], []]
        );
        // 传递给echarts实例
        this.myEcharts(result[0], result[1], result[2]);
        this.isLoading = false;
      } catch (error) {
        console.log("发生错误", error);
      }
    },
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
          bottom: "15%",
        },
        // 顶部显示
        legend: {
          data: ["销售数量", "销售金额"],
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
          },
          {
            type: "value",
            name: "销售数量",
            position: "right",
            min: 0,
            // 不想数据=max,可手动更改interval*7 或 (interval*6)+ 20
            max: intervalY2 * 6, // 最大值
            splitNumber: 6, // 坐标轴的分割段数(预估值)
            interval: intervalY2, // 强制设置坐标轴分割间隔。
            axisLabel: {
              formatter: "{value}份",
            },
          },
        ],
        // 数据
        series: [
          {
            name: "销售金额",
            type: "bar",
            data: yData1,
            barWidth: "50px", //宽度
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "销售数量",
            type: "bar",
            data: yData2,
            barWidth: "50px", //宽度
            yAxisIndex: 1,
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
          },
        ],
        dataZoom: [
          // 滑动条
          {
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条，不影响使用 滚动条样式调不好很丑
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 9, // 一次性展示几个。
            moveHandleSize: 6, // 高度
            fillerColor: "#EE6666", // 选中范围的填充颜色
            backgroundColor: "#5470C6", // 组件的背景颜色
            bottom:"5%",
            left: "5%", // 左边的距离
            right: "5%", // 右边的距离
            textStyle: {
              color: "#fff", // 滚动条两边字体样式
            },
            height: "3%",
          },
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: 1, // 默认为1
            end: 100, // 默认为100
            moveOnMouseWheel: false,
            preventDefaultMouseMove: false,
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
      this.MealsVolume(newValue);
    },
  },
  created() {
    this.MealsVolume();
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


<template>
    <div class="homepage">
        <div class="homeBox">
            <!-- 商品分类数据分析 -->
            <div class="item">
                <!-- <categoryAnalysis /> -->
            </div>
            <!-- 商品数据分析 -->
            <div class="item">
                <!-- <MealsAnalysis></MealsAnalysis> -->
            </div>
            <!-- 近15天数据分析 -->
            <div class="item">
                <!-- <salesAnalysis /> -->
            </div>
        </div>
    </div>
</template>

<script>
import salesAnalysis from "./components/analysis/salesAnalysis.vue";
import categoryAnalysis from "./components/analysis/categoryAnalysis.vue";
import MealsAnalysis from "./components/analysis/mealsAnalysis.vue";

export default {
    name: 'homepage',
    components: { salesAnalysis, categoryAnalysis, MealsAnalysis },
}
</script>

<style>
.homepage {
    height: 100%;
    overflow-y: scroll;
}

.homeBox {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    box-sizing: border-box;
    padding-top: 15px;
    flex: 1;
}

.item {
    height: 375px;
    border-radius: 20px;
    background-color: white;
    box-sizing: border-box;
    padding: 15px;
    margin: 10px;
    box-shadow: 3px 3px 5px rgba(220, 220, 220, .1);
    transition: all .5s;
}

.item:hover {
    box-shadow: 0px 0px 15px rgba(37, 171, 190, .4);
}

/* 每个模块 */
.chartBox {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
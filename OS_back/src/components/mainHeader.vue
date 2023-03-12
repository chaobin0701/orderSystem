<template>
  <div class="main-header">
    <slot name="left">

    </slot>
    <slot name="right">
      
    </slot>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>.main-header {
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    box-sizing: border-box;
    justify-content:space-between;
    padding: 0 20px;
    margin-top: 10px;
    box-shadow: 3px 3px 10px rgba(220, 220, 220, .2);
    transition: all .5s;
    background-color: #fff;
}

.main-header:hover {
    box-shadow: 0px 0px 10px rgba(150, 150, 150, .3);
}
</style>
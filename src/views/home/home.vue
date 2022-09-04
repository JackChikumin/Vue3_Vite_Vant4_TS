<template>
  <NavBar />
  <Swipe :autoplay="3000" indicator-color="white">
    <SwipeItem v-for="(item, index) in 4" :key="index">{{ item }}</SwipeItem>
  </Swipe>
  <Button type="primary" text="更改主题" @click="showPicker = !showPicker" />
  <TabBar />
  <Suspended />
  <ThemePicker :showPicker="showPicker" @handlePicker="showPicker = false" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Swipe, SwipeItem, Button } from 'vant';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { TabBar, NavBar, Suspended, ThemePicker } from '/@/components';

  const { t } = useI18n();

  // 是否显示主题切换组件
  const showPicker = ref<boolean>(false);
</script>

<style lang="less" scoped>
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>

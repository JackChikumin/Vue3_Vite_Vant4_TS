<template>
  <Tabbar v-model="active">
    <TabbarItem icon="home-o">标签</TabbarItem>
    <TabbarItem icon="search">标签</TabbarItem>
    <TabbarItem icon="friends-o">标签</TabbarItem>
    <TabbarItem icon="setting-o">标签</TabbarItem>
    <TabbarItem icon="setting-o">标签</TabbarItem>
  </Tabbar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Tabbar, TabbarItem } from 'vant';

  const active = ref<number>(0);
</script>

<style lang="less" scoped></style>

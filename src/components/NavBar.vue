<template>
  <NavBar title="标题" left-text="返回" left-arrow fixed>
    <template #right>
      <Icon name="search" size="18" />
    </template>
  </NavBar>
</template>

<script lang="ts" setup>
  import { NavBar, Icon } from 'vant';
</script>

<style lang="less" scoped></style>

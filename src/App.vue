<template>
  <ConfigProvider class="Provider" :theme="DarkMode" :theme-vars="themeVars">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" v-if="$route.meta.keepAlive" />
      </KeepAlive>
      <Component :is="Component" v-if="!$route.meta.keepAlive" />
    </RouterView>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import VConsole from 'vconsole';
  import { useStore } from '/@/store';
  import { ConfigProvider } from 'vant';
  import { useRoute, RouterView } from 'vue-router';
  import { computed, onBeforeMount, watch } from 'vue';
  import { MonitoringTheme, WatchSystemTheme } from '/@/utils/DarkThemeUtils';

  const store = useStore();

  const router = useRoute();

  // 主题模式
  const DarkMode = computed(() => {
    return store.getters['SystemConfig/getDarkMode'];
  });

  // 主题变量
  const themeVars = computed(() => {
    return store.getters['SystemConfig/getThemeVars'];
  });

  // 是否显示Vconsole
  const isShowConsole = (): void => {
    if (import.meta.env.DEV) {
      new VConsole({ theme: DarkMode.value });
    }
  };

  // 深度监听路由改变
  watch(
    () => router.path,
    (): void => {
      MonitoringTheme(true);
    },
    {
      deep: true
    }
  );

  onBeforeMount((): void => {
    MonitoringTheme(true);
    WatchSystemTheme();
    isShowConsole();
  });
</script>

<style></style>

import App from './App.vue';
import { createApp } from 'vue';

// UI库桌面端
import '@vant/touch-emulator';

// UI库样式
import 'vant/lib/index.css';

// 主题模式样式配置
import '/@/design/index.less';

// postcss
import 'amfe-flexible';

// vuex
import { setupStore } from '/@/store';

// router
import { setupRouter, router } from '/@/router';

// i18n
import { setupI18n } from '/@/locales/setupI18n';

// 初始化基础数据
import { initAppConfigStore } from '/@/logics/initAppConfig';

import { createHttpGuard, createMessageGuard } from '/@/hooks/setting';

// 创建服务
async function CreateMainBoot() {
  const app = createApp(App);

  // 初始化Vuex
  setupStore(app);

  // 初始化基础数据
  initAppConfigStore();

  // 初始化路由
  setupRouter(app);

  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  createHttpGuard(router);

  // 切换界面的时候是否删除未关闭的Dialog及Toast,Notify
  createMessageGuard(router);

  // 初始化国际语言
  await setupI18n(app);

  app.mount('#app');
}

void CreateMainBoot();
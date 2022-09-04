import { App } from 'vue';
import { createStore } from 'vuex';
import { key } from '../../package.json';
import CreatePersistedState from 'vuex-persistedstate';

// 系统配置
import SystemConfig from './modules/SystemConfig';

// 用户配置
import UserConfig from './modules/UserConfig';

// 创建Vuex
export const store = createStore({
  plugins: [
    CreatePersistedState({
      key: key
    }),
  ],
  modules: {
    SystemConfig,
    UserConfig,
  },
});

// 注册并初始化
export const setupStore = (app: App<Element>): void => {
  app.use(store);
};

// useStore
export const useStore = () => {
  return store;
};

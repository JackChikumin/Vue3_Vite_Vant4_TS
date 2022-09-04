import { ref } from 'vue';
import { useStore } from '/@/store';
import { deepMerge } from '/@/utils';
import { ThemeEnum } from '/@/enums/appEnum';
import type { ProjectConfig } from '/#/config';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { localeSetting } from '/@/settings/localeSetting';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';
import projectSetting, { APP_PRESET_COLOR_LIST } from '/@/settings/projectSetting';

// 初始化基础数据
export const initAppConfigStore = (): void => {
  const store = useStore();

  const ProjectConfigStore: ProjectConfig = deepMerge(projectSetting, {});

  // 检测是否为App客户端模式
  const isAppClient = ref<boolean>(false);

  ProjectConfigStore.isAppClient = isAppClient.value;

  // 检测当前是否为Apple MobileConfig证书APP
  const isAppleMobileConfig = ref<boolean>(false);

  if (location.origin.includes('ios')) {
    isAppleMobileConfig.value = true;
  }

  ProjectConfigStore.isAppleMobileConfig = isAppleMobileConfig.value;

  // 主题色
  ProjectConfigStore.themeColor =
    store.getters['SystemConfig/getThemeColor'] ?? APP_PRESET_COLOR_LIST[0].value;

  // 主题模式
  ProjectConfigStore.themeDark = store.getters['SystemConfig/getDarkMode'] ?? ThemeEnum.LIGHT;

  // 色弱模式
  ProjectConfigStore.colorWeak = store.getters['SystemConfig/getColorWeak'] ?? false;

  // 灰色模式
  ProjectConfigStore.grayMode = store.getters['SystemConfig/getGrayMode'] ?? false;

  // 写入基础数据
  store.commit('SystemConfig/setProjectConfig', ProjectConfigStore);

  // 导出
  const { colorWeak, grayMode, themeDark } = ProjectConfigStore;

  // 初始化国际语言
  store.commit('SystemConfig/setLocaleInfo', localeSetting);

  // 设置
  try {
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }

  // 设置主题模式
  updateDarkTheme(themeDark);

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
};

export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}

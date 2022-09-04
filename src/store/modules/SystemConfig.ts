import { deepMerge } from '/@/utils';
import { ThemeEnum } from '/@/enums/appEnum';
import { setVantLocales } from '/@/locales/VantLocale';
import { localeSetting } from '/@/settings/localeSetting';
import type { LocaleSetting, ProjectConfig } from '/#/config';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';

const lsLocaleSetting = localeSetting as LocaleSetting;

// State类型控制
interface State {
  // 国际化语言
  localInfo: LocaleSetting;
  // 项目配置
  projectConfig: ProjectConfig | object;
  // UI库主题变量配置
  themeVars: object;
}

// 系统配置
const state: State = {
  // 国际化语言
  localInfo: lsLocaleSetting,
  // 项目配置
  projectConfig: {},
  // UI库主题变量配置
  themeVars: {},
};

// mutations
const mutations = {
  // 修改主题模式
  setDarkMode(state: { projectConfig: ProjectConfig }, payload: ThemeEnum): void {
    state.projectConfig.themeDark = payload;
  },

  // 保存语言
  setLocaleInfo(state: { localInfo: LocaleSetting }, payload: Partial<LocaleSetting>): void {
    state.localInfo = { ...state.localInfo, ...payload };
    // 切换UI库语言
    setVantLocales(state.localInfo.locale);
  },

  // 保存基础配置数据
  setProjectConfig(
    state: { projectConfig: ProjectConfig },
    payload: DeepPartial<ProjectConfig>,
  ): void {
    state.projectConfig = deepMerge(state.projectConfig || {}, payload);
  },

  // 更新UI库主题变量配置
  setThemeVars(state: { themeVars: Object }, payload: Object): void {
    state.themeVars = payload;
  },

  // 修改主题色
  setThemeColor(state: { projectConfig: ProjectConfig }, payload: string): void {
    state.projectConfig.themeColor = payload;
  },

  // 网站灰色模式
  setGrayMode(state: { projectConfig: ProjectConfig }, payload: boolean): void {
    state.projectConfig.grayMode = payload;
    updateGrayMode(payload);
  },

  // 色弱模式
  setColorWeak(state: { projectConfig: ProjectConfig }, payload: boolean): void {
    state.projectConfig.colorWeak = payload;
    updateColorWeak(payload);
  },
};

// getters
const getters = {
  // 获取主题模式
  getDarkMode: (state: { projectConfig: ProjectConfig }) => state.projectConfig.themeDark,

  // 获取主题颜色
  getThemeColor: (state: { projectConfig: ProjectConfig }) => state.projectConfig.themeColor,

  // 获取当前语言
  getLocaleInfo: (state: { localInfo: LocaleSetting }) => state.localInfo,

  // 获取UI库主题变量配置
  getThemeVars: (state: { themeVars: Object }) => state.themeVars,

  // 获取色弱模式状态
  getColorWeak: (state: { projectConfig: ProjectConfig }) => state.projectConfig.colorWeak,

  // 获取灰色模式状态
  getGrayMode: (state: { projectConfig: ProjectConfig }) => state.projectConfig.grayMode,
};

// actions
const actions = {};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

import { ThemeEnum } from '/@/enums/appEnum';
import type { ProjectConfig } from '/#/config';

export interface ColorType {
  label: string | Fn;
  value: string;
}

// 主题颜色配置
export const APP_PRESET_COLOR_LIST: ColorType[] = [
  { label: '', value: '#0960bd' },
  { label: '', value: '#0084f4' },
  { label: '', value: '#009688' },
  { label: '', value: '#536dfe' },
  { label: '', value: '#ff5c93' },
  { label: '', value: '#ee4f12' },
  { label: '', value: '#0096c7' },
  { label: '', value: '#9c27b0' },
  { label: '', value: '#ff9800' },
];

// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  // 是否开启站点
  isOpenWebSite: true,
  // 是否开启站点维护状态
  SystemMaintain: false,
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,
  // 色弱模式
  colorWeak: false,
  // 是否App模式
  isAppClient: false,
  // 是否Apple证书APP
  isAppleMobileConfig: false,
  // 项目主题色
  themeColor: APP_PRESET_COLOR_LIST[0].value,
  // 主题模式
  themeDark: ThemeEnum.LIGHT,
  // 是否显示底部信息 copyright
  showFooter: true,
  // 是否开启KeepAlive缓存
  KeepAlive: true,
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: true,
  // 登录保存密码
  loginSaveAccount: {
    // 用户名
    username: null,
    // 密码
    password: null,
    // 是否记住密码
    rememberMe: false,
  },
};

export default setting;

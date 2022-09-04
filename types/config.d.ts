import { ThemeEnum } from '/@/enums/appEnum';

// 多语言类型
export type LocaleType = 'zh_CN' | 'en' | 'zh_HK' | 'zh_TW' | 'ja_JP';

// 多语言配置
export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用的语言环境
  availableLocales: LocaleType[];
}

// 登录保存账户密码
export interface LoginAccount {
  // 用户名
  username: string | null;
  // 密码
  password: string | null;
  // 是否记住密码
  rememberMe: boolean;
}

// 项目配置
export interface ProjectConfig {
  // 是否开启站点
  isOpenWebSite: boolean;
  // 是否开启站点维护状态
  SystemMaintain: boolean;
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean;
  // 色弱模式
  colorWeak: boolean;
  // 是否App模式
  isAppClient: boolean;
  // 是否Apple证书APP
  isAppleMobileConfig: boolean;
  // 项目主题色
  themeColor: string;
  // 主题模式
  themeDark: ThemeEnum;
  // 是否显示底部信息 copyright
  showFooter: boolean;
  // 是否开启KeepAlive缓存
  KeepAlive: boolean;
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: boolean;
  // 登录保存密码
  loginSaveAccount: LoginAccount;
}

// 公共配置
export interface GlobConfig {
  // 网站标题
  title: string;
  // 服务接口地址
  apiUrl: string;
  // 上传网址
  uploadUrl?: string;
  // 服务接口url前缀
  urlPrefix?: string;
  // 项目简称
  shortName: string;
}

// 公共环境变量配置
export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // 服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 项目简称
  VITE_GLOB_APP_SHORT_NAME: string;
  // 上传网址
  VITE_GLOB_UPLOAD_URL?: string;
  // 是否开启数据加密
  VITE_GLOB_ENCRYPT: boolean;
  // 加密密钥
  VITE_GLOB_PUBLICKEY: string;
}

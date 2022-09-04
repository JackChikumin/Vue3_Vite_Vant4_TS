interface Subpages {
  url: string;
  id: string;
  styles?: object;
  extras?: object;
}

interface PreloadPages extends Subpages {
  subpages?: Array<Subpages>;
}

interface PullRefreshBase {
  height?: string | number;
  auto?: boolean;
  contentrefresh?: string;
  callback: any;
}
interface PullRefreshUp extends PullRefreshBase {
  contentnomore?: string;
}
interface pullRefreshDown extends PullRefreshBase {
  style: 'circle';
  color?: string;
  range?: string | number;
  offset?: string | number;
  contentdown?: string;
  contentover?: string;
}
interface PullRefresh {
  container: string;
  down?: pullRefreshDown;
  up?: PullRefreshUp;
}

interface OffCanvas {
  /** 显示 */
  show(): void;
  /** 隐藏 */
  close(): void;
  /** 切换 */
  toggle(): void;
  /** 判断是否为显示状态 */
  isShown(direction?: string): boolean;
}

interface Numbox {
  /** 获取当前值 */
  getValue(): string;
  /** 动态设置新值 */
  setValue(val: number): void;
  /** 更新选项 */
  setOption(option: 'min' | 'step' | 'max', val: number): void;
}

declare namespace mui {
  /** 初始化 */
  function init(options?: {
    wipeBack?: boolean;
    swipe?: boolean;
    subpages?: Array<Subpages>;
    preloadPages?: Array<PreloadPages>;
    pullRefresh?: PullRefresh;
    gestureConfig?: {
      tap?: boolean;
      doubletap?: boolean;
      longtap?: boolean;
      hold?: boolean;
      release?: boolean;
      swipeleft?: boolean;
      swiperight?: boolean;
      swipeup?: boolean;
      swipedown?: boolean;
      dragstart?: boolean;
      drag?: boolean;
      dragend?: boolean;
    };
    keyEventBind?: {
      backbutton?: boolean;
      menubutton?: boolean;
    };
    beforeback?: Function;
    statusBarBackground?: string;
    preloadLimit?: number;
  }): void;
  /** 打开新窗口 */
  function openWindow(options: {
    url: string;
    id: string;
    styles?: object;
    extras?: object;
    createNew?: boolean;
    show?: {
      autoShow?: boolean;
      aniShow?: object;
      duration?: number;
    };
    waiting?: {
      autoShow?: boolean;
      title?: string;
      options?: object;
    };
  }): void;
  /** 自动消失消息提示框 */
  function toast(
    message: string,
    options?: {
      duration?: number | 'long' | 'short';
      type?: 'div';
    },
  ): void;
  /** 警告框 */
  function alert(
    message: string,
    title?: string,
    btnValue?: string,
    callback?: any,
    type?: 'div',
  ): void;
  /** 确认框 */
  function confirm(
    message: string,
    title?: string,
    btnValue?: string,
    callback?: any,
    type?: 'div',
  ): void;
  /** 输入对话框 */
  function prompt(
    message: string,
    title?: string,
    btnValue?: string,
    callback?: any,
    type?: 'div',
  ): void;
  /** 触发 Dom 事件 */
  function trigger(element: HTMLElement, event: string, data?: any): void;
  /** 触发自定义事件 */
  function fire(target: any, event: string, data?: any): void;
  /** 遍历 */
  function each(obj: any, callback: any): void;
  /** 合并对象 */
  function extend(deep: boolean, target: any, ...object: Array<any>): void;
  /** 封装 setTimeOut */
  function later(func: any, delay: number, context?: any): void;
  /** 滚动窗口屏幕到指定位置 */
  function scrollTo(ypos: number, duration: number, callback?: any): void;
  /** 判断当前运行环境 */
  let os: object & os;
  interface os {
    /** 是否在 5+ 环境内 */
    plus: boolean | undefined;
    /** 是否是流应用 */
    stream: boolean | undefined;
    /** 是否为 IOS */
    ios: boolean | undefined;
    /** 是否 iphone */
    iphone: boolean | undefined;
    /** 是否 ipad */
    ipad: boolean | undefined;
    /** 是否 android */
    android: boolean | undefined;
    /** 是否 android 的 chrome 环境 */
    isBadAndroid: boolean | undefined;
    /** 版本号 */
    version: string;
  }
  /** plusReady */
  function plusReady(callback: any): void;
  /** 关闭最后一次弹出的对话框（H5模式） */
  function closePopup(): void;
  /** 关闭所有对话框（H5模式） */
  function closePopups(): void;
  /** 轮播 */
  function slider(options: any): void;
  /** 创建遮罩 */
  function createMask(callback: any): Mask;
  interface Mask {
    /** 显示遮罩 */
    show(): void;
    /** 关闭遮罩 */
    close(): void;
  }
  /** 选择器组件 picker */
  class PopPicker {
    constructor(options: { layer?: number; buttons?: Array<any> });
    setData(options: Array<any>): void;
    pickers: Array<Picker>;
    getSelectedItem(): Array<Picker>;
    show(callback: any): void;
    hide(): void;
    dispose(): void;
  }
  /** 日期选择器 DtPicker */
  class DtPicker {
    constructor(options?: any);
    getSelectedItems(): any;
    show(callback?: any): void;
    hide(): void;
    dispose(): void;
  }
  /** 打开新页面 */
  function open(...options: Array<any>): any;
  /** 当前页面 */
  function currentWebview(...options: Array<any>): any;
  /** 关闭窗口 */
  function back(...options: Array<any>): any;
  /** 重写返回逻辑 */
  function backFunction(...options: Array<any>): any;
  /** 双击退出应用 */
  function backDouble(...options: Array<any>): any;
  /** 双击进入后台 */
  function backTast(...options: Array<any>): any;
  /** 预加载 */
  function preload(...options: Array<any>): any;
  /** Ajax */
  function ajax(
    url?: string,
    settings?: {
      async?: boolean;
      crossDomain?: boolean;
      data?: any;
      dataType?: 'xml' | 'html' | 'script' | 'json' | 'text';
      error?: any;
      success?: any;
      timeout?: number;
      type?: 'GET' | 'POST';
      headers?: any;
      processData?: boolean;
    },
  ): void;
  /** Ajax post */
  function post(
    url: string,
    data?: any,
    success?: any,
    dataType?: 'xml' | 'html' | 'script' | 'json' | 'text',
  ): void;
  function get(...options: Array<any>): any;
  function getJSON(...options: Array<any>): any;
}

interface Picker {
  setSelectedValue(value: string, duration?: number, callback?: any): void;
  setSelectedIndex(index: number, duration?: number, callback?: any): void;
}

interface Mui {
  /** 绑定 Dom 事件 */
  on(event: string, selector: string, callback: any): void;
  /** 取消事件绑定 */
  off(event?: string, selector?: string): void;
  /** 遍历 */
  each(callback: any): void;
  /** 弹出菜单 */
  popover(status: 'show' | 'hide' | 'toggle', anchor?: HTMLElement | Element): void;
  /** 聚焦 input */
  input(): void;
  /** 初始化数字输入框 numbox */
  numbox(): Numbox;
  /** 侧滑菜单 */
  offCanvas(active?: 'show' | 'close' | 'toggle'): OffCanvas;
  /** 滚动条 */
  progressbar(options?: any): Progressbar;
  /** 透明标题栏 */
  transparent(options: any): void;
  /** 区域滚动 */
  scroll(options?: {
    scrollY?: boolean;
    scrollX?: boolean;
    startX?: number;
    startY?: number;
    indicators?: boolean;
    deceleration?: number;
    bounce?: boolean;
  }): Scroll;
  /** 初始化 switch */
  ['switch'](): void;
}

interface Scroll {
  scrollTo(xpos: number, ypos: number, duration?: number): void;
  scrollToBottom(duration?: number): void;
}
interface Progressbar {
  show(): void;
  hide(): void;
  setProgress(param: any): void;
}

/** Mui Dom 选择器 */
declare function mui(dom: string): Mui & Array<HTMLElement>;

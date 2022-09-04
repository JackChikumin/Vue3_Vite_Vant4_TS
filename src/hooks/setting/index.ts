import type { Router } from 'vue-router';
import type { GlobConfig } from '/#/config';
import { Dialog, Toast, Notify } from 'vant';
import { getAppEnvConfig } from '/@/utils/env';
import projectSetting from '/@/settings/projectSetting';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
};

// 切换界面的时候是否取消已经发送但是未响应的http请求。
export const createHttpGuard = (router: Router): void => {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }

  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending();
    return true;
  });
};

// 切换界面的时候是否删除未关闭的Dialog及Toast,Notify
export const createMessageGuard = (router: Router): void => {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Toast.clear();
        Dialog.close();
        Notify.clear();
      }
    } catch (error) {
      console.warn('message guard error:' + error);
    }
    return true;
  });
};
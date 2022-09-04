import { Dialog, Toast } from 'vant';
import { useI18n } from '/@/hooks/web/useI18n';
import type {
  DialogProps,
  DialogTheme,
  DialogMessage,
  DialogOptions,
  DialogMessageAlign,
  ToastOptions,
} from 'vant';

// 处理参数
const getOptions = (options: DialogOptions) => {
  const { t } = useI18n();
  options.title ?? t('sys.api.Message');
  options.teleport ?? '.Provider';
  return {
    ...options
  };
};

// 确认/取消弹窗
const CreateConfirmDialog = (option: DialogOptions) => {
  const Options = getOptions(option);
  return Dialog.confirm(Options);
};

// 确认弹窗
const CreateAlertDialog = (option: DialogOptions) => {
  const Options = getOptions(option);
  return Dialog.alert(Options);
};

// 成功提示
const CreateSuccessToast = (message: string) => {
  return Toast.success(message);
};

// 失败提示
const CreateErrorToast = (message: string) => {
  return Toast.fail(message);
};

// 加载提示
const CreateLoadingToast = (Options: ToastOptions) => {
  Options.teleport ?? '.Provider';
  return Toast.loading(Options);
};

// 自定义提示
const CreateToast = (Options: ToastOptions) => {
  Options.teleport ?? '.Provider';
  return Toast(Options);
};

export const useMessage = () => {
  return {
    CreateConfirmDialog,
    CreateAlertDialog,
    CreateSuccessToast,
    CreateErrorToast,
    CreateLoadingToast,
    CreateToast,
  };
};

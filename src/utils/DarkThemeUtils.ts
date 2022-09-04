// 更换夜间模式与默认模式
import Dayjs from 'dayjs';
import { useStore } from '/@/store';
import { ref, computed } from 'vue';
import { ThemeEnum } from '/@/enums/appEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { updateDarkTheme } from '/@/logics/theme/dark';

export const MonitoringTheme = (Dark?: boolean): void => {
  const store = useStore();

  const { CreateAlertDialog } = useMessage();

  const { t } = useI18n();

  const getDarkMode = computed(() => {
    return store.getters['SystemConfig/getDarkMode'];
  });

  // 获取当前小时
  const hour = Dayjs().format('HH');

  const Token = computed(() => {
    return store.getters['UserConfig/getUserDark'];
  });

  const darkMode = ref<ThemeEnum>(getDarkMode.value);

  if (Dark) {
    // 如果当前客户没有主动切换主题
    if (Token.value) {
      // 如果时间小于晚上7点 或者小于早上7点
      if (Number(hour) >= 19 || Number(hour) < 7) {
        if (getDarkMode.value === ThemeEnum.LIGHT) {
          // 使用夜间主题
          darkMode.value = ThemeEnum.DARK;
          CreateAlertDialog({ title: t('sys.api.Message'), message: t('sys.darkMode.dark') });
        }
      } else {
        if (getDarkMode.value === ThemeEnum.DARK) {
          // 使用默认白色主题
          darkMode.value = ThemeEnum.LIGHT;
          CreateAlertDialog({ title: t('sys.api.Message'), message: t('sys.darkMode.light') });
        }
      }
    }
  } else {
    // 手动切换主题
    darkMode.value = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    if (!Token.value) {
      store.commit('UserConfig/setUserDark', true);
    }
  }

  UpdateTheme(darkMode);
};

// 改变主题
const UpdateTheme = (darkMode: any): void => {
  const store = useStore();
  store.commit('SystemConfig/setDarkMode', darkMode);
  updateDarkTheme(darkMode);
};

// 监听系统主题改变
export const WatchSystemTheme = (): void => {
  window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    // 如果当前系统主题模式为dark夜间模式
    const darkMode = e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    // 改变当前主题为默认模式
    UpdateTheme(darkMode);
  });
};

import { ref } from 'vue';
import { Locale } from 'vant';
import { LocaleType } from '/#/config';

// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';

// 引入简体中文语言包
import zhCN from 'vant/es/locale/lang/zh-CN';

// 引入香港繁体中文语言包
import zhHK from 'vant/es/locale/lang/zh-HK';

// 引入香港繁体中文语言包
import zhTW from 'vant/es/locale/lang/zh-TW';

// 引入日语语言包
import jaJP from 'vant/es/locale/lang/ja-JP';

// 切换UI库默认语言
export const setVantLocales = (lang: LocaleType): void => {
  const Locales = ref<object>({});
  switch (lang) {
    case 'zh_CN':
      Locales.value = zhCN;
      break;
    case 'en':
      Locales.value = enUS;
      break;

    case 'zh_HK':
      Locales.value = zhHK;
      break;

    case 'zh_TW':
      Locales.value = zhTW;
      break;

    case 'ja_JP':
      Locales.value = jaJP;
      break;
  }

  // 写入语言
  Locale.use(lang, Locales.value);
};

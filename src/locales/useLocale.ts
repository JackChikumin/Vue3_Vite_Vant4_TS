/**
 * Multi-language related operations
 */
import { i18n } from './setupI18n';
import { useStore } from '/@/store';
import { unref, computed } from 'vue';
import type { LocaleType } from '/#/config';
import { loadLocalePool, setHtmlPageLang } from './helper';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const store = useStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  store.commit('SystemConfig/setLocaleInfo', { locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const store = useStore();
  const getLocale = computed(() => store.getters['SystemConfig/getLocaleInfo'].locale);
  const getShowLocalePicker = computed(() => store.getters['SystemConfig/getLocaleInfo'].showPicker);

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
  };
}

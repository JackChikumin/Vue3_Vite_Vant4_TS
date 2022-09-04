import { genMessage } from '../helper';
import enUS from 'vant/es/locale/lang/en-US';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    enUS,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};

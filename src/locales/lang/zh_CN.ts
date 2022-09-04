import { genMessage } from '../helper';
import zhCN from 'vant/es/locale/lang/zh-CN';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    zhCN,
  },
};

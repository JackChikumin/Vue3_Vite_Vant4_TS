import dayjs from 'dayjs';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import pkg from './package.json';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import type { UserConfig, ConfigEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';

// 定义一个时间作为版本号
const Timestamp = new Date().getTime();

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // 导出环境配置
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  // 是否生产环境
  const isBuild = Object.is(command, 'build');

  return {
    // 公共路径
    base: VITE_PUBLIC_PATH,
    root,
    // 文件路径别名
    resolve: {
      alias: [
        // 处理控制台报错
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // 开发代理配置
    server: {
      https: true,
      // Listening on all local IPs
      host: true,
      // 端口
      port: VITE_PORT,
      // 启动完成调用浏览器打开
      open: false,
      // 代理配置
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    // 编译配置
    build: {
      // 指定编译工具
      minify: 'esbuild',
      // 指定编译语言版本类型
      target: 'es2016',
      cssTarget: 'chrome96',
      outDir: OUTPUT_DIR,
      // 静态资源路径
      assetsDir: 'assets',
      // 资源文件超过指定大小将转换为base64二进制文档流降低请求数量
      assetsInlineLimit: 4096,
      // CSS代码拆分
      cssCodeSplit: true,
      // 禁止生成source map 文件
      sourcemap: false,
      // 启用/禁用 brotli 压缩大小报告
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      // 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2048,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 打包文件拆分
        output: {
          chunkFileNames: () => {
            return `js/${pkg.name}.v${pkg.version}.[name].[hash].${Timestamp}.js`;
          },
          entryFileNames: () => {
            return `js/${pkg.name}.v${pkg.version}.[name].[hash].${Timestamp}.js`;
          },
          assetFileNames: () => {
            return `assets/${pkg.name}.v${pkg.version}.[name].[hash].${Timestamp}.[ext]`;
          },
        },
      },
      // 生产环境去除console和debuger
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // CSS配置
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    // 插件配置
    plugins: createVitePlugins(viteEnv, isBuild),
    // 依赖构建配置
    // optimizeDeps: {
    //   include: [
    //     '@vue/shared',
    //   ],
    // },
  };
};

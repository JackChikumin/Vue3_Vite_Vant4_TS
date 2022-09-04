// #!/usr/bin/env node
import chalk from 'chalk';
import pkg from '../../package.json';
import { runBuildConfig } from './buildConf';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }

    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - 编译成功!');
  } catch (error) {
    console.log(chalk.red('编译出错:\n' + error));
    process.exit(1);
  }
};
runBuild();

import { withInstall } from '/@/utils';

import appTabBar from './TabBar.vue';
import appNavBar from './NavBar.vue';
import appSuspended from './Suspended.vue';
import appThemePicker from './ThemePicker.vue';

export const NavBar = withInstall(appNavBar);
export const TabBar = withInstall(appTabBar);
export const Suspended = withInstall(appSuspended);
export const ThemePicker = withInstall(appThemePicker);

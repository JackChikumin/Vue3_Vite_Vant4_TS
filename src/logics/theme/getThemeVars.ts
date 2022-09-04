// 获取主题变量配置信息
export const getThemeVars = (Color: string) => {

  return {
    sliderBarHeight: '4px',
    sliderButtonWidth: '20px',
    sliderButtonHeight: '20px',
    sliderActiveBackground: Color,
    buttonPrimaryBackground: Color,
    buttonPrimaryBorderColor: Color,
    primaryColor: Color,
    // tabbar
    tabbarItemActiveColor: Color,
    // nabbar
    navBarIconColor: Color,
    navBarTextColor: Color,
  };
};

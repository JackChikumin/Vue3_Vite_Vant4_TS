export default {
  api: {
    operationFailed: '操作失败',
    Message: '系统提示',
    errorTip: '错误提示',
    errorMessage: '操作失败,系统异常!',
    timeoutMessage: '登录超时,请重新登录!',
    apiTimeoutMessage: '接口请求超时,请刷新页面重试!',
    apiRequestFailed: '请求出错，请稍候重试',
    networkException: '网络异常',
    networkExceptionMsg: '网络异常，请检查您的网络连接是否正常!',

    errMsg401: '用户没有权限（令牌、用户名、密码错误）!',
    errMsg403: '用户得到授权，但是访问是被禁止的。!',
    errMsg404: '网络请求错误,未找到该资源!',
    errMsg405: '网络请求错误,请求方法未允许!',
    errMsg408: '网络请求超时!',
    errMsg500: '服务器错误,请联系管理员!',
    errMsg501: '网络未实现!',
    errMsg502: '网络错误!',
    errMsg503: '服务不可用，服务器暂时过载或维护!',
    errMsg504: '网络超时!',
    errMsg505: 'http版本不支持该请求!',
  },
  app: { logoutTip: '温馨提醒', logoutMessage: '是否确认退出系统?', menuLoading: '菜单加载中...' },
  errorLog: {
    tableTitle: '错误日志列表',
    tableColumnType: '类型',
    tableColumnDate: '时间',
    tableColumnFile: '文件',
    tableColumnMsg: '错误信息',
    tableColumnStackMsg: 'stack信息',

    tableActionDesc: '详情',

    modalTitle: '错误详情',

    fireVueError: '点击触发vue错误',
    fireResourceError: '点击触发资源加载错误',
    fireAjaxError: '点击触发ajax错误',

    enableMessage: '只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效.',
  },
  exception: {
    backLogin: '返回登录',
    backHome: '返回首页',
    subTitle403: '抱歉，您无权访问此页面。',
    subTitle404: '抱歉，您访问的页面不存在。',
    subTitle500: '抱歉，服务器报告错误。',
    noDataTitle: '当前页无数据',
    networkErrorTitle: '网络错误',
    networkErrorSubTitle: '抱歉，您的网络连接已断开，请检查您的网络！',
  },
  darkMode: {
    mode: '夜间模式',
    light: '系统已自动为您切换到默认主题!',
    dark: '天色已晚,系统已自动为您切换到夜间模式!',
  },
};

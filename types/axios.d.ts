// 错误消息类型
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

// 请求配置
export interface RequestOptions {
  // 拼接请求参数到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  // 例如：当你需要获取响应头时使用这个属性
  isReturnNativeResponse?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址，留空使用默认的apiUrl
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  // 是否忽略取消令牌
  ignoreCancelToken?: boolean;
  // 是否在header中发送token
  withToken?: boolean;
}

// 请求接口返回数据类型配置
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

// 文件上传参数
export interface UploadFileParams {
  // 其他参数
  data?: Recordable;
  // 文件参数接口字段名称
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

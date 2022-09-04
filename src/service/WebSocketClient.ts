interface Ioptions {
  // token
  token?: string;
  // 发送心跳间隔时间
  heart_time?: number;
  //检查链接状态时间
  check_time?: number;
  //断线后重连间隔时间
  lock_time?: number;
}

const createSocket = (url: string, callback: (e: any) => void) => {
  class WebSocketClient {
    private url: string = url; //socket 地址
    private callback: (e: any) => void = callback;
    private heart_time = 3000; //心跳时间
    private check_time = 3000; //检查链接状态时间
    private lock_time = 4000; //重连时间
    public ws: WebSocket | undefined; //socket实例
    private h_timer: any; //心跳定时器
    private c_timer: any; //检查链接定时器
    private l_timer: any; //重连定时器
    private isLock = false; //重连锁
    private token: string | undefined; //token

    public init(options: Ioptions = {}): void {
      const { token, heart_time, check_time, lock_time } = options;

      if (token) {
        this.token = token;
      }

      if (heart_time) {
        this.heart_time = heart_time;
      }

      if (check_time) {
        this.check_time = check_time;
      }

      if (lock_time) {
        this.lock_time = lock_time;
      }

      if (this.url == '') {
        throw new Error('socket链接地址不能为空');
      }

      this.wsInit();
    }

    // 处理有token时的socket链接地址
    private getUrl(): string {
      if (this.token !== undefined) {
        return `${this.url}?token=${this.token}`;
      } else {
        return `${this.url}`;
      }
    }

    // 初始化socket
    public wsInit(): void {
      const ws = new WebSocket(this.getUrl());

      ws.onopen = () => {
        this.heartCheck();
      };

      ws.onclose = () => {
        this.reconnect();
      };

      ws.onerror = () => {
        this.reconnect();
      };

      ws.onmessage = (e) => {
        this.heartCheck();
        this.callback(e);
      };

      this.ws = ws;
    }

    // 心跳
    private heartCheck(): void {
      this.h_timer && clearTimeout(this.h_timer);
      this.c_timer && clearTimeout(this.c_timer);
      this.h_timer = setTimeout(() => {
        (this.ws as WebSocket).send('type:ping');
        this.c_timer = setTimeout(() => {
          if ((this.ws as WebSocket).readyState !== 1) {
            (this.ws as WebSocket).close();
          }
        }, this.check_time);
      }, this.heart_time);
    }

    // 重连
    private reconnect(): void {
      if (this.isLock) {
        return;
      }

      this.isLock = true;
      this.l_timer && clearTimeout(this.l_timer);
      this.l_timer = setTimeout(() => {
        this.wsInit();
        this.isLock = false;
      }, this.lock_time);
    }
  }

  return new WebSocketClient();
};

export { createSocket };

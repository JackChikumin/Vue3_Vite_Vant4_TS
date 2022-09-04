// 系统配置
interface UserState {
  // 令牌
  Token: string | null;
  // 用户是否自信修改过主题模式
  isUserDark: boolean;
}
const state: UserState = {
  // 令牌
  Token: null,
  // 用户是否自信修改过主题模式
  isUserDark: false,
};

// mutations
const mutations = {
  // 写入令牌
  setToken(state, payload: string): void {
    state.Token = payload;
  },
  // 用户是否自信修改过主题模式
  setUserDark(state, payload: string): void {
    state.isUserDark = payload;
  }
};

// getters
const getters = {
  // 获取Token
  getToken: (state: { Token: string | null }) => state.Token,
  // 获取用户是否自信修改过主题模式
  getUserDark: (state: { isUserDark: boolean }) => state.isUserDark,
};

// actions
const actions = {

};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
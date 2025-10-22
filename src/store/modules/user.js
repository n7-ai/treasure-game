import StorageService from '@/services/storage'

const state = {
  username: '',
  title: '',
  treasures: 0,
  leaderboard: [
    { id: 1, username: '冒险家艾伦', title: '宝藏猎人', progress: 95, treasures: 4 },
    { id: 2, username: '探险者莉娜', title: '古迹学者', progress: 87, treasures: 3 },
    { id: 3, username: '寻宝者马克', title: '地图专家', progress: 72, treasures: 2 },
    { id: 4, username: '考古学家索菲亚', title: '历史学家', progress: 65, treasures: 2 },
    { id: 5, username: '冒险新手汤姆', title: '见习探险家', progress: 30, treasures: 1 }
  ]
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.username = userInfo.username
    state.title = userInfo.title
  },
  INCREMENT_TREASURES(state) {
    state.treasures++
  },
  UPDATE_LEADERBOARD(state, leaderboard) {
    state.leaderboard = leaderboard
  },
  LOAD_USER_STATE(state, savedState) {
    if (savedState && savedState.user) {
      Object.assign(state, savedState.user)
    }
  }
}

const actions = {
  saveUserInfo({ commit, dispatch }, userInfo) {
    commit('SET_USER_INFO', userInfo)
    dispatch('saveGameState', null, { root: true })
  },
  
  incrementTreasures({ commit, dispatch }) {
    commit('INCREMENT_TREASURES')
    dispatch('saveGameState', null, { root: true })
  },
  
  loadUserState({ commit }) {
    const savedState = StorageService.loadState()
    if (savedState) {
      commit('LOAD_USER_STATE', savedState)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
import TreasureApi from '@/services/treasureApi'
import StorageService from '@/services/storage'

const state = {
  currentLocation: null,
  currentClue: '点击"开始探索"按钮开始你的冒险...',
  isExploring: false,
  treasureFound: false,
  locations: [
    { id: 1, name: '古老图书馆', icon: '📚', description: '尘封千年的图书馆，据说藏有寻找宝藏的关键线索。', progress: 0, clues: [] },
    { id: 2, name: '神秘神庙', icon: '🛕', description: '被丛林掩盖的古老神庙，传说中宝藏的最终藏匿地。', progress: 0, clues: [] },
    { id: 3, name: '远古遗迹', icon: '🏛️', description: '荒芜沙漠中的遗迹，隐藏着通往宝藏的地图。', progress: 0, clues: [] },
    { id: 4, name: '隐秘洞穴', icon: '🕳️', description: '瀑布后的隐秘洞穴，据说只有真正的探险家才能找到入口。', progress: 0, clues: [] },
    { id: 5, name: '沉没之城', icon: '🌊', description: '深埋海底的古城，传说中最后的宝藏所在地。', progress: 0, clues: [] }
  ]
}

const getters = {
  currentLocationProgress: (state) => {
    if (!state.currentLocation) return 0
    return state.currentLocation.progress
  },
  overallProgress: (state) => {
    const total = state.locations.reduce((sum, loc) => sum + loc.progress, 0)
    return Math.round(total / state.locations.length)
  }
}

const mutations = {
  SET_CURRENT_LOCATION(state, location) {
    state.currentLocation = location
  },
  SET_CURRENT_CLUE(state, clue) {
    state.currentClue = clue
  },
  SET_IS_EXPLORING(state, exploring) {
    state.isExploring = exploring
  },
  SET_TREASURE_FOUND(state, found) {
    state.treasureFound = found
  },
  UPDATE_LOCATION_PROGRESS(state, { locationId, progress }) {
    const location = state.locations.find(loc => loc.id === locationId)
    if (location) {
      location.progress = progress
    }
  },
  ADD_LOCATION_CLUE(state, { locationId, clue }) {
    const location = state.locations.find(loc => loc.id === locationId)
    if (location) {
      location.clues.push(clue)
    }
  },
  LOAD_GAME_STATE(state, savedState) {
    if (savedState && savedState.game) {
      Object.assign(state, savedState.game)
    }
  }
}

const actions = {
  async exploreLocation({ commit, state, dispatch }) {
    if (state.isExploring) return
    
    commit('SET_IS_EXPLORING', true)
    commit('SET_CURRENT_CLUE', '探索中...')
    
    try {
      let result
      const locationId = state.currentLocation.id
      
      switch(locationId) {
        case 1:
          result = await TreasureApi.getInitialClue()
          break
        case 2:
          result = await TreasureApi.searchTemple()
          break
        case 3:
          result = await TreasureApi.exploreAncientRuins()
          break
        case 4:
          result = await TreasureApi.navigateCave()
          break
        case 5:
          result = await TreasureApi.openTreasureBox()
          break
        default:
          result = "探索完成，但什么都没发现..."
      }
      
      commit('SET_CURRENT_CLUE', result)
      commit('ADD_LOCATION_CLUE', { locationId, clue: result })
      
      // 更新进度
      const newProgress = Math.min(state.currentLocation.progress + 25, 100)
      commit('UPDATE_LOCATION_PROGRESS', { locationId, progress: newProgress })
      
      // 检查是否找到宝藏
      if (result.includes('宝藏') || result.includes('宝箱')) {
        commit('SET_TREASURE_FOUND', true)
        dispatch('user/incrementTreasures', null, { root: true })
        setTimeout(() => {
          commit('SET_TREASURE_FOUND', false)
        }, 2000)
      }
      
      // 保存游戏状态
      dispatch('saveGameState')
      
    } catch (error) {
      commit('SET_CURRENT_CLUE', `探索失败: ${error}`)
    } finally {
      commit('SET_IS_EXPLORING', false)
    }
  },
  
  saveGameState({ state, rootState }) {
    const gameState = {
      game: { ...state },
      user: { ...rootState.user }
    }
    StorageService.saveState(gameState)
  },
  
  loadGameState({ commit }) {
    const savedState = StorageService.loadState()
    if (savedState) {
      commit('LOAD_GAME_STATE', savedState)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
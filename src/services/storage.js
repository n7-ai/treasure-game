const STORAGE_KEY = 'treasure_game_state'

class StorageService {
  static saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('保存游戏状态失败:', error)
    }
  }

  static loadState() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      return savedState ? JSON.parse(savedState) : null
    } catch (error) {
      console.error('加载游戏状态失败:', error)
      return null
    }
  }

  static clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('清除游戏状态失败:', error)
    }
  }
}

export default StorageService
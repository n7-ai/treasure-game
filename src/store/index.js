import { createStore } from 'vuex'
import game from './modules/game'
import user from './modules/user'

export default createStore({
  modules: {
    game,
    user
  }
})
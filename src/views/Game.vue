<template>
  <div class="game-container">
    <div class="game-content">
      <!-- 全景地图 -->
      <PanoramaMap 
        v-if="currentView === 'map'" 
        @location-selected="enterLocation"
      />
      
      <!-- 地点页面 -->
      <LocationPage 
        v-else-if="currentView === 'location'"
        :location="currentLocation"
        :clue="currentClue"
        :is-exploring="isExploring"
        @explore="exploreLocation"
        @back="showMap"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import PanoramaMap from '@/components/game/PanoramaMap.vue'
import LocationPage from '@/components/game/LocationPage.vue'

export default {
  name: 'Game',
  components: {
    PanoramaMap,
    LocationPage
  },
  setup() {
    const store = useStore()
    const currentView = ref('map')
    
    const currentLocation = computed(() => store.state.game.currentLocation)
    const currentClue = computed(() => store.state.game.currentClue)
    const isExploring = computed(() => store.state.game.isExploring)
    
    const enterLocation = (location) => {
      // 重置探索状态
      store.commit('game/SET_IS_EXPLORING', false)
      
      // 设置当前地点
      store.commit('game/SET_CURRENT_LOCATION', location)
      
      // 如果这个地点有之前的线索，显示最新的，否则显示默认
      if (location.clues && location.clues.length > 0) {
        store.commit('game/SET_CURRENT_CLUE', location.clues[location.clues.length - 1])
      } else {
        store.commit('game/SET_CURRENT_CLUE', '点击"开始探索"按钮开始你的冒险...')
      }
      
      currentView.value = 'location'
    }
    
    const showMap = () => {
      currentView.value = 'map'
    }
    
    const exploreLocation = () => {
      store.dispatch('game/exploreLocation')
    }
    
    // 监听当前地点的变化，确保线索正确显示
    watch(currentLocation, (newLocation) => {
      if (newLocation && newLocation.clues && newLocation.clues.length > 0) {
        store.commit('game/SET_CURRENT_CLUE', newLocation.clues[newLocation.clues.length - 1])
      }
    })
    
    return {
      currentView,
      currentLocation,
      currentClue,
      isExploring,
      enterLocation,
      showMap,
      exploreLocation
    }
  }
}
</script>

<style scoped>
.game-container {
  padding: 20px;
}

.game-content {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  padding: 30px;
  min-height: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
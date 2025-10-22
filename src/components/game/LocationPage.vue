<template>
  <div class="location-page">
    <h2 class="location-title">{{ location.name }}</h2>
    <p class="location-description">{{ location.description }}</p>
    
    <div class="progress-container">
      <p>探索进度: {{ currentLocationProgress }}%</p>
      <div class="progress-bar">
        <div class="progress" :style="{ width: currentLocationProgress + '%' }"></div>
      </div>
    </div>
    
    <div class="clue-container">
      <h3>探索发现</h3>
      <p class="current-clue">{{ clue }}</p>
    </div>
    
    <div class="action-buttons">
      <button 
        class="action-btn" 
        @click="$emit('explore')"
        :disabled="isExploring"
      >
        {{ isExploring ? '探索中...' : '开始探索' }}
      </button>
      
      <button class="action-btn secondary" @click="$emit('back')">
        返回地图
      </button>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LocationPage',
  props: {
    location: {
      type: Object,
      required: true
    },
    clue: {
      type: String,
      default: '点击"开始探索"按钮开始你的冒险...'
    },
    isExploring: {
      type: Boolean,
      default: false
    }
  },
  emits: ['explore', 'back'],
  setup(props) {
    const store = useStore()
    
    const currentLocationProgress = computed(() => {
      if (!props.location) return 0
      return props.location.progress
    })
    
    // 监听地点变化，确保每个地点有独立的线索
    watch(() => props.location, (newLocation) => {
      if (newLocation && newLocation.clues && newLocation.clues.length > 0) {
        // 如果有保存的线索，显示最新的
        store.commit('game/SET_CURRENT_CLUE', newLocation.clues[newLocation.clues.length - 1])
      } else {
        // 否则显示默认线索
        store.commit('game/SET_CURRENT_CLUE', '点击"开始探索"按钮开始你的冒险...')
      }
    })
    
    return {
      currentLocationProgress
    }
  }
}
</script>

<style scoped>
.location-page {
  text-align: center;
  padding: 20px;
}

.location-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
}

.location-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #ccc;
}

.progress-container {
  margin: 30px 0;
}

.progress-bar {
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ffcc00, #ff9900);
  border-radius: 10px;
  transition: width 0.5s;
}

.clue-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  min-height: 100px;
}

.clue-container h3 {
  color: #ffcc00;
  margin-bottom: 10px;
}

.current-clue {
  font-size: 1.1rem;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.action-btn {
  padding: 15px 30px;
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  border: none;
  border-radius: 8px;
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 204, 0, 0.6);
}

.action-btn:disabled {
  background: #666;
  color: #999;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.action-btn.secondary {
  background: linear-gradient(135deg, #666, #999);
  color: white;
}
</style>
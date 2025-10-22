<template>
  <div class="treasure-animation" v-if="visible">
    <div class="treasure-icon">💎</div>
    <div class="treasure-text">宝藏发现!</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TreasureAnimation',
  setup() {
    const store = useStore()
    const visible = ref(false)
    
    watch(
      () => store.state.game.treasureFound,
      (newVal) => {
        if (newVal) {
          visible.value = true
          setTimeout(() => {
            visible.value = false
          }, 2000)
        }
      }
    )
    
    return {
      visible
    }
  }
}
</script>

<style scoped>
.treasure-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  text-align: center;
  animation: treasureFound 2s ease-in-out;
}

.treasure-icon {
  font-size: 5rem;
  margin-bottom: 10px;
}

.treasure-text {
  font-size: 2rem;
  color: #ffcc00;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

@keyframes treasureFound {
  0% { 
    transform: translate(-50%, -50%) scale(0); 
    opacity: 0; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.5); 
    opacity: 1; 
  }
  100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 1; 
  }
}
</style>
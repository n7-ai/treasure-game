<template>
  <div class="panorama-container">
    <h2 class="map-title">神秘世界地图</h2>
    <p class="map-description">点击地图上的地点开始探索</p>
    
    <div class="map-background">
      <div 
        v-for="location in locations" 
        :key="location.id"
        :class="['location', `location-${location.id}`]"
        @click="selectLocation(location)"
        :title="location.name"
      >
        <div class="location-icon">{{ location.icon }}</div>
        <div class="location-name">{{ location.name }}</div>
        <div class="location-progress">{{ location.progress }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PanoramaMap',
  emits: ['location-selected'],
  setup(props, { emit }) {
    const store = useStore()
    
    const locations = computed(() => store.state.game.locations)
    
    const selectLocation = (location) => {
      emit('location-selected', location)
    }
    
    return {
      locations,
      selectLocation
    }
  }
}
</script>

<style scoped>
.panorama-container {
  position: relative;
  width: 100%;
  height: 500px;
  background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover;
  border-radius: 10px;
  overflow: hidden;
}

.map-title {
  text-align: center;
  color: #ffcc00;
  margin-bottom: 10px;
}

.map-description {
  text-align: center;
  margin-bottom: 20px;
  color: #ccc;
}

.map-background {
  position: relative;
  width: 100%;
  height: 100%;
}

.location {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(255, 204, 0, 0.7);
  border: 3px solid #ffcc00;
  box-shadow: 0 0 20px #ffcc00;
  text-align: center;
}

.location:hover {
  transform: scale(1.2);
  box-shadow: 0 0 30px #ffcc00;
}

.location-1 { top: 20%; left: 15%; }
.location-2 { top: 60%; left: 25%; }
.location-3 { top: 30%; left: 50%; }
.location-4 { top: 70%; left: 65%; }
.location-5 { top: 40%; left: 80%; }

.location-icon {
  font-size: 2rem;
  margin-bottom: 5px;
}

.location-name {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 2px;
}

.location-progress {
  font-size: 0.7rem;
  color: #333;
}
</style>
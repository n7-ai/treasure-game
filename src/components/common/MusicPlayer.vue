<template>
  <div class="music-controls">
    <div 
      class="music-control" 
      @click="toggleMusic" 
      @mouseenter="showVolumeControl = true"
      @mouseleave="hideVolumeControl"
      :title="isMuted ? '开启音乐' : '关闭音乐'"
    >
      <i>{{ isMuted ? '🔇' : '🔊' }}</i>
    </div>
    
    <div class="volume-control" v-if="showVolumeControl" @mouseenter="keepVolumeControl" @mouseleave="hideVolumeControl">
      <span class="volume-label">音量</span>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.1" 
        v-model="volume" 
        @input="changeVolume"
        class="volume-slider"
      >
      <span class="volume-percent">{{ Math.round(volume * 100) }}%</span>
    </div>
    
    <audio ref="audioElement" loop>
      <source :src="bgmUrl" type="audio/mpeg">
      您的浏览器不支持音频元素。
    </audio>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

// 使用您实际的文件名
import bgmMain from '@/assets/audio/Spade S - 星游记的奇迹 (Remix).MP3'

export default {
  name: 'MusicPlayer',
  setup() {
    const isMuted = ref(false)
    const audioElement = ref(null)
    const showVolumeControl = ref(false)
    const volume = ref(0.5)
    const bgmUrl = ref(bgmMain)
    let volumeControlTimer = null

    onMounted(() => {
      const savedMusicState = localStorage.getItem('musicPlaying')
      const savedVolume = localStorage.getItem('musicVolume')
      
      if (savedVolume) {
        volume.value = parseFloat(savedVolume)
      }
      
      if (audioElement.value) {
        audioElement.value.volume = volume.value
      }
      
      if (savedMusicState === 'true') {
        setTimeout(() => {
          playMusic()
        }, 1000)
      }
    })

    const playMusic = () => {
      if (audioElement.value && !isMuted.value) {
        audioElement.value.play().then(() => {
          isMuted.value = false
          localStorage.setItem('musicPlaying', 'true')
        }).catch(error => {
          console.log('播放失败，可能需要用户交互:', error)
        })
      }
    }

    const pauseMusic = () => {
      if (audioElement.value) {
        audioElement.value.pause()
        localStorage.setItem('musicPlaying', 'false')
      }
    }

    const toggleMusic = () => {
      if (isMuted.value) {
        isMuted.value = false
        playMusic()
      } else {
        isMuted.value = true
        pauseMusic()
      }
    }

    const changeVolume = () => {
      if (audioElement.value) {
        audioElement.value.volume = volume.value
        localStorage.setItem('musicVolume', volume.value.toString())
      }
    }

    const keepVolumeControl = () => {
      if (volumeControlTimer) {
        clearTimeout(volumeControlTimer)
      }
    }

    const hideVolumeControl = () => {
      volumeControlTimer = setTimeout(() => {
        showVolumeControl.value = false
      }, 500)
    }

    onUnmounted(() => {
      if (audioElement.value) {
        audioElement.value.pause()
      }
      if (volumeControlTimer) {
        clearTimeout(volumeControlTimer)
      }
    })

    return {
      isMuted,
      audioElement,
      showVolumeControl,
      volume,
      bgmUrl,
      toggleMusic,
      changeVolume,
      keepVolumeControl,
      hideVolumeControl
    }
  }
}
</script>

<style scoped>
.music-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.music-control {
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid #ffcc00;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.music-control:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.music-control i {
  font-size: 1.5rem;
  color: #ffcc00;
}

.volume-control {
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ffcc00;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.volume-label {
  color: #ffcc00;
  font-weight: bold;
  font-size: 0.9rem;
}

.volume-slider {
  width: 100%;
  cursor: pointer;
}

.volume-percent {
  color: white;
  font-size: 0.8rem;
}

audio {
  display: none;
}
</style>

<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <MusicPlayer />
    <TreasureAnimation />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import MusicPlayer from '@/components/common/MusicPlayer.vue'
import TreasureAnimation from '@/components/game/TreasureAnimation.vue'

export default {
  name: 'App',
  components: {
    Header,
    MusicPlayer,
    TreasureAnimation
  },
  mounted() {
    // 加载游戏状态
    this.$store.dispatch('game/loadGameState')
    this.$store.dispatch('user/loadUserState')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

body {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #fff;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
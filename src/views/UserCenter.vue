<template>
  <div class="user-center">
    <h2>用户中心</h2>
    
    <div class="user-sections">
      <!-- 用户信息 -->
      <UserProfile 
        :user="user"
        @save-user="saveUserInfo"
      />
      
      <!-- 排行榜 -->
      <Leaderboard 
        :leaderboard="leaderboard"
        :user-rank="userRank"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import UserProfile from '@/components/user/UserProfile.vue'
import Leaderboard from '@/components/user/Leaderboard.vue'

export default {
  name: 'UserCenter',
  components: {
    UserProfile,
    Leaderboard
  },
  setup() {
    const store = useStore()
    
    const user = computed(() => store.state.user)
    const leaderboard = computed(() => store.state.user.leaderboard)
    const overallProgress = computed(() => store.getters['game/overallProgress'])
    
    const userRank = computed(() => {
      // 计算用户在排行榜中的位置
      const userProgress = overallProgress.value
      const userTreasures = user.value.treasures
      
      // 简单计算排名
      return leaderboard.value.findIndex(player => 
        player.progress < userProgress || 
        (player.progress === userProgress && player.treasures < userTreasures)
      ) + 1 || leaderboard.value.length + 1
    })
    
    const saveUserInfo = (userInfo) => {
      store.dispatch('user/saveUserInfo', userInfo)
    }
    
    return {
      user,
      leaderboard,
      userRank,
      saveUserInfo
    }
  }
}
</script>

<style scoped>
.user-center {
  padding: 20px;
}

.user-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .user-sections {
    grid-template-columns: 1fr;
  }
}
</style>
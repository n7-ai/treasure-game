<template>
  <div class="user-profile">
    <h3>用户信息</h3>
    
    <div class="user-form">
      <div class="form-group">
        <label>用户名</label>
        <input 
          type="text" 
          v-model="localUser.username" 
          placeholder="输入您的用户名"
        >
      </div>
      
      <div class="form-group">
        <label>探险家称号</label>
        <input 
          type="text" 
          v-model="localUser.title" 
          placeholder="输入您的称号"
        >
      </div>
      
      <button class="save-btn" @click="saveUser">保存用户信息</button>
    </div>
    
    <div class="user-stats">
      <h4>探险统计</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ user.treasures }}</div>
          <div class="stat-label">发现宝藏</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ overallProgress }}%</div>
          <div class="stat-label">总体进度</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['save-user'],
  setup(props, { emit }) {
    const store = useStore()
    
    const localUser = ref({
      username: props.user.username,
      title: props.user.title
    })
    
    const overallProgress = computed(() => store.getters['game/overallProgress'])
    
    const saveUser = () => {
      if (!localUser.value.username.trim()) {
        alert('请输入用户名')
        return
      }
      
      emit('save-user', localUser.value)
    }
    
    return {
      localUser,
      overallProgress,
      saveUser
    }
  }
}
</script>

<style scoped>
.user-profile {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.user-profile h3 {
  color: #ffcc00;
  margin-bottom: 20px;
  text-align: center;
}

.user-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ffcc00;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.save-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  border: none;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
}

.user-stats h4 {
  color: #ffcc00;
  margin-bottom: 15px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-item {
  background: rgba(255, 204, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ffcc00;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
}
</style>
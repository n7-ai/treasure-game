<template>
  <div class="leaderboard">
    <h3>探险家排行榜</h3>
    
    <div class="user-rank" v-if="userRank">
      <h4>您的排名: 第 {{ userRank }} 名</h4>
    </div>
    
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>排名</th>
          <th>用户名</th>
          <th>称号</th>
          <th>进度</th>
          <th>宝藏</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(player, index) in leaderboard" 
          :key="player.id"
          :class="`rank-${index + 1}`"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ player.username }}</td>
          <td>{{ player.title }}</td>
          <td>
            <div class="progress-cell">
              <span>{{ player.progress }}%</span>
              <div class="mini-progress">
                <div class="mini-progress-bar" :style="{ width: player.progress + '%' }"></div>
              </div>
            </div>
          </td>
          <td>{{ player.treasures }}个</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  props: {
    leaderboard: {
      type: Array,
      required: true
    },
    userRank: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.leaderboard {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.leaderboard h3 {
  color: #ffcc00;
  margin-bottom: 20px;
  text-align: center;
}

.user-rank {
  background: rgba(255, 204, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table th,
.leaderboard-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.leaderboard-table th {
  background: rgba(255, 204, 0, 0.3);
  color: #ffcc00;
}

.rank-1 {
  background: rgba(255, 215, 0, 0.3);
}

.rank-2 {
  background: rgba(192, 192, 192, 0.3);
}

.rank-3 {
  background: rgba(205, 127, 50, 0.3);
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mini-progress {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.mini-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ffcc00, #ff9900);
  border-radius: 4px;
  transition: width 0.3s;
}
</style>
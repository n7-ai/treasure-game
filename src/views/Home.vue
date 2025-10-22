<template>
  <div class="home">
    <h1>欢迎来到神秘寻宝之旅</h1>
    <p>准备好开始你的冒险了吗？</p>
    <router-link to="/game" class="start-btn">开始寻宝</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

.start-btn {
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  transition: all 0.3s;
}

.start-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 204, 0, 0.6);
}
</style>
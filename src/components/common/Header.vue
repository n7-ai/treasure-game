<template>
  <header class="app-header">
    <h1>神秘寻宝之旅</h1>
    <p class="subtitle">探索古老遗迹，解开千年谜题，寻找失落宝藏</p>
    <nav class="main-nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/game" class="nav-link">开始寻宝</router-link>
      <router-link to="/user" class="nav-link">用户中心</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.app-header {
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 15px 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 0 0 10px #ffcc00;
}

.subtitle {
  font-size: 1.2rem;
  color: #ffcc00;
  margin-bottom: 20px;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  padding: 10px 20px;
  background: rgba(255, 204, 0, 0.2);
  border: 2px solid #ffcc00;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  background: rgba(255, 204, 0, 0.4);
  transform: translateY(-3px);
}
</style>
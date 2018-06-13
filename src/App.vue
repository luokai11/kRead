<template>
  <div id="app">
    <div class="container">
       <navigation>
          <router-view></router-view>
       </navigation>
    </div>
    <Meu v-show="$route.meta.showMeu"></Meu>
  </div>
</template>

<script>
import Meu from '@/components/plug/Meu';
export default {
  name: 'App',
  components:{
    Meu
  }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
}

#app {
  font-size: 16px;
  font-family: SimSun;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>

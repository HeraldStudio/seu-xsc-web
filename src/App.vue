<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      idsTicket: "",
      wechatCode: ""
    };
  },
  created() {
    
  }
};
</script>

<style>
body {
  margin:0;
  padding:0;
  background:#f0f0f0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}
</style>

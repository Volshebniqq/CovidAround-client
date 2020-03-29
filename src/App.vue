<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { trackUserLocation } from './services/geolocation';
export default {
  created() {
    trackUserLocation();
    this.$options.sockets.onmessage = (data) => {
      try {
        const msg = JSON.parse(data.data);
        if (msg.type === 'notifications') {
          console.log(msg.data);
          this.$store.commit('setNotifications', msg.data);
        }
      } catch(e) {}
    };
    setTimeout(() => {
    this.$socket.send(JSON.stringify({type: "notifications", userId: "1111222233334444"}));
    }, 2000)
  }
}
</script>

<style lang="scss">
* {
  font-family: Arial;
  color: #191919;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>

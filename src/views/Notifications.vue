<template>
  <div class="notifications-container">
    <img src="logo.png" alt="" class="logo">
    <h2>Welcome to Covid Around.</h2>
    <p v-if="contactDate">You had a contact with infected person on {{ contactDate }}</p>
    <GmapMap
      :center="mapCenter"
      :zoom="16"
      :options="{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
    <GmapCircle
      :center="{ lat: threat1.lat, lng: threat1.long }"
      :radius="threat1.count * 40"
      :options="{strokeColor: '#FF0000',
              strokeOpacity: 0.1,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.4,}"
    />
    <GmapCircle
      :center="{ lat: threat2.lat, lng: threat2.long }"
      :radius="threat1.count * 40"
      :options="{strokeColor: 'orange',
              strokeOpacity: 0.1,
              strokeWeight: 2,
              fillColor: 'orange',
              fillOpacity: 0.4,}"
    />
    <GmapPolyline 
      :path="userPath"
      :options="{strokeColor: 'blue',
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: 'blue',
              fillOpacity: 1,}" />
      <template v-for="(notification, idx) in notifications">
        <GmapCircle
          :key="`${idx}1`"
          :center="{ lat: notification.slat, lng: notification.slong }"
          :radius="10"
          :options="{strokeColor: 'blue',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'blue',
                  fillOpacity: 1,}"
        />
      </template>
</GmapMap>
  </div>
</template>

<script>
import { getUserLocations } from '@/services/geolocation';
export default {
  data() {
    return {
      userPosition: {}
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(data => {
      this.userPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      }
    });
  },
  computed: {
    notifications() {
      return this.$store.state.notifications.map(el => {
        return {
          ...el,
          slat: Number(el.slat),
          slong: Number(el.slong),
          lat: Number(el.lat),
          long: Number(el.long)
        }
      });
    },
    contactDate() {
      if (!this.notifications.length) return '';
      const date = new Date(this.notifications[0].timestamp);
      return this.formatTwoDigit(date.getDate()) + '.' + this.formatTwoDigit(date.getMonth() + 1) + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    userPath() {
      return this.notifications.map(el => {
        return {
          lat: el.slat,
          lng: el.slong
        }
      });
    },
    threat1() {
      let count = 0;
      const data = this.notifications.reduce((acc, el) => { 
        if (el.threat == 1) {
          count++;
          acc.lat += el.lat;
          acc.long += el.long;
        }
        return acc;
      }, { lat: 0, long: 0 });
      return {
        count,
        lat: data.lat / count,
        long: data.long / count
      }
    },
    threat2() {
      let count = 0;
      const data = this.notifications.reduce((acc, el) => { 
        if (el.threat == 2) {
          count++;
          acc.lat += el.lat;
          acc.long += el.long;
        }
        return acc;
      }, { lat: 0, long: 0 });
      return {
        count,
        lat: data.lat / count,
        long: data.long / count
      }
    },
    mapCenter() {
      if (this.notifications.length) {
        console.log(this.notifications);
        return {
          lat: this.notifications[0].slat,
          lng: this.notifications[0].slong
        }
      } else {
        return this.userPosition;
      }
    }
  },
  methods: {
    formatTwoDigit(d) {
      return ('00' + d).slice(-2);
    },
  }
}
</script>

<style lang="scss" scoped>
  .notifications-container {
    margin: 0 auto;
    min-width: 320px;
    max-width: 800px;
    padding: 15px;
    text-align: center;
    .logo {
      display: inline-block;
    }
    h2 {
      font-size: 18px;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
</style>
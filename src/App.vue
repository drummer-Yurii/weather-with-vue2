<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      APIkey: "6992d12cfcf737e0568f3ad5c5898cbe",
      city: "Detroit"
    }
  },
  created() {
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.APIkey}`
      ).then(res => {
        console.log(res.data);
      })
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
</style>

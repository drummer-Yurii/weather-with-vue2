<template>
  <div class="main">
    <NavigationVue />
    <router-view v-bind:cities="cities"/>
  </div>
</template>

<script>
import axios from 'axios'
import db from './firebase/firebaseinit';
import NavigationVue from './components/NavigationVue.vue'
export default {
  name: "App",
  components: {
    NavigationVue
  },
  data() {
    return {
      APIkey: "6992d12cfcf737e0568f3ad5c5898cbe",
      cities: []
    }
  },
  created() {
    this.getCityWeather()
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection('cities');

      firebaseDB.onSnapshot(snap => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&APPID=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data
              })
                .then(() => {
                this.cities.push(doc.doc.data());
              })
            } catch (err) {
              console.log(err);
            }
          }
        })
      })
    },
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

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
}
</style>

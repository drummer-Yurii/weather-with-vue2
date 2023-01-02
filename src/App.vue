<template>
  <div class="main">
    <ModalVue v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <NavigationVue v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />
    <router-view v-bind:cities="cities" v-bind:edit="edit" :APIkey="APIkey" />
  </div>
</template>

<script>
import axios from 'axios'
import db from './firebase/firebaseinit';
import NavigationVue from './components/NavigationVue.vue'
import ModalVue from './components/ModalVue.vue';
export default {
  name: "App",
  components: {
    NavigationVue,
    ModalVue
  },
  data() {
    return {
      APIkey: "6992d12cfcf737e0568f3ad5c5898cbe",
      cities: [],
      modalOpen: null,
      edit: null
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
          if (doc.type === 'added' && !doc.doc.Nd) {
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
          } else if (doc.type === 'added' && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === 'removed') {
            this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
          }
        })
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
    toggleEdit() {
      this.edit = !this.edit
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

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
}
</style>

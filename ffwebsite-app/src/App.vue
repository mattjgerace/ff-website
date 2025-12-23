<template>

<nav class="navbar navbar-expand-lg navbar-light thead">
  <a class="navbar-brand">LCDS '19 League Website</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Leaderboard')" :style="[component === 'Leaderboard' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Leaderboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Records')" :style="[component === 'Records' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Records</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Opponents')" :style="[component === 'Opponents' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Opponents</a>
      </li> -->
      <!--
      <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Rosters')" :style="[component === 'Rosters' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Rosters</a>
      </li>
      !-->
    </ul>
  </div>
</nav>
  <div class="content">
    <MyLeaderboard v-if="component === 'Leaderboard'"></MyLeaderboard>
    <MyRoster v-if="component === 'Rosters'"></MyRoster>
    <MyRecords v-if="component === 'Records'"></MyRecords>
    <MyOpponents v-if="component === 'Opponents'"></MyOpponents>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyLeaderboard from './components/leaderboard/MyLeaderboard.vue';
import MyRoster from './components/MyRoster.vue';
import MyRecords from './components/MyRecords.vue';
import MyOpponents from './components/MyOpponents.vue';

export default defineComponent({
  name: 'App',
  components: { MyLeaderboard, MyRoster, MyOpponents, MyRecords },
  
  data() {
    return {
      name: 'mattjgerace@gmail.com',
      component: 'Leaderboard'
    }
  },
  methods: {
    changeComponent(component: string) {
      this.component = component
    }
    
  }
});
</script>

<style>

</style>

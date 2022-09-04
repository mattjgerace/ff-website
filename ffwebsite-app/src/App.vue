<template>

<nav class="navbar navbar-expand-lg navbar-light thead">
  <a class="navbar-brand">League Website</a>
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
      <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Opponents')" :style="[component === 'Opponents' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Opponents</a>
      </li>
      <!--
      <li class="nav-item">
        <a class="nav-link" @click="changeComponent('Rosters')" :style="[component === 'Rosters' ? {'text-decoration': 'underline'} : {'text-decoration': ''}]">Rosters</a>
      </li>
      !-->
    </ul>
  </div>
</nav>
  <div class="content">
    <MyTable v-if="component === 'Leaderboard'"></MyTable>
    <MyRoster v-if="component === 'Rosters'"></MyRoster>
    <MyOpponents v-if="component === 'Opponents'"></MyOpponents>
    <MyRecords v-if="component === 'Records'"></MyRecords>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyTable from './components/MyTable.vue';
import MyRoster from './components/MyRoster.vue';
import MyOpponents from './components/MyOpponents.vue';
import MyRecords from './components/MyRecords.vue';

export default defineComponent({
  name: 'App',
  components: { MyTable, MyRoster, MyOpponents, MyRecords },
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

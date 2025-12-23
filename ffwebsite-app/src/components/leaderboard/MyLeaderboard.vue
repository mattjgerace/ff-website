<script setup lang="ts">

import { ref, shallowRef, watch } from 'vue'
import MyTable from './MyTable.vue';
import MyBracket from './MyBracket.vue';
import MyDraft from './MyDraft.vue';

import { onMounted } from 'vue'
// import ffWebsiteAPI from '../../services/ff-website-api'

onMounted(() => {
console.log("Leaderboard is mounted")
});

const tables = [
  { name: 'MyTable', comp: MyTable }, 
  { name: 'MyDraft', comp: MyDraft },
  { name: 'MyBracket', comp: MyBracket },
]

const per = ref(false)
const ppg = ref(false)

const currentYear = ref("Year:");
const currentStat = ref("Regular Season");
const currentLowWeek = ref(1);
const currentHighWeek = ref(14);

function updateValues(payload: { stat?: string; lowerWeek?: number; higherWeek?: number }) {
  if (payload.stat !== undefined) currentStat.value = payload.stat;
  if (payload.lowerWeek !== undefined) currentLowWeek.value = payload.lowerWeek;
  if (payload.higherWeek !== undefined) currentHighWeek.value = payload.higherWeek;
}

let currentTable = shallowRef(tables[0]);

let avg = shallowRef('Total Points');
let perc = shallowRef('Record');
let avgWidth = ref('126px')
let percWidth = ref('90px')

watch(() => currentYear.value, (newYear) => {
  if (newYear == 'Year:' || newYear == 'All Time') {
    avgWidth.value = '126px'
    percWidth.value = '90px'
  }
  else {
    avgWidth.value = '221px'
    if (currentHighWeek.value < 100) {
      percWidth.value = '184px'
    }
    else {
      percWidth.value = '176px'
    }
  }

})


watch(() => currentHighWeek.value, (newHighWeek) => {
  if (newHighWeek<100) {
    activeColor.value = 'white'
    percWidth.value = '184px'
  }
  else {
    activeColor.value = '#013369'
    percWidth.value = '176px'
  }
})

interface selectdataInfo {
    select: string,
}

let yearoptions: Array<selectdataInfo> = [
    {select: "All Time"},
    {select: "2025"},
    {select: "2024"},
    {select: "2023"},
    {select: "2022"},
    {select: "2021"},
    {select: "2020"},
    {select: "2019"},
    {select: "2018"},
    {select: "2017"},
    {select: "2016"},
    {select: "2015"},
  ]

let weekoptions: Array<selectdataInfo> = [
    {select: "1"},
    {select: "2"},
    {select: "3"},
    {select: "4"},
    {select: "5"},
    {select: "6"},
    {select: "7"},
    {select: "8"},
    {select: "9"},
    {select: "10"},
    {select: "11"},
    {select: "12"},
    {select: "13"},
    {select: "14"},
    {select: "15"},
    {select: "16"},
    {select: "17"},
    {select: "18"},
  ]

let statsoptions: Array<selectdataInfo> = [
  {select: "Regular Season"},
  {select: "Postseason"},
  {select: "Combined"}
]

function goBack() {
  currentTable.value = tables[0];
}

// function changeStat(event: any) {
//   if (!(currentYear.value=='All Time' || currentYear.value=='Year:'))
//     switch(event.target.value) {
//       case ("Combined"): { 
//           currentLowWeek.value = 1
//           currentHighWeek.value = 17
//           break;
//       }
//       case ("Postseason"): {
//         currentLowWeek.value = 15
//         currentHighWeek.value = 17
//         break; 
//       } 
//       default: {
//         currentLowWeek.value = 1
//         currentHighWeek.value = 14
//         break;
//       }
//     }
// }

let activeColor = ref('white')

function changePerc(event: Event) {
  const target = event.target as HTMLButtonElement;
  if (target != null) {
    target.disabled = true
    if (per.value == true) {
      per.value = false
      perc.value = "Record";
    }
    else {
      per.value = true
      perc.value = "Winning %";
    }
    target.disabled = false
  }
}

function changeAvg(event: Event) {
  const target = event.target as HTMLButtonElement;
  if (target != null) {
    target.disabled = true
    if (ppg.value == true) {
      ppg.value = false
      avg.value = "Total Points";
    }
    else {
      ppg.value = true
      avg.value = "Points Per Game";
    }
    target.disabled = false
  }
}

function showBrac() {
  currentTable.value = tables[2];
}

function showDraft() {
  currentTable.value = tables[1];
}

  

</script>

<template>
  <div class="select">
  <select v-model="currentYear" name="year" id="year">
    <option disabled :selected="currentYear == 'Year:'">Year:</option>
    <option :disabled="(currentTable.comp == MyDraft || currentTable.comp == MyBracket) && (year.select =='All Time')" v-for="year in yearoptions" :value="year.select" :key="year.select">{{year.select}}</option>
  </select>
  <select v-if="currentTable.comp == MyTable" v-model="currentStat" name="stat" id="stat">
    <option v-for="stats in statsoptions" :value="stats.select" :key="stats.select">{{stats.select}}</option>
  </select>
  <select v-if="currentTable.comp == MyTable && !(currentYear =='All Time' || currentYear =='Year:')" v-model="currentLowWeek" name="week" id="week">
    <option v-for="week in weekoptions" :disabled="Number(week.select) >= Number(currentHighWeek)" :value="week.select" :key="week.select">Week {{week.select}}</option>
  </select>
  <p v-if="currentTable.comp == MyTable && !(currentYear =='All Time' || currentYear =='Year:') && currentHighWeek!=100">-</p>
  <select v-if="currentTable.comp == MyTable && !(currentYear =='All Time' || currentYear =='Year:')" v-model="currentHighWeek" :style="{ 'background': activeColor }" name="week" id="week">
    <option :value=100></option>
    <option v-for="week in weekoptions" :disabled="Number(week.select) <= currentLowWeek" :value="week.select" :key="week.select">Week {{week.select}}</option>
  </select>
  <button v-if="currentTable.comp == MyDraft" id="brac" name="back" class="btn btn-light" @click="goBack()">Back</button>
  <button v-if="currentYear != 'Year:' && currentYear != 'All Time' && currentTable.comp != MyDraft" id="draft" name="draft" class="btn btn-light" @click="showDraft()">Draft Recap</button>
  </div>
  <div class="select">
  <button v-if="currentTable.comp == MyTable" id="avg" name="avg" class="btn btn-secondary" @click="changeAvg($event)">{{avg}}</button>
  <button v-if="currentTable.comp == MyTable" id="perc" name="perc" class="btn btn-secondary" @click="changePerc($event)">{{perc}}</button>

  <button v-if="currentYear != 'Year:' && currentYear != 'All Time' && currentTable.comp != MyBracket" id="brac" name="brac" class="btn btn-light" @click="showBrac()">Playoff Bracket</button>
  <button v-if="currentTable.comp == MyBracket" id="brac" name="back" class="btn btn-light" @click="goBack()">Back</button>
  </div>

  <component :is="currentTable.comp" :year="currentYear" :lowerWeek="currentLowWeek" :higherWeek="currentHighWeek" :stat="currentStat" :ppg="ppg" :per="per" @update-values="updateValues"></component>

</template>

<style scoped>
.material-icons {
    vertical-align: -6px;
}

th {
    cursor: pointer;
}

p {
   display:inline;
   margin-right: 5px;
}

.select {
  margin-bottom: 15px;
}
#year {
  margin-right: 5px;
}
#week {
  margin-right: 5px;
}
#stat {
  margin-right: 5px;
}
#avg {
  font-size:12px;
  padding-bottom: -5px;
  width: v-bind('avgWidth');
}
#perc {
  font-size:12px;
  padding-bottom: -5px;
  width: v-bind('percWidth');
  margin-left: 5px;
}
#draft {
height:35px;
width:200px;
font-size: 15px;
float:right;
}
#brac {
height:35px;
width:200px;
font-size: 15px;
float:right;
}

</style>
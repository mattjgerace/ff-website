<template>
<h2 class="rhead">{{recordData[tableref].record}}</h2>
<div class="dir">
<button :disabled="tableref==0" id="prev" name="prev" class="btn btn-light" @click="switchTable(tableref, 'prev')">Previous</button>
<button :disabled="tableref==recordData.length-1" id="next" name="next" class="btn btn-light" @click="switchTable(tableref, 'next')">Next</button>
</div>
<div id="recordtables">
  <table class="table table-light table-striped">
    <col style="width: 50px;"/>
    <thead class="thead">
      <tr>
        <th class="thead" scope="col">
        </th>
        <th class="thead" scope="col">
          Points
        </th>
        <th class="thead" scope="col">
          Team
        </th>
        <th class="thead" scope="col">
          Year
        </th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="row.score">
        <td>{{ index+1 }}.</td>
        <td>{{ row.score.toFixed(2)  }}</td>
        <td>{{ row.team  }}</td>
        <td>{{ row.year  }}</td>
      </tr>
    </tbody>
  </table>
  
  </div>
</template>

<script lang="ts">
import axios from "axios";
const target = "http://localhost:3030";
const headers = { 
  "Content-Type": "application/json",
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true'
};

import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: "MyRecords",
    data() {
        interface rdata {
        record: string
        }

        let recordData: Array<rdata> = [
            {record: "Top 15 Points For Single Regular Season"},
            {record: "Top 15 Points Per Game Single Regular Season"},
            {record: "Top 50 Highest Single Game Scores"},

        ]

        interface rdataInfo {
        score: number
        team: string
        year: string
        }

        let top10pfdata: Array<rdataInfo> = []
        const tableData = ref(top10pfdata);

        let tableref = 0;
        return {recordData, tableData, tableref}
    },
    methods: {
    getData: function(sort: string) {
      const payload = {
        year: "",
        stats: "Record",
        perc: "",
        sort: sort,
        avg: ""
      }
      axios.post(target, payload, { headers }).then((response)=>{
      this.tableData = response.data;
      })
      .catch(function (error) {
      console.log(error);
      });
    },
    switchTable: function(tableref: number, dir: string) {
        if (dir == 'next') {
            this.tableref = tableref = tableref + 1;
        }
        if (dir == 'prev') {
            this.tableref = tableref = tableref - 1;
        }
        if (tableref == 0) {
        /*
        this.tableData = [
          {score: "1,743.88", team: "Matthew Berkenstock", year: "2020"},
          {score: "1,723.60", team: "Thomas Westbrook", year: "2019"},
          {score: "1,709.06", team: "Seth Winters", year: "2020"},
          {score: "1,692.85", team: "Matt Gerace", year: "2019"},
          {score: "1,663.75", team: "David Del Terzo", year: "2018"},
          {score: "1,638.76", team: "Noah Raymond", year:"2020"},
          {score: "1,610.70", team: "Luke Walling", year:"2019"},
          {score: "1,608.32", team: "Luke Walling", year:"2020"},
          {score: "1,594.18", team: "Konrad Lojewski", year:"2020"},
          {score: "1,593.89", team: "David Del Terzo", year:"2020"},
        ]
        */
        this.getData('pf');
        }
        if (tableref == 1) {
        /*
        this.tableData = [
          {score: "138.65", team: "David Del Terzo", year: "2018"},
          {score: "134.14", team: "Matt Berkenstock", year: "2020"},
          {score: "132.58", team: "Thomas Westbrrok", year: "2019"},
          {score: "131.47", team: "Seth Winters", year: "2020"},
          {score: "130.22", team: "Matt Gerace", year: "2019"},
          {score: "126.90", team: "Luke Walling", year:"2018"},
          {score: "126.06", team: "Noah Raymond", year:"2020"},
          {score: "125.63", team: "Matt Gerace", year:"2018"},
          {score: "123.90", team: "Luke Walling", year:"2019"},
          {score: "123.72", team: "Luke Walling", year:"2020"},
        ]
        */
          this.getData('ppg');
        }
        if (tableref == 2) {
        
          this.getData('score');
        }
      },
    },
    created() {
      this.getData('pf');
    }
  })
</script>

<style scoped>
.rhead {
    margin-bottom: 25px;
}

#next {
    margin-left: 10px;
}
</style>
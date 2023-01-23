<template>
  <div class="select">
  <select v-model="year_selected" name="year" id="year" @change="changeTable()">
    <option disabled :selected="year_selected == 'Year:'">Year:</option>
    <option v-for="year in yeardata" :value="year.select" :key="year.select">{{year.select}}</option>
  </select>

  <select v-if="brac == 'hide' && draf == 'hide'" v-model="stats_selected" name="stats" id="stats" @change="changeTable()">
    <option v-for="stats in statsdata" :value="stats.select" :key="stats.select">{{stats.select}}</option>
  </select>
  <button v-if="draf == 'show'" id="draft" name="back" class="btn btn-light" @click="goBack()">Back</button>
  <button v-if="year_selected != 'Year:' && year_selected != 'All Time' && draf =='hide'" id="draft" name="draft" class="btn btn-light" @click="showDraf()">Draft Recap</button>
  </div>
  <div class="select">
  <button v-if="brac == 'hide' && draf == 'hide'" id="avg" name="avg" class="btn btn-secondary" @click="changeAvg()">{{avg}}</button>
  <button v-if="brac == 'hide' && draf == 'hide'" id="perc" name="perc" class="btn btn-secondary" @click="changePerc()">{{perc}}</button>
  <button v-if="year_selected != 'Year:' && year_selected != 'All Time' && brac == 'hide'" id="brac" name="brac" class="btn btn-light" @click="showBrac()">Playoff Bracket</button>
  <button v-if="brac == 'show'" id="brac" name="back" class="btn btn-light" @click="goBack()">Back</button>
  </div>

  <table v-if="brac=='hide' && draf=='hide'" class="table table-light table-striped">
    <thead class="thead">
      <tr>
        <th @click="sortByColumn('standing')" class="thead" scope="col">
          {{names["Standing"]}}
          <span v-if="sortColumn == 'standing'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th v-if="year_selected=='All Time' || year_selected=='Year:'" @click="sortByColumn('avgstand')" class="thead" scope="col">
          Avg Standing
          <span v-if="sortColumn == 'avgstand'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th class="thead" scope="col">
          Team
        </th>
        <th @click="sortByColumn('record')" class="thead" scope="col">
          {{names["Record"]}}
          <span v-if="sortColumn == 'record'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('pf')" class="thead" scope="col">
          {{names["PF"]}}
          <span v-if="sortColumn == 'pf'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('pa')" class="thead" scope="col">
          {{names["PA"]}}
          <span v-if="sortColumn == 'pa'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('diff')" class="thead" scope="col">
          {{names["Diff"]}}
          <span v-if="sortColumn == 'diff'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('ww')" class="thead" scope="col">
          {{names["Weeks Won"]}}
          <span v-if="sortColumn == 'ww'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('seed')" class="thead" scope="col">
          {{names["Seed"]}}
          <span v-if="sortColumn == 'seed'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
        <th @click="sortByColumn('dp')" class="thead" scope="col">
          {{names["Draft Position"]}}
          <span v-if="sortColumn == 'dp'" class="material-icons">{{
            arrowIconName
          }}</span>
          <span v-else class="material-icons">sort</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData" :key="row.team">
        <td>{{ row.standing }}</td>
        <td v-if="year_selected=='All Time' || year_selected=='Year:'">{{ row.avgstand.toFixed(1) }}</td>
        <td>{{ row.team }}</td>
        <td>{{ row.record }}</td>
        <td>{{ row.pf.toFixed(2) }}</td>
        <td>{{ row.pa.toFixed(2) }}</td>
        <td>{{ row.diff.toFixed(2) }}</td>
        <td>{{ row.ww }}</td>
        <td>{{ row.seed }}</td>
        <td>{{ (year_selected=='All Time' || year_selected=='Year:') ? row.dp.toFixed(1) : row.dp}}</td>
      </tr>
    </tbody>
  </table>
  <MyBracket v-if="brac=='show'" :year="year_selected" :tableData="tableData"> </MyBracket>
  <MyDraft v-if="draf=='show'" :year="year_selected"> </MyDraft>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyBracket from './MyBracket.vue';
import MyDraft from './MyDraft.vue';
import axios from "axios";
const target = `${process.env.BACKEND}:${process.env.BACKEND_PORT}` //http://localhost:3030/;
const headers = { 
  "Content-Type": "application/json",
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true'
};

export default defineComponent({
    name: "MyTable",
    components: { MyBracket, MyDraft },
    props: ['year'],
    data() {
        interface lbdataInfo {
        standing: number,
        team: string,
        record: string,
        pf: number,
        pa: number,
        diff: number,
        ww: number,
        seed: number,
        dp: number,
        avgstand: number,
        }

        interface selectdataInfo {
          select: string,
        }

        let yeardata: Array<selectdataInfo> = [
          {select: "All Time"},
          {select: "2021"},
          {select: "2020"},
          {select: "2019"},
          {select: "2018"},
          {select: "2017"},
          {select: "2016"},
          {select: "2015"},
        ]

        let statsdata: Array<selectdataInfo> = [
          {select: "Regular Season"},
          {select: "Postseason"},
          {select: "Combined"}
        ]

        let year_selected = "Year:";
        let stats_selected = "Regular Season";
        let avg = 'Points Per Game';
        let perc = 'Winning %';
        let brac = 'hide';
        let draf = 'hide';
        let names = {"Record": "Record", "PF": "PF", "PA": "PA", "Diff": "Diff", "Standing": "Championships", "Weeks Won": "Seasons Won", "Draft Position": "Avg Draft Pos.", "Seed": "Weeks Won"};

        let lbdata: Array<lbdataInfo> = [];
        
        const tableData = ref(lbdata);
        const sortColumn = ref("id");
        const sortDirection = ref(1);
        const arrowIconName = ref("arrow_drop_up");
        const sortByColumn = (columnName: keyof lbdataInfo) => {
            sortColumn.value = columnName;
            sortDirection.value = -1 * sortDirection.value;
            if (sortDirection.value == 1) {
                arrowIconName.value = "arrow_drop_up";
                tableData.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
            } else {
                arrowIconName.value = "arrow_drop_down";
                tableData.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
            }
        }

        return {tableData, sortColumn, sortDirection, arrowIconName, sortByColumn, yeardata, year_selected, statsdata, stats_selected, avg, perc, brac, draf, names};
    },
    methods: {
      changeTable: function() {
      //
      const payload = {
        year: ((this.year_selected == "Year:") ? 'All Time' : this.year_selected),
        stats: ((this.brac == 'show') ? 'Postseason' : this.stats_selected),
        perc: this.perc,
        avg: this.avg,
        sort: ((this.brac == 'show') ? 'seed' : 'standing')
      }
      if (this.year_selected == 'All Time' || this.year_selected == 'Year:') {
        this.names["Standing"] = 'Championships';
        this.names["Weeks Won"] = 'Seasons Won';
        this.names["Seed"] = 'Weeks Won';
        this.names["Draft Position"] = 'Avg Draft Pos.';
      }
      else {
        this.names["Standing"] = 'Standing';
        this.names["Weeks Won"] = 'Weeks Won';
        this.names["Seed"] = 'Seed';
        this.names["Draft Position"] = 'Draft Position';
      }
      axios.post(target, payload, { headers }).then((response)=>{
      this.tableData = response.data;
      })
      .catch(function (error) {
      console.log(error);
      });
      },
      changeAvg: function() {
        if (this.avg != "Total Points") {
          this.avg = "Total Points";
          this.names["PF"] = "PPG";
          this.names["PA"] = "PAPG";
          this.names["Diff"] = "DIFFPG";
        }
        else {
          this.avg = "Points Per Game";
          this.names["PF"] = "PF";
          this.names["PA"] = "PA";
          this.names["Diff"] = "DIFF";
        }
        this.changeTable();
      },
      changePerc: function() {
        this.names["Record"] = this.perc;
        if (this.perc != "Record") {
          this.perc = "Record";
        }
        else {
          this.perc = 'Winning %';
        }
        this.changeTable();  
      },
      showBrac: function() { 
        this.brac = 'show';
        this.draf = 'hide';
        this.changeTable();
        if (this.yeardata[0]["select"] == "All Time") {
          this.yeardata.shift();
        } 
      },
      showDraf: function() {
        this.brac = 'hide';
        this.draf = 'show';
        if (this.yeardata[0]["select"] == "All Time") {
          this.yeardata.shift();
        }
      },
      goBack: function() {
        this.changeTable();
        this.brac = 'hide';
        this.draf = 'hide';
        if (this.yeardata[0]["select"] != "All Time") {
          this.yeardata.unshift({select: "All Time"});
        }
      },
    },
    created() {
      this.changeTable();
    }
});

</script>

<style scoped>
.material-icons {
    vertical-align: -6px;
}

th {
    cursor: pointer;
}

.select {
  margin-bottom: 15px;
}
#year {
  margin-right: 5px;
}
#stats {
  margin-right: 5px;
}
#avg {
  font-size:12px;
  padding-bottom: -5px;
  width:124px;
}
#perc {
  font-size:12px;
  padding-bottom: -5px;
  width: 90px;
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
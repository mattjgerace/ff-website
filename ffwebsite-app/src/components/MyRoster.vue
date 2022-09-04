<template>
<p>Under Construction ...</p>
  <div class="select">
  <select v-model="owner_selected" name="owner" id="owner" @change="changeTable()">
    <option disabled :selected="owner_selected == 'Team:'">Team:</option>
    <option v-for="owner in ownerdata" :value="owner.select" :key="owner.select">{{owner.select}}</option>
  </select>

  <select v-model="stats_selected" name="stats" id="stats">
    <option v-for="stats in statsdata" :value="stats.select" :key="stats.select">{{stats.select}}</option>
  </select>

  <select v-model="option_selected" name="option" id="option">
    <option v-for="options in optiondata" :value="options.select" :key="options.select">{{options.select}}</option>
  </select>
  <select v-model="modes_selected" name="modes" id="modes">
    <option v-for="modes in modesdata" :value="modes.select" :key="modes.select">{{modes.select}}</option>
  </select>
  </div>

<div id="rostertable">
  <table class="table table-light table-striped">
    <col style="width: 40px;"/>
    <thead class="thead">
      <tr>
        <th class="thead" scope="col">
        </th>
        <th class="thead" scope="col">
          Starters
        </th>
        <th class="thead" scope="col">
          Points
        </th>
        <th class="thead" scope="col">
          PPG
        </th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData.slice(0,9)" :key="row.position">
        <td>{{ row.position  }}</td>
        <td>{{ row.player }}</td>
        <td>{{ row.points }}</td>
        <td>{{ row.ppg }}</td>
      </tr>
    </tbody>
    <thead class="thead2">
      <tr>
        <th class="thead2" scope="col">
        </th>
        <th class="thead2" scope="col">
          Bench
        </th>
        <th class="thead2" scope="col">
          Points
        </th>
        <th class="thead2" scope="col">
          PPG
        </th>
       </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData.slice(9)" :key="row.position">
        <td>{{ row.position  }}</td>
        <td>{{ row.player }}</td>
        <td>{{ row.points }}</td>
        <td>{{ row.ppg }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "MyRoster",
    data() {
        interface lbdataInfo {
        position: string,
        player: string,
        points: string,
        ppg: string,
        }

        const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,      
        maximumFractionDigits: 2,
        });

        interface selectdataInfo {
          select: string,
        }

        let ownerdata: Array<selectdataInfo> = [
          {select: "Matthew Berkenstock"},
          {select: "David Del Terzo"},
          {select: "Matthew Gerace"},
          {select: "Jack Kubinec"},
          {select: "Mason Lee"},
          {select: "Konrad Lojewski"},
          {select: "Evan Proulx"},
          {select: "Noah Raymond"},
          {select: "Luke Walling"},
          {select: "Thomas Westbrook"},
          {select: "Seth Winters"},
          {select: "Eric Zuckerman"},
        ]

        let statsdata: Array<selectdataInfo> = [
          {select: "Regular Season"},
          {select: "Playoffs"},
          {select: "Combined"}
        ]

        let modesdata: Array<selectdataInfo> = [
          {select: "Season"},
          {select: "Single Game"},
          {select: "All Time"},
        ]

        let optiondata: Array<selectdataInfo> = [
          {select: "Roster"},
          {select: "All Players"},
        ]

        let owner_selected = "Team:";
        let stats_selected = "Regular Season";
        let modes_selected = "Season";
        let option_selected = "Roster";
        let avg = 'Points Per Game';
        let perc = 'Winning %';
        
        let lbdata: Array<lbdataInfo> = [
        {"position": "QB", "player": "Patrick Mahomes '18", "points": formatter.format(482.05), "ppg": "0"},
        {"position": "RB", "player": "Alvin Kamara '20", "points": formatter.format(377.80), "ppg": "0"},
        {"position": "RB", "player": "Dalvin Cook '19", "points": formatter.format(292.90), "ppg": "0"},
        {"position": "WR", "player": "Cooper Kupp '21", "points": formatter.format(439.50), "ppg": "0"},
        {"position": "WR", "player": "Julio Jones '15", "points": formatter.format(363.00), "ppg": "0"},
        {"position": "TE", "player": "Austin Hooper '19", "points": formatter.format(191.7), "ppg": "0"},
        {"position": "FLEX", "player": "Calvin Ridley '20", "points": formatter.format(281.50), "ppg": "0"},
        {"position": "D/ST", "player": "DAL '21", "points": formatter.format(210.68), "ppg": "0"},
        {"position": "K", "player": "Younghoe Koo '20", "points": formatter.format(126.00), "ppg": "0"},
        {"position": "QB", "player": "Justin Herbert '20", "points": formatter.format(332.84), "ppg": "0"},
        {"position": "RB", "player": "DeMarco Murray '16", "points": formatter.format(252.00), "ppg": "0"},
        {"position": "WR", "player": "Chris Godwin '19", "points": formatter.format(276.6), "ppg": "0"},
        {"position": "TE", "player": "Robert Tonyan '20", "points": formatter.format(176.6), "ppg": "0"},
        {"position": "FLEX", "player": "Alvin Kamara '19", "points": formatter.format(249.15), "ppg": "0"},
        {"position": "D/ST", "player": "SEA '20", "points": formatter.format(172.56), "ppg": "0"},
        {"position": "K", "player": "Wil Lutz '19", "points": formatter.format(126.00), "ppg": "0"},
        ];
        
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

        return {tableData, sortColumn, sortDirection, arrowIconName, sortByColumn, ownerdata, owner_selected, statsdata, stats_selected, modesdata, modes_selected, optiondata, option_selected, avg, perc};
    },
    methods: {
      changeTable: function() {
        if (this.owner_selected == "2020") {
          //this.tableData = this.tableData;
        }
        if (this.owner_selected == "2019") {
          //this.tableData = this.tableData;
        }
      },
      changeAvg: function() {
        if (this.avg != "Total Points") {
          this.avg = "Total Points"
        }
        else {
          this.avg = "Points Per Game"
        }
      },
      changePerc: function() {
        if (this.perc != "Record") {
          this.perc = "Record"
        }
        else {
          this.perc = 'Winning %'
        }
      },
      
    }
})

</script>

<style scoped>
.material-icons {
    vertical-align: -6px;
}
th {
    cursor: pointer;
}
#owner {
  margin-right: 5px;
}
#stats {
  margin-right: 5px;
}
#modes {
    float: right;
}
#option {
    float: right;
    margin-left: 5px;
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
#rostertable {
    margin-left: 317px;
    margin-right: 317px;
}

table td:first-child {
    border-right: 2px solid #013369;;
}


</style>
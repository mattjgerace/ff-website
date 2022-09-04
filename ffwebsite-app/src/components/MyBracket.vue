<template>
<h2>{{year}} Playoff Bracket</h2>
<main id="tournament">
  <ul class="round round-1">
    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top winner">({{tableData[0]["seed"]}}) {{tableData[0]["team"]}}<span></span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom ">BYE <span></span></li>

    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top winner">({{tableData[3]["seed"]}}) {{tableData[3]["team"]}}<span>{{((findLoser(tableData[3], tableData[4])==tableData[3]) ? tableData[3]["pf"] : tableData[4]["pa"])}}</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom ">({{tableData[4]["seed"]}}) {{tableData[4]["team"]}}<span>{{((findLoser(tableData[3], tableData[4])==tableData[4]) ? tableData[4]["pf"] : tableData[3]["pa"])}}</span></li>

    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top ">({{tableData[2]["seed"]}}) {{tableData[2]["team"]}}<span>{{((findLoser(tableData[2], tableData[5])==tableData[2]) ? tableData[2]["pf"] : tableData[5]["pa"])}}</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom winner">({{tableData[5]["seed"]}}) {{tableData[5]["team"]}}<span>{{((findLoser(tableData[5], tableData[2])==tableData[5]) ? tableData[5]["pf"] : tableData[2]["pa"])}}</span></li>

    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top winner">({{tableData[1]["seed"]}}) {{tableData[1]["team"]}}<span></span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom ">BYE<span></span></li>

    <li class="spacer">&nbsp;</li>
  </ul>
  <ul class="round round-2">
    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top winner">({{tableData[0]["seed"]}}) {{tableData[0]["team"]}}<span>143.73</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom ">({{findWinner(tableData[3], tableData[4])["seed"]}}) {{findWinner(tableData[3], tableData[4])["team"]}}<span>127.13</span></li>

    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top">({{findWinner(tableData[2], tableData[5])["seed"]}}) {{findWinner(tableData[2], tableData[5])["team"]}}<span>125.05</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom winner">({{tableData[1]["seed"]}}) {{tableData[1]["team"]}}<span>147.66</span></li>
    <li class="spacer">&nbsp;</li>
  </ul>
  <ul class="round round-3">
    <li class="spacer">&nbsp;</li>
    
    <li class="game game-top winner">({{findWinner(findWinner(tableData[3], tableData[4]), tableData[0])["seed"]}}) {{findWinner(findWinner(tableData[3], tableData[4]), tableData[0])["team"]}}<span>165.61</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom ">({{findWinner(findWinner(tableData[2], tableData[5]), tableData[1])["seed"]}}) {{findWinner(findWinner(tableData[2], tableData[5]), tableData[1])["team"]}}<span>88.66</span></li>

    <li class="spacer">&nbsp;</li>
    
  </ul>
  <ul class="round round-4">
    <li class="game game-top winner">({{findWinner(findWinner(findWinner(tableData[3], tableData[4]), tableData[0]), findWinner(findWinner(tableData[2], tableData[5]), tableData[1]))["seed"]}}) {{findWinner(findWinner(findWinner(tableData[3], tableData[4]), tableData[0]), findWinner(findWinner(tableData[2], tableData[5]), tableData[1]))["team"]}}<span></span></li>
  </ul>
</main>
<main id="tournament">
    <ul class="round round-1"></ul>
    <ul class="round round-2"></ul>
    <ul class="round round-3">
    <li class="spacer">&nbsp;</li>

    <li class="game game-top">({{findLoser(findWinner(tableData[3], tableData[4]), tableData[0])["seed"]}}) {{findLoser(findWinner(tableData[3], tableData[4]), tableData[0])["team"]}}<span>81.31</span></li>
    <li class="game game-spacer">&nbsp;</li>
    <li class="game game-bottom winner ">({{findLoser(findWinner(tableData[2], tableData[5]), tableData[1])["seed"]}}) {{findLoser(findWinner(tableData[2], tableData[5]), tableData[1])["team"]}}<span>174.91</span></li>

    <li class="spacer">&nbsp;</li>
  </ul>
</main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: "MyBracket",
    props: {
    year: String,
    tableData: Array,
    },
    methods: {
    findWinner: function(team1: any, team2: any) {
      if (team1["standing"] < team2["standing"]) {
        return team1;
      }
      else {
        return team2;
      }
    },
    findLoser: function(team1: any, team2: any) {
      if (team1["standing"] < team2["standing"]) {
        return team2;
      }
      else {
        return team1;
      
      }
    },
    }
  })
</script>

<style scoped>
main{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:275px;
  list-style:none;
  padding:0;
}
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow: 0.5; }

  .round .game-spacer{
    flex-grow:1;
  }

/*
 *  General Styles
*/
body{
  font-family:sans-serif;
  font-size:small;
  padding:10px;
  line-height:1.4em;
}

li.game{
  padding-left:20px;
}

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{ 
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{ 
    border-top:1px solid #aaa;
  }
  h2 {
    margin-left: 5px;
  }
</style>
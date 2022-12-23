require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
//const quotesRouter = require('./routes/seasons');

const cors = require('cors');
app.use(cors({
    origin: 
    process.env.SITE //'http://localhost:8080'
}));

var bodyParser = require('body-parser');

// Parses the body for POST, PUT, DELETE, etc.
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

/* local
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.env.LOCAL_DB_NAME);
*/

const sql = require('mssql');
const config = require('./config.js');
const db = new sql.ConnectionPool(config);
const dbConnection = db.connect();


function accessATData(stats, perc, avg){
    return new Promise(resolve=>{
    //console.log("SELECT * FROM Leaderboard_AllTime WHERE rpc='"+stats+"' ORDER BY championships DESC");
    var tableData = [];
    db.all("SELECT * FROM Leaderboard_AllTime WHERE rpc='"+stats+"' ORDER BY championships DESC", [], (err, rows)=>{
        if(err) return console.log(err.message);
        rows.forEach((row)=>{
            //console.log(row);
            tableRow = {};
            tableRow["standing"] = row.championships;
            tableRow["avgstand"] = row.avgstand; //fix this
            tableRow["team"] = row.team;
            tableRow["record"] = (perc=='Winning %'? row.record : row.wp);
            tableRow["pf"] = (avg=='Points Per Game'? row.pf : row.ppg);
            tableRow["pa"] = (avg=='Points Per Game'? row.pa : row.papg);
            tableRow["diff"] = (avg=='Points Per Game'? row.diff : row.diffpg);
            tableRow["ww"] = row.sw;
            tableRow["seed"] = row.ww;
            tableRow["dp"] = row.avgdp;
            tableData.push(tableRow);
        });
        resolve(tableData);
    });
});
}

function accessSData(year, stats, perc, avg, sort){
    return new Promise(async resolve=>{
    if (year=="All Time") {
        query = "WHERE rpc='"+stats+"' ORDER BY year DESC"
    }
    else{
        query = "WHERE year="+year+" AND rpc='"+stats+"' ORDER BY "+sort+" ASC"
    }
    var tableData = [];
    await dbConnection;
    await db.request.query("SELECT * FROM Leaderboard_Season "+query, [], (err, rows)=>{
        if(err) return console.log(err.message);
        rows.forEach((row)=>{
            //console.log(row);
            tableRow = {};
            tableRow["standing"] = (year=='All Time' ? row.year : row.standing);
            tableRow["team"] = row.team;
            tableRow["record"] = (perc=='Winning %'? row.record : row.wp);
            tableRow["pf"] = (avg=='Points Per Game'? row.pf : row.ppg);
            tableRow["pa"] = (avg=='Points Per Game'? row.pa : row.papg);
            tableRow["diff"] = (avg=='Points Per Game'? row.diff : row.diffpg);
            tableRow["ww"] = (year=='All Time' ? row.sw : row.ww);
            tableRow["seed"] = (year=='All Time' ? row.ww : row.seed);
            tableRow["dp"] = row.dp;
            tableRow["avgstand"] = row.standing;
            tableData.push(tableRow);
        });
        resolve(tableData);
    });
});
}

function accessRData(sort){
    return new Promise(resolve=>{
    var tableData = [];
    if (sort == 'score') {
        db.all("SELECT * FROM Scores", [], (err, rows)=>{
            if(err) return console.log(err.message);
            rows.forEach((row)=>{
                //console.log(row);
                tableRow = {};
                tableRow["score"] = row.score;
                tableRow["team"] = row.team;
                tableRow["year"] = "Week "+row.week+", "+row.year;
                tableData.push(tableRow);
                tableRow = {};
                tableRow["score"] = row.oppscore;
                tableRow["team"] = row.opp;
                tableRow["year"] = "Week "+row.week+", "+row.year;
                tableData.push(tableRow);
            });
            tableData.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            tableData = tableData.slice(0, 50);
            resolve(tableData);
        });

    }
    else {
        db.all("SELECT * FROM Leaderboard_Season WHERE rpc='Regular' ORDER BY "+sort+" DESC LIMIT 15", [], (err, rows)=>{
            if(err) return console.log(err.message);
            rows.forEach((row)=>{
                //console.log(row);
                tableRow = {};
                tableRow["score"] = (sort=='pf'? row.pf : row.ppg);
                tableRow["team"] = row.team;
                tableRow["year"] = row.year;
                tableData.push(tableRow);
            });
            resolve(tableData);
        });
    }
});
}

async function getTable(year, stats, perc, avg, sort) {
    stats = ((stats=="Regular Season") ? "Regular" : stats);
    if (year == 'All Time') {
        stats = "All-Time " + stats;
    }
    if (stats != "Record") {
        tableData = await accessSData(year,stats,perc,avg,sort);
    }
    else {
        tableData = await accessRData(sort);
    }
    return tableData;
}

app.post('/', function(req, res, next){
    table = [];
    table = getTable(req.body["year"], req.body["stats"], req.body["perc"], req.body["avg"], req.body["sort"]) // req.body contains the parsed body of the request.
    table.then(function(result) {
        res.json(result);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at ${process.env.BACKEND}:${port}`);
});

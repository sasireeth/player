const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbpath = path.join(_dirname, "cricketTeam.db");

app.use(express.json());

let db = null;

//initiallize DB and Server

const initializeDBandServer = async () => {
  const db = await open({
    filepath: dbpath,
    driver: sqlite3.Database,
  });
  app.listen(3000);
};

initializeDBandServer();

//get data
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
            SELECT 
                *
            FROM
             cricket_team
            ORDER BY
            player_id;`;
  const playersArray = await db.all(getPlayersQuery);
  response.send(playersArray);
});

//post data
app.post("/players/", async (request, response) => {
  const playerData = request.body;
  const { playerName, jerseyNumber, role } = playerData;
  const getPlayersQuery = `
            INSERT INTO
             cricket_team(playerName,jerseyNumber,role)
           VALUE(
                '${playerName}'
                ${jerseyNumber}
                '${role}'
           );`;
  const playersId = await db.run(getPlayersQuery);
  console.log(playersId);
});

#! /usr/bin/env node
import fetch from "node-fetch";
// import yargs from "yargs";
import dotenv from "dotenv";
import { getRandomYear } from "./utils.mjs";

// const { argv } = yargs(process.argv);
dotenv.config();

const baseUrl = "https://api.collegefootballdata.com/";
const fetchOptions = {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
    "Content-Type": "application/json",
  },
};

const randomYear = getRandomYear();
const randomWeek = Math.floor(Math.random() * 10 + 1);

try {
  const res = await fetch(
    `${baseUrl}games/players?year=${randomYear}&week=${randomWeek}&seasonType=regular`,
    fetchOptions
  );
  const data = await res.json();
  const randomGame = data[Math.floor(Math.random() * data.length)];
  const randomTeam =
    randomGame.teams[Math.floor(Math.random() * randomGame.teams.length)];

  const randomStats =
    randomTeam.categories[
      Math.floor(Math.random() * randomTeam.categories.length)
    ];

  console.log(
    `${randomGame.teams[0].school} @ ${randomGame.teams[1].school}, week ${randomWeek} ${randomYear} regular season 🏟 \n`
  );

  const playersName = randomStats.types[0].athletes[0].name;
  const playerRes = await fetch(
    `${baseUrl}player/search?searchTerm=${playersName}&team=${randomTeam.school}`,
    fetchOptions
  );
  const playerData = await playerRes.json();

  console.log(
    `${randomTeam.school} (${playerData[0]?.position}) ${playersName} 🏈\n`
  );
  console.log(`${randomStats.name.toUpperCase()} STATS:`);
  randomStats.types.forEach((type) => {
    console.log(`${type.name}: ${type.athletes[0].stat}`);
  });
} catch (error) {
  console.log(`❌ ERROR: \n${error}`);
}

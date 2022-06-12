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

console.log(
  `Fetching random player stats from a random game of the ${randomYear} regular season week ${randomWeek}...\n`
);

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

console.log(`${randomGame.teams[0].school} at ${randomGame.teams[1].school}\n`);
console.log(`${randomStats.types[0].athletes[0].name}'s Stats:`);
randomStats.types.forEach((type) => {
  console.log(`${type.name}: ${type.athletes[0].stat}`);
});

'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//======================Coding Challenge #1=======================================
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (above). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/* // 1. Create one player array for each team (variables 'players1' and 'players2')
//Destructuring arrays
const [players1, players2] = game.players;
console.log(players1, players2);

//2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
//Destructuring ararys along with rest syntax
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
//Merging with spread operator
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
//Concatinating with spread operator (unpack array and add)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
//De-structuring object
// let { team1, x: draw, team2 } = game.odds;
let {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
//Rest Paramters to consolidate all arguments into an array
function printGoals(...playerNames) {
  console.log(...playerNames);
  console.log(`${playerNames.length} goals were scored`);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored); //Spread operator to unpack array to arguments

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
team1 = 10;
team2 = 3;
//Short circuiting logical operators
// console.log((team1 < team2 && team1) || team2); //This will print the odds (value) which is lower
team1 < team2 && console.log(`Team 1 is more likely to win`);
team2 < team1 && console.log(`Team 2 is more likely to win`); */

//======================Coding Challenge #2=======================================
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/* //1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);
let avgOdds = 0;
for (const odd of odds) avgOdds += odd;
avgOdds /= odds.length;
console.log(avgOdds);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

const oddsEntries = Object.entries(game.odds);
console.log(oddsEntries);
for (const [team, odd] of oddsEntries) {
  const teamString = game?.[team] != null ? `victory ${game?.[team]}` : 'draw';
  console.log(`Odd of ${teamString}: ${odd}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀
const scorers = {};
// for (const scorer of game.scored) {
//   scorers[scorer] = scorers[scorer] == null ? 1 : scorers[scorer] + 1;
// }
for (const scorer of game.scored) {
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers); */

//======================Coding Challenge #3=======================================
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

/* const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. Create an array 'events' of the different game events that happened (no duplicates)
const gameEventTypes = [...new Set(gameEvents.values())]; // MOST OPTIMAL ANSWER
console.log(gameEventTypes);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents);

//3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// let avgEventTime = 0;
// for (const [time, event] of gameEvents) avgEventTime += time;
// avgEventTime /= 90;
// console.log(
//   `An event happened, on average, every ${Math.ceil(avgEventTime)} minutes`,
// );

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`,
);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`,
);

//4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽️ GOAL

// for (const [time, event] of gameEvents) {
//   console.log(
//     `[${time <= 90 / 2 ? 'FIRST HALF' : 'SECOND HALF'}] ${time} : ${event} `,
//   );
// }

for (const [minute, event] of gameEvents) {
  const half = minute <= 45 ? 'FIRST HALF' : 'SECOND HALF';
  console.log(`[${half}] ${minute}: ${event}`);
} */

//======================Coding Challenge #4=======================================
/* Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀 */

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const textArea = document.querySelector('textarea');
const button = document.querySelector('button');

button.addEventListener('click', onBtnClick);

function onBtnClick(event) {
  console.log(textArea.value);
  convertToCamelCase(textArea.value);
}

function convertToCamelCase(text) {
  const texts = text
    .toLowerCase()
    .split('\n')
    .map(word => word.trim().split('_'));
  console.log(text);
  for (let i = 0; i < texts.length; i++) {
    for (let j = 0; j < texts[i].length; j++) {
      if (j === 0) continue;
      texts[i][j] = texts[i][j].replace(
        texts[i][j][0],
        texts[i][j][0].toUpperCase(),
      );
    }
    console.log(texts[i].join('').padEnd(20, ' ') + '✅'.repeat(i + 1));
  }
}

//REGEX BASED REPLACEMENT FOR THE FUNCTION !
// function convertToCamelCase(text) {
//   const results = text
//     .toLowerCase()
//     .split('\n')
//     .map(line => line.trim().replace(/_([a-z])/g, (_, char) => char.toUpperCase()));

//   results.forEach((word, i) => {
//     console.log(word.padEnd(20, ' ') + '✅'.repeat(i + 1));
//   });
// }

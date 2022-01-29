const fs = require("fs");
const request = require("request");
const file = "./jokes.txt";
const joke = process.argv[2];

const jokeChosen = {
  url: `https://icanhazdadjoke.com/search?term=${joke}`,
  headers: {
    Accept: "application/json",
  },
};

request(jokeChosen, (err, res, body) => {
  if (err) {
    console.log(err);
  } else {
    const obj = JSON.parse(body);
    const jokes = obj.results.map((result) => result.joke);
    if (fs.existsSync(file)) {
    //   console.log("jokes: ", jokes);
      fs.appendFile("jokes.txt", JSON.stringify(jokes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      fs.writeFile("jokes.txt", JSON.stringify(jokes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
});

// if file exists => appendFile
// else write



/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Initializing alexaWins and userWins also the weapons list
 */
var alexaWins = 0
var userWins = 0
var totalGamesPlayed = 0
var weaponsList = ["rock", "paper", "scissors"];


var AlexaSkill = require('./AlexaSkill');


var RockPaperScissors = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
RockPaperScissors.prototype = Object.create(AlexaSkill.prototype);
RockPaperScissors.prototype.constructor = RockPaperScissors;

RockPaperScissors.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {

};

RockPaperScissors.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    handleStartGame(response);
};


RockPaperScissors.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {

};

RockPaperScissors.prototype.intentHandlers = {
    "StartGameIntent": function (intent, session, response) {
        handleStartGame(response);
    },

    "RockIntent": function (intent, session, response) {
        handleRock(response);
    },

    "PaperIntent": function (intent, session, response) {
        handlePaper(response);
    },

    "ScissorsIntent": function (intent, session, response) {
        handleScissors(response);
    },

    "GamesPlayedIntent": function (intent, session, response) {
        handleGamesPlayed(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say rock, paper, or scissors. Or you can ask me how many games we have played together.", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/*
Here we handle the users starting the game, and alexa asks what weapon the user wants
*/
function handleStartGame(response) {
    // Create speech output
    var speechOutput = "Okay, i'll start a game of rock, paper, scissors, what weapon would you like?";
    var cardTitle = "Start Game";
    response.askWithCard(speechOutput, cardTitle, speechOutput);
}
/*
Handles if the user chooses rock as their weapon
*/
function handleRock(response) {
    var weapon = chooseWeapon();
    var speechOutput = "We tied!";
    var cardTitle = "Tied";
    var playAgain = ",,,,,if you would like to play again just say the weapon you want to use.";
    if(weapon === "rock"){
      speechOutput = "We tied!";
      cardTitle = "Tied";

    }
    else if(weapon === "paper") {
      speechOutput = "I won, I chose paper!";
      cardTitle = "I won!";
      alexaWins += 1;
    }
    else {
      speechOutput = "You won, I chose scissors!";
      cardTitle = "You won!";
      userWins += 1;
    }
    speechOutput = speechOutput + playAgain;
    totalGamesPlayed += 1;
    response.askWithCard(speechOutput, cardTitle, speechOutput);
}
/*
Handles if the user chooses paper as their weapon
*/
function handlePaper(response) {
    var weapon = chooseWeapon();
    var speechOutput = "We tied!";
    var cardTitle = "Tied";
    var playAgain = " , , , , ,if you would like to play again just say the weapon you want to use.";
    if(weapon === "rock"){
      userWins += 1;
      speechOutput = "You won, I chose rock!";
      cardTitle = "You won!";
    }
    else if(weapon === "paper") {
      speechOutput = "We tied!";
      cardTitle = "Tied";
    }
    else {
      alexaWins += 1;
      speechOutput = "I won, I chose scissors!";
      cardTitle = "I won!";
    }
    speechOutput = speechOutput + playAgain;
    totalGamesPlayed += 1;
    response.askWithCard(speechOutput, cardTitle, speechOutput);
}

/*
Handles if the user chooses scissors as their weapon
*/
function handleScissors(response) {
    var weapon = chooseWeapon();
    var speechOutput = "";
    var cardTitle = "";
    var playAgain = ", , , , ,if you would like to play again just say the weapon you want to use.";
    if(weapon === "rock"){
      speechOutput = "I won, I chose rock!";
      cardTitle = "I won!";
      alexaWins += 1;
    }
    else if(weapon === "paper") {
      speechOutput = "You won, I chose paper!";
      cardTitle = "You won!";
      userWins += 1;
    }
    else {
      speechOutput = "We tied!";
      cardTitle = "Tied";
    }
    speechOutput = speechOutput + playAgain;
    totalGamesPlayed += 1;
    response.askWithCard(speechOutput, cardTitle, speechOutput);
}

/*
Handles how many games have been played by the user, tells them how man games Alexa has won, and how many the user has won
*/
function handleGamesPlayed(response) {
  var speechOutput = "You have played, " + totalGamesPlayed + ", in which I have won, " + alexaWins + ", and you have won, " + userWins;
  var cardTitle = "Games Played";
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}
/*
Handles alexas weapon choice, it's random.
*/
// todo: Make alexa a bit smarter by having her not just randomly choose.
function chooseWeapon() {
  var weaponIndex = Math.floor(Math.random() * weaponsList.length);
  var weapon = weaponsList[weaponIndex];
  return weapon;
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {

    var rockPaperScissors = new RockPaperScissors();
    rockPaperScissors.execute(event, context);
};

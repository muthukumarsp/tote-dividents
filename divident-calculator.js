require('import-export');
const prompt = require('prompt');
const Promise = require('bluebird');

WinBetsModule = require('./win-bets.js');
PlaceBetsModule = require('./place-bets.js');
ExactaBetsModule = require('./exacta-bets.js');

prompt.get = Promise.promisify(prompt.get);
prompt.message = '';
prompt.delimiter = '';

const WINPATTERN = /^bet:w:[0-9]+:[0-9]+/i;
const PLACEATTERN = /^bet:p:[0-9]+:[0-9]+/i;
const EXACTAPATTERN = /^bet:e:[0-9]+,[0-9]+:[0-9]+/i;
const RESULTPATTERN = /^result:[0-9]+:[0-9]+:[0-9]+/i;

class BettingConsole {
    constructor() {
        this.winBetsModule = new WinBetsModule();
        this.placeBetsModule = new PlaceBetsModule();
        this.exactaBetsModule = new ExactaBetsModule();
        this.horsesFinishSeq;
    }

    processInput(inputValue) {
        if (WINPATTERN.test(inputValue)) {
            this.winBetsModule.addBets(inputValue);
        } else if (PLACEATTERN.test(inputValue)) {
            this.placeBetsModule.addBets(inputValue);
        } else if (EXACTAPATTERN.test(inputValue)) {
            this.exactaBetsModule.addBets(inputValue);
        } else if (RESULTPATTERN.test(inputValue)) {
            this.processResult(inputValue);
            process.exit();
        } else {
            console.log("invalid input, input discarded. Please enter a proper input or result")
        }
    }

    processResult(str) {
        this.horsesFinishSeq = str.split(":").splice(1);

        // chang the horse number from string to number
        for (var i = 0; i < this.horsesFinishSeq.length; i++) {
            this.horsesFinishSeq[i] = parseInt(this.horsesFinishSeq[i]);
        }

        this.winBetsModule.calculateDivident(this.horsesFinishSeq[0]);
        console.log(this.winBetsModule.getResults())

        this.placeBetsModule.calculateDivident(this.horsesFinishSeq);
        console.log(this.placeBetsModule.getResults());

        this.exactaBetsModule.calculateDivident(this.horsesFinishSeq);
        console.log(this.exactaBetsModule.getResults());
    }
}

// Main app module.
var bettingConsole = new BettingConsole();

/**
 * Await command
 */
function awaitCommand() {

    //Start prompt
    prompt.start();
    prompt.get({
        name: 'command',
        description: 'Enter command:',
    })
        .then(result => result.command)
        .then(command => {
            //Do stuff
            bettingConsole.processInput(command);
        })
        .catch(error => {
            //console.log( "error thrown",error);
            //Prompt cancelled, exit process
            if (error.message == 'canceled') {
                process.exit(1);
            }
        })
        .then(awaitCommand); //<-- wait for next prompt
}

//Start prompt
awaitCommand();
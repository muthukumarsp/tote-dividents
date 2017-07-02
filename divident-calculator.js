const prompt = require('prompt');
const Promise = require('bluebird');

prompt.get = Promise.promisify(prompt.get);
prompt.message = '';
prompt.delimiter = '';

const WINPATTERN =/^bet:w:[0-9]+:[0-9]+/i;
const PLACEATTERN =/^bet:p:[0-9]+:[0-9]+/i;
const EXACTAPATTERN =/^bet:e:[0-9]+,[0-9]+:[0-9]+/i;
const RESULTPATTERN = /^result:[0-9]+:[0-9]+:[0-9]+/i;

const HORSE_INDEX = 2;  // index in the input format
const BET_AMOUNT_INDEX = 3;  // INdex in the input format

class Bets {
    constructor(){
        this.winBets = [];
        this.placeBets = [];
        this.exactaBets = [];
    }

    processInput(inputValue){
       
        if( WINPATTERN.test( inputValue)){
            console.log( "win pattern");
            this.processWinInput( inputValue);

        }else if( PLACEATTERN.test( inputValue)){
            console.log( "Place pattern");
            this.processPlaceInput(inputValue);
        }else if( EXACTAPATTERN.test( inputValue)){
            console.log( "EXACTAPATTERN pattern");
            this.processExactaInput(inputValue);
        }else if( RESULTPATTERN.test( inputValue)){
            console.log( "RESULTPATTERN pattern");
            this.processResult( inputValue);
        }else{
            console.log( "invalid input, input discarded. Please enter a proper input or result")
        }

        var parsedInput = inputValue.split(":");
        console.log( parsedInput);
        this.winBets.push( inputValue);

        // if( parsedInput[0])
        // switch( parsedInput[])
    }

    processWinInput(str){
        var winInputArr = str.split(":");
        console.log( winInputArr);
        this.winBets.push({
            horseNumber: winInputArr[HORSE_INDEX],
            betAmount:winInputArr[BET_AMOUNT_INDEX]
        });

        console.log("Win Bets Arr", this.winBets);
    }

     processPlaceInput(str){
        var placeInputArr = str.split(":");
        this.placeBets.push({
            horseNumber: placeInputArr[HORSE_INDEX],
            betAmount:placeInputArr[BET_AMOUNT_INDEX]
        });

        console.log("place Arr", this.placeBets);
    }

     processExactaInput(str){
        var exactaInputArr = str.split(":");
        this.exactaBets.push({
            horseNumber: exactaInputArr[HORSE_INDEX].split(','),
            betAmount:exactaInputArr[BET_AMOUNT_INDEX]
        });
        console.log("Exacta Arr", this.exactaBets);
    }

    processResult(str){

        console.log( "this -> ", this);

    }
}


var winBetsList = new Bets();



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
      
      if (command === 'can') {
          console.log('Proces finished command', command);
        // prompt.stop();
        process.exit();
      }else{
          winBetsList.processInput(command);
      }

    })
    .catch(error => {

      //Prompt cancelled, exit process
      if (error.message === 'canceled') {
        console.log( 'exiting process. Error Message =', error.message)
        process.exit(1);
      }
    })
    .then(awaitCommand); //<-- wait for next prompt
}



//Start prompt
awaitCommand();
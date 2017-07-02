const prompt = require('prompt');
const Promise = require('bluebird');

prompt.get = Promise.promisify(prompt.get);
prompt.message = '';
prompt.delimiter = '';

const WINPATTERN =/^bet:w:[0-9]+:[0-9]+/i;
const PLACEATTERN =/^bet:p:[0-9]+:[0-9]+/i;
const EXACTAPATTERN =/^bet:e:[0-9]+,[0-9]+:[0-9]+/i;
const RESULTPATTERN = /^result:[0-9]+:[0-9]+:[0-9]+/i;

class Bets {
    constructor(){
        this.winBets = [];
        this.placeBets = [];
        this.exactaBets = [];
    }

    processInput(inputValue){
        console.log( "Inside processinput",WINPATTERN.test( inputValue))

        if( WINPATTERN.test( inputValue)){
            console.log( "win pattern");
        }else if( PLACEATTERN.test( inputValue)){
            console.log( "Place pattern");
        }else if( EXACTAPATTERN.test( inputValue)){
            console.log( "EXACTAPATTERN pattern");
        }else if( RESULTPATTERN.test( inputValue)){
            console.log( "RESULTPATTERN pattern");
        }else{
            console.log( "invalid input, input discarded. Please enter a proper input or result")
        }

        var parsedInput = inputValue.split(":");
        console.log( parsedInput);
        this.winBets.push( inputValue);

        // if( parsedInput[0])
        // switch( parsedInput[])
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
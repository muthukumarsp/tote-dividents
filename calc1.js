
// import { WinBetsModule } from './win-bets.js';
require('import-export');
const prompt = require('prompt');
const Promise = require('bluebird');

var WinBetsModule  = require('./win-bets.js');

// var CalcUtilities = require('./divident-calc-utilities.js')

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
        this.winBetsModule = new WinBetsModule();
        this.placeBets = [];
        this.exactaBets = [];
        this.horsesFinishSeq;

        this.winResultDetails={};
        this.placeResultDetails={};
        this.exactaResultDetails={};
    }

    processInput(inputValue){
       
        if( WINPATTERN.test( inputValue)){
            //console.log( "win pattern");
            this.winBetsModule.addBets( inputValue);
        }else if( PLACEATTERN.test( inputValue)){
            //console.log( "Place pattern");
            this.processPlaceInput(inputValue);
        }else if( EXACTAPATTERN.test( inputValue)){
            //console.log( "EXACTAPATTERN pattern");
            this.processExactaInput(inputValue);
        }else if( RESULTPATTERN.test( inputValue)){
            //console.log( "RESULTPATTERN pattern");
            this.processResult( inputValue);
            process.exit();
        }else{
            console.log( "invalid input, input discarded. Please enter a proper input or result")
        }
    }

    // processWinInput(str){
    //     var winInputArr = str.split(":");
    //     //console.log( "before adding",this.winBets);
    //     this.winBets.push({
    //         horseNumber: parseInt(winInputArr[HORSE_INDEX]),
    //         betAmount:parseInt(winInputArr[BET_AMOUNT_INDEX])
    //     });
    //     //console.log("Win Bets Arr", this.winBets);
    // }

     processPlaceInput(str){
        var placeInputArr = str.split(":");
        this.placeBets.push({
            horseNumber: parseInt(placeInputArr[HORSE_INDEX]),
            betAmount:parseInt(placeInputArr[BET_AMOUNT_INDEX])
        });
        //console.log("place Arr", this.placeBets);
    }

     processExactaInput(str){
        var exactaInputArr = str.split(":");
        this.exactaBets.push({
            horseNumber: exactaInputArr[HORSE_INDEX].split(','),
            betAmount:parseInt(exactaInputArr[BET_AMOUNT_INDEX])
        });
        //console.log("Exacta Arr", this.exactaBets);
    }

    processResult(str){
        //console.log( "process Result")
        this.horsesFinishSeq = str.split(":").splice(1);
        // this.calcDividentWin(this.winBets, parseInt(this.horsesFinishSeq[0]));
        this.winBetsModule.calculateDivident(this.horsesFinishSeq[0]);
        console.log( this.winBetsModule.getResults())
        // this.calcDividentPlaces();
        // this.calcDividentExacta();
        //console.log("result sequence", this.horsesFinishSeq);
    }

    // calcDividentWin(bets, horseNumber_winner){

    // //console.log( horseNumber_winner);
    //     // Total : 338 

    //     // comm: 50.7

    //     // remaining = 287.3

    //     // placed amount : 110 

    //     var totalPoolAmount =0 , commission, totalWinningBetAmount=0, dividentPerDoller;
    //     var result = {};
    //     // totalPoolAmount = _.reduce(_.filter(this.winBets, (bet) => { return bet.betAmount}), function(sum, n) {
    //     //     return sum + n;
    //     // }, 0);
    //     //console.log( "this -> winBets", bets);
    //     bets.forEach( (bet, index) =>{
    //         totalPoolAmount += bet.betAmount;
    //         if( bet.horseNumber === horseNumber_winner){
    //             //console.log( "inside if")
    //             totalWinningBetAmount  += bet.betAmount;
    //         }
    //     });
    //     //console.log( "total Pool amount", totalPoolAmount,"totalWinningBetAmount = ",totalWinningBetAmount);
    //     // var  = bets.filter( (bet) => { return bet.horseNumber === horseNumber_winner});

    //     // winningBetsFiltered.forEach( (bet, index) =>{
    //     //     totalWinningBetAmount += bet.betAmount;
            
    //     // });
    //     result.poolTotal = totalPoolAmount;
    //     result.commission = 15 * totalPoolAmount/100;
    //     result.remainingDividents = result.totalPoolAmount - result.commission;

       
    //     //console.log( "winning bet  amount", totalWinningBetAmount);

    // }
    calcDividentPlaces(){

    }
    calcDividentExacta(){

    }

    //  getSum(total, num) {
    //      //console.log( "getsum")
    //     return total + Math.round(num);
    // }
}


var betsObj = new Bets();



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
          betsObj.processInput(command);
    })
    .catch(error => {
        //console.log( "error thrown",error);
      //Prompt cancelled, exit process
        if(error.message == 'canceled'){
            process.exit(1);
        }
    })
    .then(awaitCommand); //<-- wait for next prompt
}

//Start prompt
awaitCommand();
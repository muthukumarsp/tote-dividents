// require('babel-register');
    
let CalcUtilities = require('./divident-calc-utilities.js')

let HORSE_INDEX = 2;  // index in the input format
let BET_AMOUNT_INDEX = 3;  // INdex in the input format

export default class WinBetsModule{
    
    constructor(){
        // console.log( "const place bet module")
        this.placeBetsList = [];
        this.calcUtilities  = new CalcUtilities();
        this.placeBetsResult = {};
    }

    addBets(betStr){
        var placeInputArr = betStr.split(":");
        // console.log( " Wind Bets : before adding",this.placeBetsList);
        this.placeBetsList.push({
            horseNumber: parseInt(placeInputArr[HORSE_INDEX]),
            betAmount:parseInt(placeInputArr[BET_AMOUNT_INDEX])
        });
    }
    getBetsList(){
        return this.getBetsList;
    }
    calculateDivident(winSeq){
        this.placeBetsList = this.getTestBets();  // uncomment for unit testing
        this.placeBetsResult.winSeq = winSeq;

        var totalPool = this.calcUtilities.totalBetAmount(this.placeBetsList),
            winnerTotalBetAmount = 0,
            remaining,
            commission,
            place1Div,
            place2Div,
            place3Div;
    //1. Calculate total amount

        this.placeBetsResult.totalPool = totalPool;
        this.placeBetsResult.commission = 12 * totalPool / 100; // 12%
        this.placeBetsResult.remaining = totalPool - this.placeBetsResult.commission;
        // this.placeBetsResult.totalDivident = Math.round(this.placeBetsResult.remaining / winnerBe * 100) / 100;
        this.placeBetsResult.seqDividents = [];

        for (var i = 0; i < winSeq.length; i++) {
            this.placeBetsResult.seqDividents.push({
                horseNumber: winSeq[i],
                divident: Math.round(100 * ( this.placeBetsResult.remaining / (this.calcUtilities.totalBetAmountForhorseNumber(this.placeBetsList, winSeq[i]) * 3))) / 100  // one third for each group divided by total
            })
        }
            // console.log('totalPool', totalPool, 'winnerTotalBetAmount', winnerTotalBetAmount);
            // console.log('this.placeBetsResult', JSON.stringify(this.placeBetsResult));
    }
    
    getResults(){
        // return "Win:" + this.placeBetsResult.winnerHorse +":$" + this.placeBetsResult.divident;
         var result="";
         for( var i=0; i< this.placeBetsResult.seqDividents.length; i++){
                if( this.placeBetsResult.seqDividents[i].divident){
                    result +=  "Place:" + this.placeBetsResult.seqDividents[i].horseNumber +
                             ":$" + this.placeBetsResult.seqDividents[i].divident +"\n"
                }else{
                     result +=  "Place:" + this.placeBetsResult.seqDividents[i].horseNumber +
                        ": No bet placed for this horse \n"
                }
        
        }
        return result;
    }
    // internal for unit testing
    getTestBets(){
        return  [
           {horseNumber: 1, betAmount: 31},
            {horseNumber: 2, betAmount: 89},
            {horseNumber: 3, betAmount: 28},
            {horseNumber: 4, betAmount: 72},
            {horseNumber: 1, betAmount: 40},
            {horseNumber: 2, betAmount: 16},
            {horseNumber: 3, betAmount: 82},
            {horseNumber: 4, betAmount: 52},
            {horseNumber: 1, betAmount: 18},
            {horseNumber: 2, betAmount: 74},
            {horseNumber: 3, betAmount: 39},
            {horseNumber: 4, betAmount: 105}
        ];
        
    }

    }

// module.exports.WinBetsModule = WinBetsModule;
// require('babel-register');
    
let CalcUtilities = require('./divident-calc-utilities.js')

let HORSE_INDEX = 2;  // index in the input format
let BET_AMOUNT_INDEX = 3;  // INdex in the input format

export default class ExactaBetsModule{
    
    constructor(){
        //console.log( "const win bet module")
        this.exactaBetsList = [];
        this.calcUtilities  = new CalcUtilities();
        this.exactaBetsResult = {};
    }

    addBets(betStr){
        var exactaInputArr = betStr.split(":");
        //console.log( " Wind Bets : before adding",this.exactaBetsList);
        this.exactaBetsList.push({
            horseNumber: parseInt(exactaInputArr[HORSE_INDEX]),
            betAmount:parseInt(exactaInputArr[BET_AMOUNT_INDEX])
        });
    }
    getBetsList(){
        return this.getBetsList;
    }
    calculateDivident(winSeq){
        this.exactaBetsList = this.getTestBets();  // uncomment for unit testing
        this.exactaBetsList.winSeq = winSeq;
        
        var totalPool = this.calcUtilities.totalBetAmount(this.exactaBetsList)
        this.exactaBetsResult.totalPool = totalPool;
        this.exactaBetsResult.commission = 18 * totalPool / 100; // 18%
        this.exactaBetsResult.remaining = totalPool - this.exactaBetsResult.commission;
        this.exactaBetsResult.divident = Math.round(100 * this.exactaBetsResult.remaining / this.calcUtilities.totalAmountWithSequence(this.exactaBetsList, winSeq[0] + ',' + winSeq[1])) / 100;
    }
    
    getResults(){
        return "Win:" + this.exactaBetsResult.winSeq +":$" + this.exactaBetsResult.divident;
    }
    // internal for unit testing
    getTestBets(){
        return  [
            {horseSeqence: '1,2', betAmount: 13},
            {horseSeqence: '2,3', betAmount: 98},
            {horseSeqence: '1,3', betAmount: 82},
            {horseSeqence: '3,2', betAmount: 27},
            {horseSeqence: '1,2', betAmount: 5},
            {horseSeqence: '2,3', betAmount: 61},
            {horseSeqence: '1,3', betAmount: 28},
            {horseSeqence: '3,2', betAmount: 25},
            {horseSeqence: '1,2', betAmount: 81},
            {horseSeqence: '2,3', betAmount: 47},
            {horseSeqence: '1,3', betAmount: 93},
            {horseSeqence: '3,2', betAmount: 51}
        ];
        
    }

    }

// module.exports.WinBetsModule = WinBetsModule;
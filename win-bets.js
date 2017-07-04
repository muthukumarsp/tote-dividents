let CalcUtilities = require('./divident-calc-utilities.js')

let HORSE_INDEX = 2;  // index in the input format
let BET_AMOUNT_INDEX = 3;  // INdex in the input format

export default class WinBetsModule {

    constructor() {
        // console.log( "const win bet module")
        this.winBetsList = [];
        this.calcUtilities = new CalcUtilities();
        this.winBetsResult = {};
    }

    addBets(betStr) {
        let winInputArr = betStr.split(":");
        this.winBetsList.push({
            horseNumber: parseInt(winInputArr[HORSE_INDEX]),
            betAmount: parseInt(winInputArr[BET_AMOUNT_INDEX])
        });
    }

    getBetsList() {
        return this.getBetsList;
    }

    calculateDivident(winningHorse) {
        // this.winBetsList = this.getTestBets();  // uncomment for unit testing
        this.winBetsResult.winnerHorse = winningHorse;

        let totalPool = this.calcUtilities.totalBetAmount(this.winBetsList),
            winnerTotalBetAmount = 0,
            remaining,
            commission;

        winnerTotalBetAmount = this.calcUtilities.totalBetAmountForhorseNumber(this.winBetsList, winningHorse);
        this.winBetsResult.totalPool = totalPool;
        this.winBetsResult.winnerTotalBetAmount = winnerTotalBetAmount;
        this.winBetsResult.commission = 15 * totalPool / 100; // 15%
        this.winBetsResult.remaining = totalPool - this.winBetsResult.commission;
        if (this.winBetsResult.winnerTotalBetAmount) {
            this.winBetsResult.divident = Math.round(this.winBetsResult.remaining / winnerTotalBetAmount * 100) / 100;
        }
    }

    getResults() {
        if (!!this.winBetsResult.divident) {
            return "Win:" + this.winBetsResult.winnerHorse + ":$" + this.winBetsResult.divident;
        } else {
            return "Win:" + this.winBetsResult.winnerHorse + ": No Win bet for this horse number";
        }
    }

    // internal : for unit testing
    getTestBets() {
        return [
            {horseNumber: 1, betAmount: 3},
            {horseNumber: 2, betAmount: 4},
            {horseNumber: 3, betAmount: 5},
            {horseNumber: 4, betAmount: 5},
            {horseNumber: 1, betAmount: 16},
            {horseNumber: 2, betAmount: 8},
            {horseNumber: 3, betAmount: 22},
            {horseNumber: 4, betAmount: 57},
            {horseNumber: 1, betAmount: 42},
            {horseNumber: 2, betAmount: 98},
            {horseNumber: 3, betAmount: 63},
            {horseNumber: 4, betAmount: 15}
        ];

    }

}

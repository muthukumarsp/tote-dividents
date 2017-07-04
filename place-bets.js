let CalcUtilities = require('./divident-calc-utilities.js')

let HORSE_INDEX = 2;  // index in the input format
let BET_AMOUNT_INDEX = 3;  // INdex in the input format

export default class PlaceBetsModule {

    constructor() {
        // console.log( "const place bet module")
        this.placeBetsList = [];
        this.calcUtilities = new CalcUtilities();
        this.placeBetsResult = {};
    }

    addBets(betStr) {
        let placeInputArr = betStr.split(":");
        // console.log( " Wind Bets : before adding",this.placeBetsList);
        this.placeBetsList.push({
            horseNumber: parseInt(placeInputArr[HORSE_INDEX]),
            betAmount: parseInt(placeInputArr[BET_AMOUNT_INDEX])
        });
    }

    getBetsList() {
        return this.getBetsList;
    }

    calculateDivident(winSeq) {
        // this.placeBetsList = this.getTestBets();  // uncomment for unit testing
        this.placeBetsResult.winSeq = winSeq;

        let totalPool = this.calcUtilities.totalBetAmount(this.placeBetsList),
            winnerTotalBetAmount = 0
        //1. Calculate total amount

        this.placeBetsResult.totalPool = totalPool;
        this.placeBetsResult.commission = 12 * totalPool / 100; // 12%
        this.placeBetsResult.remaining = totalPool - this.placeBetsResult.commission;
        // this.placeBetsResult.totalDivident = Math.round(this.placeBetsResult.remaining / winnerBe * 100) / 100;
        this.placeBetsResult.seqDividents = [];

        let divideBy = winSeq.length;  // initial group, assume all the group has valid bet placed
        for (let i = 0; i < winSeq.length; i++) {
            let totalForhorseNumber = this.calcUtilities.totalBetAmountForhorseNumber(this.placeBetsList, winSeq[i]);
            if (totalForhorseNumber === 0) {
                divideBy--;
            }
            this.placeBetsResult.seqDividents.push({
                horseNumber: winSeq[i],
                totalPlaceBetAmount: totalForhorseNumber
            });

        }
        for (let j = 0; j < winSeq.length; j++) {
            if (this.placeBetsResult.seqDividents[j].totalPlaceBetAmount) {
                // divideby  for each group divided by total
                this.placeBetsResult.seqDividents[j].divident = Math.round(100 * ( this.placeBetsResult.remaining /
                        (this.placeBetsResult.seqDividents[j].totalPlaceBetAmount * divideBy))) / 100;
            } else {
                // no place bet plaaced for this horse
                this.placeBetsResult.seqDividents[j].divident = 0;
            }
        }
    }

    getResults() {
        // return "Win:" + this.placeBetsResult.winnerHorse +":$" + this.placeBetsResult.divident;
        let result = "";
        for (let i = 0; i < this.placeBetsResult.seqDividents.length; i++) {
            if (this.placeBetsResult.seqDividents[i].divident) {
                result += "Place:" + this.placeBetsResult.seqDividents[i].horseNumber +
                    ":$" + this.placeBetsResult.seqDividents[i].divident
            } else {
                result += "Place:" + this.placeBetsResult.seqDividents[i].horseNumber +
                    ": No bet placed for this horse "
            }
            if (i !== this.placeBetsResult.seqDividents.length - 1) {
                result += "\n";  // Add new line except last line
            }
        }
        return result;
    }

    // internal for unit testing
    getTestBets() {
        return [
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

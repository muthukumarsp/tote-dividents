/**
 * Created by m.kumar on 3/07/2017.
 */

// import { WinBetsModule } from './win-bets.js';

// require('babel-register');
// import WinBetsModule from './win-bets.js';
require('import-export');

var WinBetsModule  = require('./win-bets.js');

// var CalcUtilities = require('./divident-calc-utilities.js')
var winBetsModule = new WinBetsModule();

var horsesFinishSeq = [2, 3, 1];

// Total : 338
// comm: 50.7
// remaining = 287.3
// placed amount : 110

// function totalbetAmount(list) {
//     var total = 0;
//     list.forEach((b) => {
//         total += b.betAmount;
//     });
//     return total;
// }

// function totalBetAmountForhorseNumber(list, horseNumber) {
//     var total = 0;
//     list.forEach((b) => {
//         if (b.horseNumber === horseNumber) {
//             total += b.betAmount;
//         }
//     });
//     return total;
// }
// function calcDividentWin(list, winnerHor) {
//     var totalPool = totalbetAmount(list),
//         winnerBe = 0,
//         remaining,
//         commission;
//     //1. Calculate total amount
//     /*list.forEach((b) => {
//      if (b.horseNumber === winnerHor) {
//      winnerBe += b.betAmount;
//      }
//      });*/
//     winnerBe = totalBetAmountForhorseNumber(list, winnerHor);
//     wbResult.totalPool = totalPool;
//     wbResult.winnerBe = winnerBe;
//     wbResult.commission = 15 * totalPool / 100; // 15%
//     wbResult.remaining = totalPool - wbResult.commission;
//     wbResult.divident = Math.round(wbResult.remaining / winnerBe * 100) / 100;

//     console.log('totalPool', totalPool, 'winnerBe', winnerBe);
//     console.log('wbResult', JSON.stringify(wbResult));

// }



winBetsModule.addBets("bet:w:1:4")
winBetsModule.addBets("bet:w:1:4")
winBetsModule.addBets("bet:w:1:4")
winBetsModule.addBets("bet:w:1:4")

winBetsModule.calculateDivident( horsesFinishSeq[0]);

console.log( winBetsModule.getResults())
/*var pbArray = [
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

 var pBResult = {};
function calcDividentPlace(list, winSeq) {
    var totalPool = totalbetAmount(list),
        winnerBe = 0,
        remaining,
        commission,
        place1Div,
        place2Div,
        place3Div;
    //1. Calculate total amount

    pBResult.totalPool = totalPool;
    pBResult.commission = 12 * totalPool / 100; // 12%
    pBResult.remaining = totalPool - pBResult.commission;
    // pBResult.totalDivident = Math.round(pBResult.remaining / winnerBe * 100) / 100;
    pBResult.seqDividents = [];

    for (var i = 0; i < winSeq.length; i++) {
        pBResult.seqDividents.push({
            horseNumber: winSeq[i],
            divident: Math.round(100 * ( pBResult.remaining / (totalBetAmountForhorseNumber(list, winSeq[i]) * 3))) / 100  // one third for each group divided by total
        })
    }
    console.log(JSON.stringify(pBResult));

}

calcDividentPlace(pbArray, horsesFinishSeq);

var pEArray = [
    {hSeqence: '1,2', betAmount: 13},
    {hSeqence: '2,3', betAmount: 98},
    {hSeqence: '1,3', betAmount: 82},
    {hSeqence: '3,2', betAmount: 27},
    {hSeqence: '1,2', betAmount: 5},
    {hSeqence: '2,3', betAmount: 61},
    {hSeqence: '1,3', betAmount: 28},
    {hSeqence: '3,2', betAmount: 25},
    {hSeqence: '1,2', betAmount: 81},
    {hSeqence: '2,3', betAmount: 47},
    {hSeqence: '1,3', betAmount: 93},
    {hSeqence: '3,2', betAmount: 51}
];
var pEResult = {};


function totalAmountWithSequence(list, seq) {
    var total = 0;
    list.forEach((b) => {
        if (b.hSeqence === seq) {
            total += b.betAmount;
        }
    });
    return total;
}
function calcDividentExacta(list, winSeq) {
    var totalPool = totalbetAmount(list)

    pEResult.totalPool = totalPool;
    pEResult.commission = 18 * totalPool / 100; // 18%
    pEResult.remaining = totalPool - pEResult.commission;
    pEResult.divident = Math.round(100 * pEResult.remaining / totalAmountWithSequence(list, winSeq[0] + ',' + winSeq[1])) / 100;

    console.log(JSON.stringify(pEResult));

}

calcDividentExacta(pEArray, horsesFinishSeq);
*/
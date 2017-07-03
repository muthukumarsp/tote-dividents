/**
 * Created by m.kumar on 3/07/2017.
 */

console.log('test')

var wbArray = [
    {hNumber: 1, bAmount: 3},
    {hNumber: 2, bAmount: 4},
    {hNumber: 3, bAmount: 5},
    {hNumber: 4, bAmount: 5},
    {hNumber: 1, bAmount: 16},
    {hNumber: 2, bAmount: 8},
    {hNumber: 3, bAmount: 22},
    {hNumber: 4, bAmount: 57},
    {hNumber: 1, bAmount: 42},
    {hNumber: 2, bAmount: 98},
    {hNumber: 3, bAmount: 63},
    {hNumber: 4, bAmount: 15}
];

var horsesFinishSeq = [2, 3, 1];

var wbResult = {};
// Total : 338
// comm: 50.7
// remaining = 287.3
// placed amount : 110

function totalBAmount(list) {
    var total = 0;
    list.forEach((b) => {
        total += b.bAmount;
    });
    return total;
}

function totalBetAmountForHNumber(list, hNumber) {
    var total = 0;
    list.forEach((b) => {
        if (b.hNumber === hNumber) {
            total += b.bAmount;
        }
    });
    return total;
}
function calcDividentWin(list, winnerHor) {
    var totalPool = totalBAmount(list),
        winnerBe = 0,
        remaining,
        commission;
    //1. Calculate total amount
    /*list.forEach((b) => {
     if (b.hNumber === winnerHor) {
     winnerBe += b.bAmount;
     }
     });*/
    winnerBe = totalBetAmountForHNumber(list, winnerHor);
    wbResult.totalPool = totalPool;
    wbResult.winnerBe = winnerBe;
    wbResult.commission = 15 * totalPool / 100; // 15%
    wbResult.remaining = totalPool - wbResult.commission;
    wbResult.divident = Math.round(wbResult.remaining / winnerBe * 100) / 100;

    console.log('totalPool', totalPool, 'winnerBe', winnerBe);
    console.log('wbResult', JSON.stringify(wbResult));

}

calcDividentWin(wbArray, horsesFinishSeq[0]);

var pbArray = [
    {hNumber: 1, bAmount: 31},
    {hNumber: 2, bAmount: 89},
    {hNumber: 3, bAmount: 28},
    {hNumber: 4, bAmount: 72},
    {hNumber: 1, bAmount: 40},
    {hNumber: 2, bAmount: 16},
    {hNumber: 3, bAmount: 82},
    {hNumber: 4, bAmount: 52},
    {hNumber: 1, bAmount: 18},
    {hNumber: 2, bAmount: 74},
    {hNumber: 3, bAmount: 39},
    {hNumber: 4, bAmount: 105}
];

var pBResult = {};
function calcDividentPlace(list, winSeq) {
    var totalPool = totalBAmount(list),
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
            hNumber: winSeq[i],
            divident: Math.round(100 * ( pBResult.remaining / (totalBetAmountForHNumber(list, winSeq[i]) * 3))) / 100  // one third for each group divided by total
        })
    }
    console.log(JSON.stringify(pBResult));

}

calcDividentPlace(pbArray, horsesFinishSeq);

var pEArray = [
    {hSeqence: '1,2', bAmount: 13},
    {hSeqence: '2,3', bAmount: 98},
    {hSeqence: '1,3', bAmount: 82},
    {hSeqence: '3,2', bAmount: 27},
    {hSeqence: '1,2', bAmount: 5},
    {hSeqence: '2,3', bAmount: 61},
    {hSeqence: '1,3', bAmount: 28},
    {hSeqence: '3,2', bAmount: 25},
    {hSeqence: '1,2', bAmount: 81},
    {hSeqence: '2,3', bAmount: 47},
    {hSeqence: '1,3', bAmount: 93},
    {hSeqence: '3,2', bAmount: 51}
];
var pEResult = {};


function totalAmountWithSequence(list, seq) {
    var total = 0;
    list.forEach((b) => {
        if (b.hSeqence === seq) {
            total += b.bAmount;
        }
    });
    return total;
}
function calcDividentExacta(list, winSeq) {
    var totalPool = totalBAmount(list)

    pEResult.totalPool = totalPool;
    pEResult.commission = 18 * totalPool / 100; // 18%
    pEResult.remaining = totalPool - pEResult.commission;
    pEResult.divident = Math.round(100 * pEResult.remaining / totalAmountWithSequence(list, winSeq[0] + ',' + winSeq[1])) / 100;

    console.log(JSON.stringify(pEResult));

}

calcDividentExacta(pEArray, horsesFinishSeq);
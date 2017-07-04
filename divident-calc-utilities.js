
export default class CalcUtilities{

constructor(){

}
 totalBetAmountForhorseNumber(list, horseNumber) {
    //  console.log('calc utilites called')
    var total = 0;
    list.forEach((b) => {
        if (b.horseNumber === horseNumber) {
            total += b.betAmount;
        }
    });
    return total;
 }


 totalBetAmount(list) {
    var total = 0;
    list.forEach((b) => {
        total += b.betAmount;
    });
    return total;
}

 totalAmountWithSequence(list, seq) {
    var total = 0;
    list.forEach((b) => {
        if (b.horseSeqence === seq) {
            total += b.betAmount;
        }
    });
    return total;
}

}
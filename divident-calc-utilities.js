export default class CalcUtilities {

    constructor() {
    }

    totalBetAmountForhorseNumber(list, horseNumber) {
        //  console.log('calc utilites called')
        let total = 0;
        list.forEach((b) => {
            if (b.horseNumber === horseNumber) {
                total += b.betAmount;
            }
        });
        return total;
    }

    totalBetAmount(list) {
        let total = 0;
        list.forEach((b) => {
            total += b.betAmount;
        });
        return total;
    }

    totalAmountWithSequence(list, seq) {
        let total = 0;
        list.forEach((b) => {
            if (b.horseSeqence === seq) {
                total += b.betAmount;
            }
        });
        return total;
    }

}
const calcPercentDifference = (startingVal, finalVal) => {
    let [difference, percentChange] = [
        startingVal - finalVal,
        100 * ( (finalVal - startingVal) / Math.abs(startingVal) )
    ];

    return [percentChange, difference];
}

// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("\n");
}

// part 1
export function solve1(input) {
    var result = 0;    
    var elfCounts = countCalories(input);

    result = elfCounts[elfCounts.length - 1];

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;
    var elfCounts = countCalories(input);
    
    for (let i = elfCounts.length - 3; i < elfCounts.length; i++) {
        result += elfCounts[i]
    }

    return result;
}

function countCalories(input) {
    var elfCounts = [];
    var count = 0;
    input.forEach(line => {
        if (line === '') {
            elfCounts.push(count);  
            count = 0;
        } else {
            count += Number(line);
        }
    });

    elfCounts.sort();
    return elfCounts;
}


// format raw data from input file
export function formatRawData(rawData) {
    var splitted = rawData.split("\n");
    var formatted = [];

    for (let i = 0; i < splitted.length; i++) {
        formatted[i] = splitted[i].split(",");
    }

    return formatted;
}

// part 1
export function solve1(input) {
    var result = 0;    

    for (let i = 0; i < input.length; i++) {
        const sectionPair = input[i];
        
        const first = sectionPair[0].split("-");
        const second = sectionPair[1].split("-");
        
        if (doSectionsOverlap(first, second) 
            || doSectionsOverlap(second, first)) {
            result++;

            console.log(result, first, second);
        }
    }

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;

    return result;
}    

function doSectionsOverlap(first, second) {
    return (first[0] <= second[0] && first[1] >= second[1])
}

// format raw data from input file
export function formatRawData(rawData) {
    rawData = rawData.replaceAll("-", ",");
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

        const first = [Number(sectionPair[0]), Number(sectionPair[1])];
        const second = [Number(sectionPair[2]), Number(sectionPair[3])];

        if (doSectionsOverlap(first, second)
            || doSectionsOverlap(second, first)) {
            result++;
        }
    }

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;

    for (let i = 0; i < input.length; i++) {
        const sectionPair = input[i];

        const first = [Number(sectionPair[0]), Number(sectionPair[1])];
        const second = [Number(sectionPair[2]), Number(sectionPair[3])];

        if (!doSectionsOverlap2(second, first)) {
            result++;
        }
    }

    return result;
}

function doSectionsOverlap(first, second) {
    return (first[0] <= second[0] && first[1] >= second[1]);
}

function doSectionsOverlap2(first, second) {
    return first[1] < second[0] || second[1] < first[0];
}
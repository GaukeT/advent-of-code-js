
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
    const criteria = (first, second) =>
        (first[0] <= second[0] && first[1] >= second[1])

    return findOverlap(input, criteria);
}

// part 2
export function solve2(input) {
    const criteria = (first, second) =>
        (first[1] >= second[0] && second[1] >= first[0]);

    return findOverlap(input, criteria);
}

function findOverlap(input, criteria) {
    var result = 0;

    for (let i = 0; i < input.length; i++) {
        const sectionPair = input[i];

        const firstStart = sectionPair[0];
        const firstEnd = sectionPair[1];
        const secondStart = sectionPair[2];
        const secondEnd = sectionPair[3];

        const first = [firstStart, firstEnd];
        const second = [secondStart, secondEnd];

        if (criteria(first, second) || criteria(second, first)) {
            result++;
        }
    }

    return result;
}

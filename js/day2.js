// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("\n");
}

// part 1
export function solve1(input) {
    var result = 0;    

    input.forEach(game => {
        result += possibilities[game];
    });

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;    

    input.forEach(game => {
        result += possibilities2[game];
    });

    return result;
}    

// A (Rock)     + 1   
// B (Paper)    + 2
// C (Scissors) + 3

// X (Rock)     
// Y (Paper)    
// Z (Scissors) 
var possibilities = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6
}

// X (Lose) + 0
// Y (Draw) + 3
// Z (Win)  + 6
var possibilities2 = {
    "A X": 3,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 2,
    "C Y": 6,
    "C Z": 7
}
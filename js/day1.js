var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");

export function runday1() {
    fetch("./input/day1.txt") 
        .then(response => {
            return response.text();
        })
        .then(data => {
            var rawData = data.split("\r\n"); 

            // temp fix for line feed breaks on gh-pages
            if (rawData.length === 1) {
                rawData = rawData[0].split("\n");
            }

            console.log(rawData);
            input.textContent = rawData;

            return rawData;
        })
        .then(input => {
            solve1(input);
            solve2(input);
        })
        .catch(err => {
            console.log(err);
        });
}

function solve1(input) {
    var result = 0;    
    var result = 0;
    var elfCounts = countCalories(input);
    result = elfCounts[elfCounts.length - 1];

    // submit answer to console and index page
    answer1.textContent += result;
    console.log('part 1: ', result);
}

function solve2(input) {
    var result = 0;
    var elfCounts = countCalories(input);
    
    for (let i = elfCounts.length - 3; i < elfCounts.length; i++) {
        result += elfCounts[i]
    }

    // submit answer to console and index page
    answer2.textContent += result;
    console.log('part 2: ', result);
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

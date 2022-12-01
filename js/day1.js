var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");

function solve1(input) {
    var result = 0;    
    var result = 0;
    var elfCounts = countCalories(input);

    result = elfCounts[elfCounts.length - 1];

    return result;
}

function solve2(input) {
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

export function runday(file) {
    fetch("./input/" + file + ".txt") 
        .then(response => {
            return response.text();
        })
        .then(rawData => {
            // format raw data from file
            var data = rawData.split("\n");
            console.log(data);
            return data;
        })
        .then(data => {
            input.textContent = data;

            answer1.textContent += solve1(data);
            console.log('part 1: ', answer1.textContent); 

            answer2.textContent += solve2(data);
            console.log('part 2: ', answer2.textContent); 
        })
        .catch(err => {
            console.log(err);
        });
}

var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");

export function runday2() {
    fetch("./input/day2.txt") 
        .then(response => {
            return response.text();
        })
        .then(data => {
            var rawData = data; 
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

    // submit answer to console and index page
    answer1.textContent += result;
    console.log('part 1: ', result);
}

function solve2(input) {
    var result = 0;

    // submit answer to console and index page
    answer2.textContent += result;
    console.log('part 2: ', result);
}    
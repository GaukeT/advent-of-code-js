
// format raw data from input file
export function formatRawData(rawData) {
    var formatted = rawData.split("\n");

    // remove stacks part
    // maybe add fancy create stack part here.
    return formatted.splice(10);
}

// part 1
export function solve1(input) {
    var workingStack = JSON.parse(JSON.stringify(stacks));
    
    input.forEach(cmd => {
        var splitted = cmd.split(" ");
        var count = Number(splitted[1]);
        var from = Number(splitted[3]) - 1;
        var to = Number(splitted[5]) - 1;

        for (let i = 0; i < count; i++) {
            var crate = workingStack[from].pop();
            workingStack[to].push(crate);
        }
    });

    return calculateResult(workingStack);
}

// part 2
export function solve2(input) {
    var result = 0;

    return result;
}    

function calculateResult(stacks) {
    var result = '';
    for (let i = 0; i < stacks.length; i++) {
        const stack = stacks[i];
        result += stack.pop();
    }
    return result;
}

const stacks  = [
    ["B", "G", "S", "C"],                       // 1
    ["T", "M", "W", "H", "J", "N", "V", "G"],   // 2
    ["M", "Q", "S"],                            // 3
    ["B", "S", "L", "T", "W", "N", "M"],        // 4
    ["J", "Z", "F", "T", "V", "G", "W", "P"],   // 5    
    ["C", "T", "B", "G", "Q", "H", "S"],        // 6
    ["T", "J", "P", "B", "W"],                  // 7
    ["G", "D", "C", "Z", "F", "T", "Q", "M"],   // 8
    ["N", "S", "H", "B", "P", "F"]              // 9
]
/*
    [G]         [P]         [M]    
    [V]     [M] [W] [S]     [Q]    
    [N]     [N] [G] [H]     [T] [F]
    [J]     [W] [V] [Q] [W] [F] [P]
[C] [H]     [T] [T] [G] [B] [Z] [B]
[S] [W] [S] [L] [F] [B] [P] [C] [H]
[G] [M] [Q] [S] [Z] [T] [J] [D] [S]
[B] [T] [M] [B] [J] [C] [T] [G] [N]
 1   2   3   4   5   6   7   8   9 
*/

const testStack = [
    [],
    ["Z", "N"],
    ["M", "C", "D"],
    ["P"]    
]
/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
*/ 
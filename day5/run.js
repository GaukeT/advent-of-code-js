var stacks = [[],[],[],[],[],[],[],[],[]];

// format raw data from input file
export function formatRawData(rawData) {
    var formatted = rawData.split("\n");
    var stackInfo = formatted.splice(0, 10);
    for (let i = stackInfo.length - 3; i >= 0; i--) {
        const row = stackInfo[i];
        // +4
        addToStack(0, row.substring(1, 2));
        addToStack(1, row.substring(5, 6));
        addToStack(2, row.substring(9, 10));
        addToStack(3, row.substring(13, 14));
        addToStack(4, row.substring(17, 18));
        addToStack(5, row.substring(21, 22));
        addToStack(6, row.substring(25, 26));
        addToStack(7, row.substring(29, 30));
        addToStack(8, row.substring(33, 34));
    }

    return formatted;
}

function addToStack(i, value) {
    if (value !== " ") {
        stacks[i].push(value);
    }
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
    var workingStack = JSON.parse(JSON.stringify(stacks));

    input.forEach(cmd => {
        var splitted = cmd.split(" ");
        var count = Number(splitted[1]);
        var from = Number(splitted[3]) - 1;
        var to = Number(splitted[5]) - 1;

        var crates = workingStack[from].splice(-count);
        workingStack[to].push(...crates);
    });

    return calculateResult(workingStack);
}

function calculateResult(stacks) {
    var result = '';
    for (let i = 0; i < stacks.length; i++) {
        const stack = stacks[i];
        result += stack.pop();
    }
    return result;
}

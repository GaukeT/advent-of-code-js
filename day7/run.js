
// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("\n");
}

// part 1
export function solve1(input) {
    var result = 0;
    var dirs = createDirectoryStructure(input);
    console.log(dirs);

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;

    return result;
}    

function createDirectoryStructure(input) {
    var dirs = {
        "/" : {}
    };
    var path = ["/"];
    var pwd = findPWD(dirs, path);

    input.forEach(cmd => {
        if (cmd.startsWith("$")) {
            // process cmd
            if (cmd !== "$ ls") {
                var dir = cmd.substring(5);

                if (dir === "/") {
                    path = ["/"];
                } else if (dir === "..") {
                    path.pop();
                } else {
                    path.push(dir);
                }

                pwd = findPWD(dirs, path);
            }
        }
        else if (cmd.startsWith("dir")) {
            // add dir to pwd
            var dir = cmd.substring(4);
            pwd[dir] = {};
        }
        else {
            // add file to pwd
            var file = cmd.substring(cmd.indexOf(" ") + 1);
            var size = cmd.substring(0, cmd.indexOf(" "));
            pwd[file] = Number(size);
        }
    });

    return dirs;
}


function findPWD(dirs, path) {
    // start at root
    var browse = dirs[path[0]];

    // loop through path to find pwd
    for (let i = 1; i < path.length; i++) {
        browse = browse[path[i]];
    }

    return browse;
}
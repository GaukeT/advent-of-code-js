
// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("\n");
}

// part 1
export function solve1(input) {
    var dirs = createDirectoryStructure(input);
    return sumOfAllDirsWithLimit(dirs["/"]);
}

// part 2
export function solve2(input) {
    var dirs = createDirectoryStructure(input);
    var unusedSpace = 70000000 - dirs["/"]["size"];
    var sizeToClean = 30000000 - unusedSpace;

    return diskToClean(dirs["/"], sizeToClean);
}    

function diskToClean(dirs, sizeToClean, result = 70000000) {
    var dirSize = dirs["size"];

    if (dirSize > sizeToClean && dirSize < result) {
        result = dirSize;
    } 

    var props = Object.keys(dirs);
    if (props.length > 2) {
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (prop !== "size" && prop !== "parent") {
                var isDir = typeof dirs[prop] === 'object';
                
                if (isDir) {
                    result = diskToClean(dirs[prop], sizeToClean, result);
                }
            }
        }
    }
    return result;
}

function sumOfAllDirsWithLimit(dirs, result = 0, limit = 100000) {
    var dirSize = dirs["size"];

    if (dirSize < limit) {
        result = result + dirSize;
    }
    
    var props = Object.keys(dirs);
    if (props.length > 2) {
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (prop !== "size" && prop !== "parent") {
                var isDir = typeof dirs[prop] === 'object';
                
                if (isDir) {
                    result = sumOfAllDirsWithLimit(dirs[prop], result);
                }
            }
        }
    }
    return result;
}

function createDirectoryStructure(input) {
    var dirs = {
        "/" : {
            "parent": "",
            "size": 0
        }
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
            pwd[dir] = { 
                "parent": findParent(dirs, path),
                "size": 0
            };
        }
        else {
            // add file to pwd
            var file = cmd.substring(cmd.indexOf(" ") + 1);
            var size = Number(cmd.substring(0, cmd.indexOf(" ")));
            
            pwd[file] = size;
            addSizeToDir(pwd, size);
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

function findParent(dirs, path) {
    // start at root
    var browse = dirs[path[0]];

    // loop through path to find pwd
    for (let i = 1; i < path.length; i++) {
        browse = browse[path[i]];
    }

    return browse;
}

function addSizeToDir(dir, size) {
    dir["size"] = dir["size"] + size;

    var parent = dir["parent"];
    if (parent !== "") {
        return addSizeToDir(parent, size);
    }

    return;
}



/*
promise学习
递归读取文件夹下的文件

*/


var fs = require('fs');
var path = require('path');

function readdirPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, list) => {
            if (err) {
                reject(err);
            }
            resolve(list);
        });
    });
}

function statPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}

function listDir(dir) {
    return statPromisify(dir).then(stats => {
        if (stats.isDirectory()) {
            return readdirPromisify(dir).then(list => 
                Promise.all(list.map(item => 
                    listDir(path.resolve(dir, item))
                ))
            ).then(subtree => {
				console.log(subtree)
				return [].concat(...subtree)
				});
        } else {
            return [dir];
        }
    });
}

console.log(listDir('./'));

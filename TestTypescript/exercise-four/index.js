"use strict";
exports.__esModule = true;
var Path_1 = require("./models/Path");
var data = require('./trama-examen-fe-1.json');
function createObjectArray(objFromJson) {
    if (objFromJson) {
        var pathsObj = objFromJson.paths;
        var arrayNewPaths = [];
        for (var pathKey in pathsObj) {
            var onePathObj = pathsObj[pathKey];
            for (var pathPropertyKey in onePathObj) {
                if (typeof onePathObj[pathPropertyKey] !== 'string') {
                    var dataPath = onePathObj[pathPropertyKey];
                    var pathToAdd = new Path_1.PathBuilder().setPath(pathKey).setHttpMethod(pathPropertyKey)
                        .setOperationId(dataPath['operationId']).setConsumes(dataPath["consumes"])
                        .setParameters(dataPath['parameters']).build();
                    arrayNewPaths.push(pathToAdd);
                }
            }
        }
        return arrayNewPaths;
    }
    else
        console.log("ERROR: 'objFromJSON' is null or empty");
}
var tramaConFormato = createObjectArray(data);
console.log('tramaConFormato', tramaConFormato);

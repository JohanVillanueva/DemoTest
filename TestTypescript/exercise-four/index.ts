
import { PathBuilder } from './models/Path';
declare function require(url: string);

const data = require('./trama-examen-fe-1.json');

function createObjectArray(objFromJson:any){
    if (objFromJson) {
        let pathsObj = objFromJson.paths;
        let arrayNewPaths:any[]=[];
        for (const pathKey in pathsObj) {
            let onePathObj = pathsObj[pathKey]
             for (const pathPropertyKey in onePathObj) {
                if (typeof onePathObj[pathPropertyKey] !== 'string') {
                    const dataPath = onePathObj[pathPropertyKey];
                    let pathToAdd = new PathBuilder().setPath(pathKey).setHttpMethod(pathPropertyKey)
                                        .setOperationId(dataPath['operationId']).setConsumes(dataPath["consumes"])
                                        .setParameters(dataPath['parameters']).build();
                   
                    arrayNewPaths.push(pathToAdd);
                }
             }   
        }
        return arrayNewPaths;
    }
    else console.log(`ERROR: 'objFromJSON' is null or empty`);
}

var tramaConFormato = createObjectArray(data);
console.log('tramaConFormato', tramaConFormato);

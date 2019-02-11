
function testFunction(x?:any,y?:any){
    if(!areValidParameters(x,y)) 
        return 'ERROR: Existen parámetros requeridos no válidos o faltantes';
      
    // Function Code
    return 'ÉXITO: Parámetros completos y correctos';
}

function areValidParameters(...parameters:any){
    return parameters.findIndex(parameter=> !parameter)==-1;
}

console.log('TEST');

let a;
console.log('testFunction(a,19): => ',testFunction(a,19));
console.log('testFunction(19): => ',testFunction(19));
console.log('testFunction(): => ',testFunction());
console.log('testFunction(12,"78"): => ',testFunction(12,'78'));
console.log('testFunction(12,undefined): => ',testFunction(12,undefined));
console.log('testFunction("hola",null): => ',testFunction('hola',null));

function testFunction(x, y) {
    if (!areValidParameters(x, y))
        return 'ERROR: Existen parámetros requeridos no válidos o faltantes';
    // Function Code
    return 'ÉXITO: Parámetros completos y correctos';
}
function areValidParameters() {
    var parameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parameters[_i] = arguments[_i];
    }
    return parameters.findIndex(function (parameter) { return !parameter; }) == -1;
}
console.log('TEST');
var a;
console.log('testFunction(a,19): => ', testFunction(a, 19));
console.log('testFunction(19): => ', testFunction(19));
console.log('testFunction(): => ', testFunction());
console.log('testFunction(12,"78"): => ', testFunction(12, '78'));
console.log('testFunction(12,undefined): => ', testFunction(12, undefined));
console.log('testFunction("hola",null): => ', testFunction('hola', null));

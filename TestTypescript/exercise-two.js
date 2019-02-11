var CustomArray = /** @class */ (function () {
    function CustomArray(values) {
        this.values = [];
    }
    CustomArray.prototype.map = function (customFunction) {
        //console.log('Values in Map Function => ',this.values);
        var arrayResult = [];
        this.values.forEach(function (element) {
            arrayResult.push(customFunction(element));
        });
        return Object.create(this, { values: { value: arrayResult } });
    };
    CustomArray.prototype.filter = function (customFunction) {
        //console.log('Values in Filter Function => ',this.values);
        var arrayResult = [];
        this.values.forEach(function (element) {
            if (customFunction(element))
                arrayResult.push(element);
        });
        return Object.create(this, { values: { value: arrayResult } });
    };
    CustomArray.prototype.reduce = function (customFunction, initialValue) {
        var acumulator = initialValue;
        var array = this.values;
        array.forEach(function (element) {
            acumulator = customFunction(acumulator, element);
        });
        return acumulator;
    };
    return CustomArray;
}());
// Función que devuelve la suma de los cubos perfectos entre dos números (incluyendo los mismos de ser el caso)
function getSumOddCubesNumbers(from, to) {
    var naturalNumbers = new CustomArray();
    for (var i = from; i <= to; i++) {
        naturalNumbers.values.push(i);
    }
    var result = naturalNumbers
        .map(function (number) { return Math.pow(number, 3); })
        .filter(function (number) { return number >= from && number <= to; })
        .reduce(function (acumulator, number) { return acumulator + number; }, 0);
    return result;
}
console.log('Suma de cubos perfectos entre 1 y 1000 => ', getSumOddCubesNumbers(1, 1000));

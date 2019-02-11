class CustomArray {
    values:any[];
   
    constructor(values?:any[]) {
        this.values=[];
    }

    map(customFunction) {
        //console.log('Values in Map Function => ',this.values);
        let arrayResult=[];
        this.values.forEach((element: any) => {
            arrayResult.push(customFunction(element));
        });
        return Object.create(this,{values:{value:arrayResult}});
    }

    filter(customFunction)  {
        //console.log('Values in Filter Function => ',this.values);
        let arrayResult = [];
        this.values.forEach((element: any) => {
            if(customFunction(element)) 
                arrayResult.push(element);
        });
        return Object.create(this,{values:{value:arrayResult}});
    }

    reduce(customFunction, initialValue)  {
        var acumulator=initialValue;
        var array = this.values;
        array.forEach((element: any) => {
            acumulator = customFunction(acumulator,element);
        });
        return acumulator;
    }
}

// Función que devuelve la suma de los cubos perfectos entre dos números (incluyendo los mismos de ser el caso)
function getSumOddCubesNumbers(from:number,to:number){
    const naturalNumbers = new CustomArray();
    for (let i = from; i <= to; i++) {
        naturalNumbers.values.push(i);
    }
    let result = naturalNumbers
                    .map((number)=> Math.pow(number,3))
                    .filter((number)=> number>=from && number<=to)
                    .reduce((acumulator,number)=>acumulator+number,0);
    return result;
}

console.log('Suma de cubos perfectos entre 1 y 1000 => ',getSumOddCubesNumbers(1,1000));

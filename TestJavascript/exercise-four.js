var drinks = {
    "code1": "limonada",
    "code2": "fanta",
    "code3": "cerveza",
    "code4": "kerosene",
    "code5": "gasolina",
    "code6": "chicharra",
    "code7": "pisco",
    "code8": "punto g",
    "code923": "ron",
    "code10": "leche",
    "code11": "quaker",
    "code12": "guarana",
    "default":"agua de jamaica" //Default Value
};

function executeExercisefour(code){
    console.log(`Estoy tomando ${(drinks[code] || drinks['default'])}`);
}
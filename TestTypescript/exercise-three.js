"use strict";
exports.__esModule = true;
var characters_1 = require("./exercise-three-src/constans/characters");
var skills_1 = require("./exercise-three-src/constans/skills");
var CharacterFactory_1 = require("./exercise-three-src/models/CharacterFactory");
/**
 *
 * @param characterType Valid Character Type
 * @param quantity If this is null or undefined or 1 the response is an object. If this is >1 the response is an array
 */
function createPlayers(characterType, quantity) {
    if (quantity === void 0) { quantity = 1; }
    if (characters_1.CharacterTypes[characterType]) {
        var characterFactory = new CharacterFactory_1.CharacterFactory();
        if (quantity && quantity >= 1) {
            if (quantity === 1)
                return characterFactory.createCharacter(characterType);
            var arrayPlayers = [];
            for (var i = 0; i < quantity; i++) {
                arrayPlayers.push(characterFactory.createCharacter(characterType));
            }
            return arrayPlayers;
        }
        else
            console.log("ERROR: No se pudo crear el personaje de tipo " + characterType + " porque no ingres\u00F3 una cantidad v\u00E1lida.");
    }
    else
        console.log("ERROR: No existe un tipo de personaje llamado " + characterType);
}
/**
 *
 * @param name Name of custom character
 * @param skillstoAdd Array of character's skills to add
 * @param quantity Number of characters to create
 */
function createPlayersWithCustomCharacters(name, skillstoAdd, quantity) {
    if (skillstoAdd === void 0) { skillstoAdd = []; }
    if (quantity === void 0) { quantity = 1; }
    var characterFactory = new CharacterFactory_1.CharacterFactory();
    if (quantity && quantity >= 1) {
        if (quantity === 1)
            return characterFactory.createCustomCharacter(name, skillstoAdd);
        var arrayPlayers = [];
        for (var i = 0; i < quantity; i++) {
            arrayPlayers.push(characterFactory.createCustomCharacter(name, skillstoAdd));
        }
        return arrayPlayers;
    }
    else
        console.log("ERROR: No se pudo crear el personaje de nombre " + name + " porque no ingres\u00F3 una cantidad v\u00E1lida.");
}
(function () {
    console.log(createPlayers(characters_1.CharacterTypes.PROTOSS));
    console.log(createPlayers(characters_1.CharacterTypes.TERRAN));
    console.log(createPlayers(characters_1.CharacterTypes.ZERG));
    console.log(createPlayersWithCustomCharacters('Custom1', [skills_1.skillsNames.CORRER, skills_1.skillsNames.DEFENDER, skills_1.skillsNames.ATACAR]));
    console.log(createPlayersWithCustomCharacters('Custom2', [skills_1.skillsNames.HECHIZAR, skills_1.skillsNames.CONTROL_MENTAL, skills_1.skillsNames.SANAR]));
})();

import { CharacterTypes } from "./exercise-three-src/constans/characters";
import { skillsNames } from "./exercise-three-src/constans/skills";
import { CharacterFactory } from "./exercise-three-src/models/CharacterFactory";

/**
 * 
 * @param characterType Valid Character Type
 * @param quantity If this is null or undefined or 1 the response is an object. If this is >1 the response is an array
 */
function createPlayers(characterType:string,quantity:number=1){
    if (CharacterTypes[characterType]) {
        const characterFactory = new CharacterFactory();
        if (quantity && quantity>=1) {
            if(quantity===1) return characterFactory.createCharacter(characterType);
            let arrayPlayers = [];
            for (let i = 0; i < quantity; i++) {
                arrayPlayers.push(characterFactory.createCharacter(characterType));
            }
            return arrayPlayers;
        }
        else console.log(`ERROR: No se pudo crear el personaje de tipo ${characterType} porque no ingresó una cantidad válida.`);
    }
    else console.log(`ERROR: No existe un tipo de personaje llamado ${characterType}`);
    
}
/**
 * 
 * @param name Name of custom character
 * @param skillstoAdd Array of character's skills to add
 * @param quantity Number of characters to create
 */
function createPlayersWithCustomCharacters(name:string,skillstoAdd:string[]=[],quantity:number=1 ){
    const characterFactory = new CharacterFactory();
    if (quantity && quantity>=1) {
        if(quantity===1) return characterFactory.createCustomCharacter(name,skillstoAdd);
        let arrayPlayers = [];
        for (let i = 0; i < quantity; i++) {
            arrayPlayers.push(characterFactory.createCustomCharacter(name,skillstoAdd));
        }
        return arrayPlayers;
    }
    else console.log(`ERROR: No se pudo crear el personaje de nombre ${name} porque no ingresó una cantidad válida.`);
}

(function(){
    console.log(createPlayers(CharacterTypes.PROTOSS));
    console.log(createPlayers(CharacterTypes.TERRAN));
    console.log(createPlayers(CharacterTypes.ZERG));
    console.log(createPlayersWithCustomCharacters('Custom1', [skillsNames.CORRER,skillsNames.DEFENDER,skillsNames.ATACAR]));
    console.log(createPlayersWithCustomCharacters('Custom2', [skillsNames.HECHIZAR,skillsNames.CONTROL_MENTAL,skillsNames.SANAR]));
})();



import { ICharacterFactory } from "../Interfaces/ICharacterFactory";
import { ICharacter } from "../Interfaces/ICharacter";
import { CharacterTypes } from "../constans/characters";
import { Protoss } from "./Protoss";
import { Terran } from "./Terran";
import { Custom } from "./Custom";
import { Zerg } from './Zerg';

export class CharacterFactory implements ICharacterFactory{
    createCharacter(type: string): ICharacter {
        switch (type) {
            case CharacterTypes.PROTOSS:
                return new Protoss();
            case CharacterTypes.TERRAN:
                return new Terran();
            case CharacterTypes.ZERG:
                return new Zerg();
            default:
                return null;
        }
    }
    
    createCustomCharacter(name,skillsToAdd:string[]=[]):ICharacter{
        return new Custom(name,skillsToAdd);
    }
    
}
import { ICharacter } from "./ICharacter";

export interface ICharacterFactory {
    createCharacter(type: string):ICharacter;
}
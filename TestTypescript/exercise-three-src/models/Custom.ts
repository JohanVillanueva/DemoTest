import { ICharacter } from "../Interfaces/ICharacter";

import { skillsNames, availableSkills } from "../constans/skills";

export class Custom implements ICharacter{

    name:string;

    constructor(name,skillsToAdd:string[]=[]) {
        this.name = name;
        skillsToAdd.forEach(skill => {
            this.addSkill(skill)        
        });
    }
    addSkill(skillName:string): void {
        if (skillsNames[skillName.toLocaleUpperCase()]) {
            this[skillName.toLowerCase()] = availableSkills[skillName].action;
        }
        else console.warn(`WARN: No se pudo agregar '${skillName}' a  '${this.name}' porque no es una habilidad válida`);
    }
}
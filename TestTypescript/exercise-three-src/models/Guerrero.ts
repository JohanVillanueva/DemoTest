import { ICharacter } from "../Interfaces/ICharacter";
import { skillsNames, availableSkills } from "../constans/skills";

export class Guerrero implements ICharacter{

    constructor() {
        this.addSkill(skillsNames.HABLAR);
        this.addSkill(skillsNames.GRITAR);
    }

    addSkill(skillName:string): void {
        if (skillsNames[skillName.toLocaleUpperCase()]) {
            this[skillName.toLowerCase()] = availableSkills[skillName].action;
        }
        else console.error(`ERROR: No existe una habilidad con el nombre '${skillName}'`);    
    }
}
import { Guerrero } from "./Guerrero";
import { skillsNames } from "../constans/skills";

export class Protoss extends Guerrero{
   
    constructor() {
        super();
        this.addSkill(skillsNames.CORRER);
        this.addSkill(skillsNames.DEFENDER);
    }
    
}
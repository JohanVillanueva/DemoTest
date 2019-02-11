import { Guerrero } from "./Guerrero";
import { skillsNames } from "../constans/skills";

export class Zerg extends Guerrero{
    
    constructor() {
        super();
        this.addSkill(skillsNames.CONTROL_MENTAL);
        this.addSkill(skillsNames.VOLAR);
    }
}
import { Guerrero } from "./Guerrero";
import { skillsNames } from "../constans/skills";

export class Terran extends Guerrero{
     
    constructor() {
        super();
        this.addSkill(skillsNames.ATACAR);
        this.addSkill(skillsNames.HECHIZAR);
    }
}
"use strict";
exports.__esModule = true;
var skills_1 = require("../constans/skills");
var Guerrero = /** @class */ (function () {
    function Guerrero() {
        this.addSkill(skills_1.skillsNames.HABLAR);
        this.addSkill(skills_1.skillsNames.GRITAR);
    }
    Guerrero.prototype.addSkill = function (skillName) {
        if (skills_1.skillsNames[skillName.toLocaleUpperCase()]) {
            this[skillName.toLowerCase()] = skills_1.availableSkills[skillName].action;
        }
        else
            console.error("ERROR: No existe una habilidad con el nombre '" + skillName + "'");
    };
    return Guerrero;
}());
exports.Guerrero = Guerrero;

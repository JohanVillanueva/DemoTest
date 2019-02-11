"use strict";
exports.__esModule = true;
var skills_1 = require("../constans/skills");
var Custom = /** @class */ (function () {
    function Custom(name, skillsToAdd) {
        if (skillsToAdd === void 0) { skillsToAdd = []; }
        var _this = this;
        this.name = name;
        skillsToAdd.forEach(function (skill) {
            _this.addSkill(skill);
        });
    }
    Custom.prototype.addSkill = function (skillName) {
        if (skills_1.skillsNames[skillName.toLocaleUpperCase()]) {
            this[skillName.toLowerCase()] = skills_1.availableSkills[skillName].action;
        }
        else
            console.warn("WARN: No se pudo agregar '" + skillName + "' a  '" + this.name + "' porque no es una habilidad v\u00E1lida");
    };
    return Custom;
}());
exports.Custom = Custom;

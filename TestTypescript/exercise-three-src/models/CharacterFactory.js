"use strict";
exports.__esModule = true;
var characters_1 = require("../constans/characters");
var Protoss_1 = require("./Protoss");
var Terran_1 = require("./Terran");
var Custom_1 = require("./Custom");
var Zerg_1 = require("./Zerg");
var CharacterFactory = /** @class */ (function () {
    function CharacterFactory() {
    }
    CharacterFactory.prototype.createCharacter = function (type) {
        switch (type) {
            case characters_1.CharacterTypes.PROTOSS:
                return new Protoss_1.Protoss();
            case characters_1.CharacterTypes.TERRAN:
                return new Terran_1.Terran();
            case characters_1.CharacterTypes.ZERG:
                return new Zerg_1.Zerg();
            default:
                return null;
        }
    };
    CharacterFactory.prototype.createCustomCharacter = function (name, skillsToAdd) {
        if (skillsToAdd === void 0) { skillsToAdd = []; }
        return new Custom_1.Custom(name, skillsToAdd);
    };
    return CharacterFactory;
}());
exports.CharacterFactory = CharacterFactory;

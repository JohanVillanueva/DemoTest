"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Guerrero_1 = require("./Guerrero");
var skills_1 = require("../constans/skills");
var Zerg = /** @class */ (function (_super) {
    __extends(Zerg, _super);
    function Zerg() {
        var _this = _super.call(this) || this;
        _this.addSkill(skills_1.skillsNames.CONTROL_MENTAL);
        _this.addSkill(skills_1.skillsNames.VOLAR);
        return _this;
    }
    return Zerg;
}(Guerrero_1.Guerrero));
exports.Zerg = Zerg;

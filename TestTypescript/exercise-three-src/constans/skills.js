"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.skillsNames = {
    CORRER: 'CORRER',
    DEFENDER: 'DEFENDER',
    ATACAR: 'ATACAR',
    HECHIZAR: 'HECHIZAR',
    CONTROL_MENTAL: 'CONTROL_MENTAL',
    VOLAR: 'VOLAR',
    SANAR: 'SANAR',
    HABLAR: 'HABLAR',
    GRITAR: 'GRITAR'
};
function getAvailableSkills() {
    var skillsStore = {};
    var _loop_1 = function (skill) {
        var _a;
        skillsStore = __assign({}, skillsStore, (_a = {}, _a[skill] = {
            action: function () { return console.log('Ejecuta la Habilidad: ', exports.skillsNames[skill]); },
            name: exports.skillsNames[skill]
        }, _a));
    };
    for (var skill in exports.skillsNames) {
        _loop_1(skill);
    }
    return skillsStore;
}
exports.availableSkills = getAvailableSkills();

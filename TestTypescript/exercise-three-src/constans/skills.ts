export const skillsNames = {
    CORRER : 'CORRER',
    DEFENDER: 'DEFENDER',
    ATACAR: 'ATACAR',
    HECHIZAR: 'HECHIZAR',
    CONTROL_MENTAL: 'CONTROL_MENTAL',
    VOLAR: 'VOLAR',
    SANAR: 'SANAR',
    HABLAR: 'HABLAR',
    GRITAR: 'GRITAR'
}

function getAvailableSkills(){
    let skillsStore={};
    for (const skill in skillsNames) {
        skillsStore = {
            ...skillsStore, 
            [skill]:{
                action: function(){return console.log('Ejecuta la Habilidad: ',skillsNames[skill])},
                name:skillsNames[skill]
            }
        }
    }
    return skillsStore;
}

export const availableSkills = getAvailableSkills();

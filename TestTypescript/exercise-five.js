var peopleArray = [
    {
        name: 'Pepe',
        edad: 11
    },
    {
        name: 'Juan',
        edad: 22
    },
    {
        name: 'Lalo',
        edad: 33
    }
];
function filterPeopleByAge(array) {
    var ages = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ages[_i - 1] = arguments[_i];
    }
    if (ages) {
        return array.filter(function (person) { return ages.includes(person.edad); })
            .map(function (_a) {
            var name = _a.name;
            return name;
        });
    }
}
(function () {
    console.log(filterPeopleByAge(peopleArray, 11, 12, 13));
})();

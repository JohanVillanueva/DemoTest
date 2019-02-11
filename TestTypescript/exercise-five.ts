const peopleArray = [
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

function filterPeopleByAge(array,...ages:number[]){
    if (ages) {
      return  array.filter(person=>ages.includes(person.edad))
                    .map(({name})=>name);
    }
}
(function(){
    console.log(filterPeopleByAge(peopleArray,11,12,13));
})()
  
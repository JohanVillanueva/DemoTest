var peopleList = Array.from([
{
  name: 'Pepe',
  donacion: true,
  esposas: ['Rosangela', 'Mayte']
},
{
  name: 'Juan',
  donacion: false,
  esposas: ['Yahaira']
},
{
  name: 'Lalo',
  donacion: true,
  esposas: []
}
]);

// Obtención de lista de nombres de personas que donan órganos y tienen 1 o más esposas cuyo nombre empieza con Y o N 
function executeExerciseThree(){
    let filteredList =  peopleList
    .filter(
      ({donacion,esposas})=>{
        let listfilteredEsposas =  esposas.filter(name=>['Y','N'].includes(name.charAt(0)));
        return  donacion && listfilteredEsposas.length > 0
      }
    )
    .map(({name})=>name);
    console.log('Resultado', filteredList);
}

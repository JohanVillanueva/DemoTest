var talk = talky;
var cat = {
  speak: talk,
  sound: 'miau'
}
var dog = {
  speak: cat.speak,
  sound: 'wof'
}
function talky() {
  console.log(this.sound);
}
 // Invocación del método 'speak' de cat para IMPRIMIR propiedad 'sound' de dog
function executeExerciseTwo(){
    this.cat.speak.call(dog);   //Modificación de Contexto
}
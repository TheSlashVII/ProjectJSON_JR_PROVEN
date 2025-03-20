/*
* Quiero hacer una pagina web que muestre informacion basica sobre todas las poblaciones de Euskal Herria
*
*
*
* */

/*
funciones para buscar los datos de las poblaciones de españa
pasos que he hecho para procesar la informacion recibida

1. recibir la informacion de la poblacion de cada ciudad de españa usando el fetch API
2. convertir el response que nos devuelva en un json
3. luego quiero recojer unicamente los campos de la informacion que me parezcan relevantes
4.

*/


export default {}
const  populationDataFetch =  await fetch("https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/pueblos_euskadi_turismo/opendata/pueblos.json");
let populationData = await populationDataFetch.json(); //

console.log(populationData); // esta informacion es recogida de manera correcta

// generar un schema a partir de la info del
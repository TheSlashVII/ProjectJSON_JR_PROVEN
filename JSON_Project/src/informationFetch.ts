// imports
import { city } from "./json_schema/index.ts"; // tipo city que usare para filtrar ciudades
import { writeFile } from 'fs/promises'; // substituto del Bun.write
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
4. finalmente quiero crear una pagina web donde solo se muestren informacion relevante al usuario

*/


export default {}


const  populationDataFetch =  await fetch("https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/pueblos_euskadi_turismo/opendata/pueblos.json");
const populationData = await populationDataFetch.json(); // recibir el response
const RawCities:city[] = JSON.parse(JSON.stringify(populationData));
export const filteredCities: city[] = RawCities.map(eachCity =>{
    // lo que hice aquí abajo fue devolver los municipios de Euskadi con los apartados que me interesaban (que son los del tipo city)
    // básicamente filtrar a mi manera
    let filteredCity: city;
    filteredCity = {documentName: eachCity.documentName, // nombre de la ciudad
        locality: eachCity.locality, // nombre de la localidad
        municipality: eachCity.municipality, // nombre del municipio
        territory: eachCity.territory, // nombre del territorio
        territorycode: eachCity.territorycode, // codigo del territorio
        municipalitycode: eachCity.municipalitycode}; // codigo del municipio
    return filteredCity; // añadir cada ciudad filtrada de vuelta en la nueva lista filtrada
})
// console.log(filteredCities); // pruebas para

// const filteredCities:city[];



// mini paquete de configuraciones para simplificar el codigo

const jsonOrganization = {
    targetPath: "./citiesEsukadi.json",
    infoToJSON: JSON.stringify(filteredCities)
}

await writeFile(jsonOrganization.targetPath,jsonOrganization.infoToJSON); // funcion para escribir las ciudades a un archivo




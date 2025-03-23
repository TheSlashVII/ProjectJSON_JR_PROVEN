// imports
import { city } from "./json_schema/index.ts"; // tipo city que usare para filtrar ciudades
// @ts-ignore // typescript se estaba poniendo pesadito aqui tambien
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
const url = "https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/pueblos_euskadi_turismo/opendata/pueblos.json";
const populationDataFetch =  await fetch(url);
const populationData = await populationDataFetch.json().catch(error => {
    console.log(error) //  esto es para capturar el error en caso de que haya uno
}); // recibir el response



const RawCities:city[] = JSON.parse(JSON.stringify(populationData));
export const cleanCities:city[] = []
// con esta funcion podemos devolver objetos de las ciudades de Euskadi con los campos relevantes
RawCities.forEach((currentCity:city) => {
    let fCity:city = {
        documentName: currentCity.documentName,
        locality: currentCity.locality,
        municipality: currentCity.municipality,
        municipalitycode: currentCity.municipalitycode,
        territory: currentCity.territory ,
        territorycode: currentCity.territorycode
    };
    cleanCities.push(fCity);
})

// antiguo código para filtrar informacion
/*
// para filtrar las ciudades con la informacion que me importa
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
 */

// console.log(filteredCities); // pruebas para comprobar si la lista esta filtrada

// const filteredCities:city[];



// mini paquete de configuraciones para simplificar el codigo
// este código de abajo generara el archivo json local del response que hicimos filtrado
// he utilizado la libreria fs/promises para su funcion writeFile porque el Bun.write no funcionaba
const jsonOrganization = {
    targetPath: "./citiesEsukadi.json",
    infoToJSON: JSON.stringify(cleanCities),
}

await writeFile(jsonOrganization.targetPath,jsonOrganization.infoToJSON); // funcion para escribir las ciudades a un archivo




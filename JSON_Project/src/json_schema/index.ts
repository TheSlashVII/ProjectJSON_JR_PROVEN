// imports
import Ajv from 'ajv';
import tsj from "ts-json-schema-generator";

/*
* Quiero mostrar las ciudades del pais basco "Euskal Herria"
*
*
* */

// esta es la informacion con la que vamos a trabajar
export type city = {
    documentName: string, //nombre de la ciudad
    locality: string, // nombre de la localidad
    territory: string, // nombre del territorio (provincia)
    municipality: string, // nombre del municipio
    municipalitycode: string, // codigo de la ciudad
    territorycode: string // codigo del territorio
}
const citySchema = {
    type: 'object',
    properties: {
        documentName: {type : "string"},
        locality: {type : "string"},
        territory: {type : "string"},
        municipality: {type : "string"},
        municipalitycode: {type : "string"},
        terrytorycode: {type : "string"}
    },
    required: ['documentName', 'locality', 'territory', 'municipality',"municipalitycode", "territorycode"]
}
const ajv = new Ajv();
const validateCity = ajv.compile(citySchema);

const Bilbao:city = {
    municipality: "Bilbao",
    municipalitycode: "028",
    territory: "Biskaia",
    territorycode: "08293",
    documentName: 'Bilbao',
    locality: 'Biskaia',

}
const parsedCity : city = JSON.parse(JSON.stringify(Bilbao));
console.log(parsedCity);
if (!validateCity(Bilbao)) {
    console.log("Invalid city name");
} else {
    console.log("valid city")
}
// configuracion para la generacion automatica del schema

const configuration = {
    path: "./index.ts",
    tsconfig: "./tsconfig.json",
    type:"*"
}
const outputPath = "finalSchema.json";
const schema = tsj.createGenerator(configuration).createSchema(configuration.type);
const schString = JSON.stringify(schema,null,2);
await Bun.write(outputPath, schString);


/*
* comando usado para generar el schema
* bun ts-json-schema-generator -p index.ts  --type 'city' -f .\tsconfig.json > finalSchema.json
* */

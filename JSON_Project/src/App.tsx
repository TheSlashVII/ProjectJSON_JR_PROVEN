// imports
import { city } from "./json_schema/index.ts";
import { filteredCities } from "./informationFetch.ts";
// @ts-ignore // puse esto porque typescript se estaba poniendo pesado
import './App.css';

function App() {

    const listCities:city[] = []
    filteredCities.forEach(currentCity => listCities.push(currentCity))
//  <div>{filteredCities.map(city => <div className="eachCityDisplay"> <h4>{city.documentName}</h4> <p><strong>Localidad:</strong> {city.locality}</p> <p><strong>Municipio:</strong> {city.municipality}</p> <h6> <strong>Código de Municipio</strong> </h6> <p><strong>Territorio:</strong> {city.territory}</p> <h6> <strong>Código de Territorio:</strong> {city.territorycode} </h6> </div>)}</div>
    return (
        <div>

            <header className="header">
                <img src={"./src/assets/basqueFlag.png"} alt="basqueFlag"/>
                <h1>Información de las ciudades de Euskadi</h1>
            </header>
            <main>
                <section>
                    {listCities.map(currentCity => <div>{currentCity.documentName}</div>)}

                </section>

            </main>


        </div>
    )
}

export default App

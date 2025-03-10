async function fetchCountryData() {
    const nameOfCountry = document.getElementById("input-country");
    const url = "https://restcountries.com/";
    try{
        const response = await fetch(url);
        if(!response.ok){
            console.warn("country not found");
        }
        const info = await response.json();
        const country = info[0];
        const capital = country.capital ? country.capital[0] : "none";
        const population = country.population.Number();
        const region = country.region;
        const flag = country.flags.svg;
        const borders = country.borders;

        // document.getElementById("country-info").innerHTML=
        // <p><strong>Capital:</strong> ${capital}</p>
        // <p><strong>population:</strong> ${population}</p>

    }
    catch(error){
        console.warn(error);
    }
}
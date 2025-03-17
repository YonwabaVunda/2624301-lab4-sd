async function fetchCountryData(event) {
    event.preventDefault();
    const nameOfCountry = document.getElementById("input-country").value.trim();
    const url = `https://restcountries.com/v3.1/name/${nameOfCountry}`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            console.warn("country not found");
            return
        }
        const info = await response.json();
        const country = info[0];
        const capital = country.capital ? country.capital[0] : "no capital";
        const population = country.population.toLocaleString();
        const region = country.region;
        const flag = country.flags.svg;
        const borders = country.borders || [];
        
        document.getElementById("country-info").innerHTML = `
        <h3>${country.name.common}</h3>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
        <img src="${flag}" alt="Flag of ${country.name.common}">
    `;
    await fetchBorderingCountries(borders);

    }
    catch(error){
        console.warn("Error fetching country data:", error);
    }
}
async function fetchBorderingCountries(borderCodes) {
    const bordersContainer = document.getElementById("bordering-countries");
    bordersContainer.innerHTML = "";

    if (borderCodes.length === 0) {
        bordersContainer.innerHTML = "<p>No bordering countries.</p>";
        return;
    }

    const url = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn("no bordering countries found");
            return
        }
        const borderCountries = await response.json();

        borderCountries.forEach(border => {
            const flag = border.flags.svg;
            bordersContainer.innerHTML += `
                <section>
                    <h4>${border.name.common}</h4>
                    <img src="${flag}" alt="Flag of ${border.name.common}">
                </section>
            `;
        });
    } catch (error) {
        console.warn("Error fetching bordering countries:", error);
    }
}
document.querySelector("form").addEventListener("submit", fetchCountryData);
const countryDiv = document.querySelector(".countryInfo");
const formSubmit = document.querySelector(".formCountry");

formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const countryInput = document.querySelector(".inputText");
    const countryName = countryInput.value;
    countryInput.value = "";
    countryDiv.innerHTML = "";

    const responseCountry = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    ).then((res) => {
        if (!res.ok) {
            countryDiv.innerHTML =
                '<p class="errorText">Error, country not found</p>';
            throw new Error("Erreur pays introuvable");
        } else {
            return res.json();
        }
    });

    console.log(responseCountry);
    createElementCountry(responseCountry[0]);
});

function createElementCountry(country) {
    const img = document.createElement("img");
    img.src = country.flags.png;
    img.classList.add("countryFlag");

    const title = document.createElement("h2");
    title.innerText = country.name.common;
    title.classList.add("countryName");

    const capitalText = document.createElement("p");
    capitalText.innerHTML = `<span class="textSpan">Capital : </span> ${country.capital}`;
    capitalText.classList.add("countryCapital");

    const continentText = document.createElement("p");
    continentText.innerHTML = `<span class="textSpan">Continent : </span> ${country.continents}`;
    continentText.classList.add("countryContinent");

    const population = document.createElement("p");
    population.innerHTML = `<span class="textSpan">Population : </span> ${country.population}`;
    population.classList.add("countryPopulation");

    // Currencies
    const countryCurrency = [];
    for (const property in country.currencies) {
        countryCurrency.push(country.currencies[property]);
    }
    const currency = document.createElement("p");
    currency.innerHTML = `<span class="textSpan">Currency : </span> ${countryCurrency[0].name} - ${countryCurrency[0].symbol}`;
    currency.classList.add("countryCurrency");
    console.log(countryCurrency);

    // Languages
    const countryLanguages = [];
    for (const property in country.languages) {
        countryLanguages.push(country.languages[property]);
    }
    const language = document.createElement("p");
    language.innerHTML = `<span class="textSpan">Languages : </span> ${countryLanguages.join(", ")}`;
    language.classList.add("countryLanguages");

    countryDiv.appendChild(img);
    countryDiv.appendChild(title);
    countryDiv.appendChild(capitalText);
    countryDiv.appendChild(continentText);
    countryDiv.appendChild(population);
    countryDiv.appendChild(currency)
    countryDiv.appendChild(language);
}

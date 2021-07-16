const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name){
    return fetch( `${BASE_URL}/name/${name}?fields=name;population;flag;languages;capital`).then(response => response.json());
};

export default { fetchCountries };

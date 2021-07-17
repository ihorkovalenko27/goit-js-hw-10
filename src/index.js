import './css/styles.css';
import API from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
import cardTemplate from './templates/country-card.hbs'
import listTemplate from './templates/country-list.hbs'
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');
const inputSearch = document.getElementById('search-box');
const failureMessage = 'Oops, there is no country with that name';
const informMessage = 'Too many matches found. Please enter a more specific name.';

inputSearch.addEventListener('input', debounce(onFilterChange, DEBOUNCE_DELAY));

function onFilterChange(e){

 const textInput = e.target.value.trim();

  if(textInput === '') {
    updateDataList('');
    return;
  }

  API.fetchCountries(textInput).then(renderCountry);

}

function renderCountry(country){
    updateCountryList(country)
    updateDataCard('');
    if(country.length === 1){
        updateCountryCard(country);
    } else if(country.length > 10){
      showMessage(informMessage);
    } else if(country.status === 404){
      showMessage(failureMessage);
    } 

 }

function updateCountryList(data){
    const markUp = listTemplate(data);
    updateDataList(markUp);
}

function updateCountryCard(data){
    const markUp = cardTemplate(data);
    updateDataCard(markUp);
    updateDataList('');
}

function showMessage(message){
  if(message === failureMessage){
    Notiflix.Notify.failure(message);
    updateDataList('');
  } else if (message === informMessage){
    Notiflix.Notify.info(message);
  }
}

function updateDataList(markup){
  countryList.innerHTML = markup;
}

function updateDataCard(markup){
  countryCard.innerHTML = markup;
}

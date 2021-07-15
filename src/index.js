import './css/styles.css';
import API from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
import cardTmp from './templates/country-card.hbs'
import listTmp from './templates/country-list.hbs'
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');
const inputSearch = document.getElementById('search-box');

inputSearch.addEventListener('input', debounce(onFilterChange, DEBOUNCE_DELAY));

function onFilterChange(e){

 const textInput = e.target.value.trim();

  if(textInput === '') {
    clearDataList();
    return;
  }

  API.fetchCountries(textInput).then(renderCountry);

}

function renderCountry(country){
    updateCountryList(country)
    clearDataCard();
    if(country.length === 1){
        updateCountryCard(country);
    } else if(country.length > 10){
        infoMessage();
    } else if(country.status === 404){
        errorMessage();
    } 

 }

function updateCountryList(data){
    const markUp = listTmp(data);
    countryList.innerHTML = markUp;
}

function updateCountryCard(data){
    const markUp = cardTmp(data);
    countryCard.innerHTML = markUp;
    clearDataList()
}


function errorMessage(){
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clearDataList()
}

function infoMessage(){
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function clearDataList(){
  countryList.innerHTML = '';
}

function clearDataCard(){
  countryCard.innerHTML = '';
}
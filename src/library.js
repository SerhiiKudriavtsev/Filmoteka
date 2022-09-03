import * as basicLightBox from 'basiclightbox';

import modalGoIT from './js/modal-go-it';
import openModal from './js/modal';
import { paginat } from './js/pagination';
import templateFunction from './templates/card.hbs';
import noPicture from './images/nopicture.jpg';
import './js/top-button';
import {paginat} from './js/pagination';

let galleryRef = document.querySelector('.film_list');
const btnWatched = document.querySelector("#watched")
const btnQueue = document.querySelector("#queue")
const wraper = document.querySelector('.film_library_list');
const filterWatched = JSON.parse(localStorage.getItem('watchedFilmsArray'));
const filterQueue = JSON.parse(localStorage.getItem('queueFilmsArray'));
const dateRelise = new Date()

btnWatched.addEventListener('click', makeRenderFromWatched);
btnQueue.addEventListener('click', makeRenderFromQueue);
if ((filterWatched === null || filterWatched.length === 0) && (filterQueue === null || filterQueue.length === 0)) {
  wraper.innerHTML = `<img src="${noPicture}" alt="Frai speaking" />`;
} else if (filterWatched === null || filterWatched.length === 0) {
  makeRenderFromQueue()
} else {makeRenderFromWatched()}




// const backdrop = document.querySelector('.js-overlay-modal');

let currentPage = 1;

function markUpMovies(movies) {
  return movies.map(({id, poster_path, title, genres, release_date}) => {
    return `
    <li class="film_item list" data-action='${id}'>
    <a class="film-link link js-open-modal" data-modal="1">
    <img src=https://image.tmdb.org/t/p/w500${poster_path} alt="${title}" class="film_image" data-id="${id}"/>
    </a>
    <h1 class="film_title">${title}</h1>
    <p class="film_desc">${genres.map(genre => genre.name)} | ${dateRelise.getFullYear(release_date)}</p>
     </li>
     `;
    })
    .join('');
  }
  
  
  async function makeRenderFromWatched() {
    if (filterWatched !== null && filterWatched.length !== 0) {
      paginat.options.totalItems = filterWatched.length;
      paginat.options.totalPages = Math.ceil(paginat.options.totalItems / paginat.options.itemsPerPage);
      let i = 0;
      let j = i + paginat.options.itemsPerPage;
      wraper.innerHTML = ' ';
      const filterWatchedSlice = filterWatched.slice(i,j);
      wraper.insertAdjacentHTML('beforeend', markUpMovies(filterWatchedSlice));
      // galleryRef = document.querySelector('.film_list');
      paginat.pagMake(makeRenderFromWatchedOnLoadMore);
    galleryRef.addEventListener('click', openModal);
     btnWatched.classList.add('button__header-active')
     btnWatched.disabled = true;
     btnQueue.classList.remove('button__header-active')
     btnQueue.disabled = false;
    }
    else {
      
      wraper.innerHTML = `<img src="${noPicture}" alt="Frai speaking" />`;
      btnWatched.classList.add('button__header-active')
      btnWatched.disabled = true;
      btnQueue.classList.remove('button__header-active')
      btnQueue.disabled = false;
    }
    
}


async function makeRenderFromWatchedOnLoadMore() {
  if (filterWatched !== null && filterWatched.length !== 0) {
    currentPage = paginat.currentPage;
    let i = 0;
    if (currentPage === 1) {
      i = 0;
    } else {
      i = (currentPage -1) * paginat.options.itemsPerPage;
    }
    let j = i + paginat.options.itemsPerPage;
    wraper.innerHTML = ' ';
    const filterWatchedSlice = filterWatched.slice(i, j);
    wraper.insertAdjacentHTML('beforeend', markUpMovies(filterWatchedSlice));
    // galleryRef = document.querySelector('.film_list');
        galleryRef.addEventListener('click', openModal);
    btnWatched.classList.add('button__header-active');
    btnWatched.disabled = true;
    btnQueue.classList.remove('button__header-active');
    btnQueue.disabled = false;
  } else {
    wraper.innerHTML = `<img src="${noPicture}" alt="Frai speaking" />`;
    btnWatched.classList.add('button__header-active');
    btnWatched.disabled = true;
    btnQueue.classList.remove('button__header-active');
    btnQueue.disabled = false;
  }
}




function makeRenderFromQueue() {
  paginat.options.totalItems = filterWatched.length;
  paginat.options.totalPages = Math.ceil(
    paginat.options.totalItems / paginat.options.itemsPerPage
  );
  let i = 0;
  let j = i + paginat.options.itemsPerPage;
if (filterQueue !== null && filterQueue.length !== 0) {
  wraper.innerHTML = ' ';
  const filterQueueSlice = filterQueue.slice(i, j);
  wraper.insertAdjacentHTML('beforeend', markUpMovies(filterQueueSlice));
  // galleryRef = document.querySelector('.film_list')
  paginat.pagMake(makeRenderFromQueueOnLoadMore);
  galleryRef.addEventListener('click', openModal);
  btnQueue.classList.add('button__header-active')
  btnQueue.disabled = true;
  btnWatched.classList.remove('button__header-active')
  btnWatched.disabled = false;
  }
  else {
    wraper.innerHTML = `<img src="${noPicture}" alt="Frai speaking" />`;
    btnQueue.classList.add('button__header-active')
    btnQueue.disabled = true;
    btnWatched.classList.remove('button__header-active')
    btnWatched.disabled = false;
  }
}

async function makeRenderFromQueueOnLoadMore() {
  if (filterQueue !== null && filterQueue.length !== 0) {
    currentPage = paginat.currentPage;
    let i = 0;
    if (currentPage === 1) {
      i = 0;
    } else {
      i = (currentPage - 1) * paginat.options.itemsPerPage;
    }
    let j = i + paginat.options.itemsPerPage;
    wraper.innerHTML = ' ';
    const filterQueueSlice = filterQueue.slice(i, j);
    wraper.insertAdjacentHTML('beforeend', markUpMovies(filterQueueSlice));
    // galleryRef = document.querySelector('.film_list');
    galleryRef.addEventListener('click', openModal);
    btnWatched.classList.add('button__header-active');
    btnWatched.disabled = true;
    btnQueue.classList.remove('button__header-active');
    btnQueue.disabled = false;
  } else {
    wraper.innerHTML = `<img src="${noPicture}" alt="Frai speaking" />`;
    btnWatched.classList.add('button__header-active');
    btnWatched.disabled = true;
    btnQueue.classList.remove('button__header-active');
    btnQueue.disabled = false;
  }
}

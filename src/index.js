import formEl from './templates/form.hbs';
import galleryItems from './templates/gallery.hbs';
import './styles.css';
import PicApiService from './js/apiService';

const picApiService = new PicApiService();

document.body.insertAdjacentHTML('afterbegin', formEl());

const form = document.getElementById('search-form');
const loadButton = document.getElementById('load-btn');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', onSearch);
loadButton.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    picApiService.searchQuery = e.currentTarget.elements.query.value;
    picApiService.resetPage();
    picApiService.fetchPictures().then(createGalleriesPicMarkup);
}

function onLoadMore() {
    picApiService.fetchPictures().then(createGalleriesPicMarkup);
}

function createGalleriesPicMarkup(items) {
    gallery.insertAdjacentHTML('afterbegin', galleryItems(items));

}


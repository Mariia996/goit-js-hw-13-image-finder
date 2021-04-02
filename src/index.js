import galleryItems from './templates/gallery.hbs';
import './styles.css';
import PicApiService from './js/apiService';
import * as basicLightbox from 'basiclightbox';
import "basicLightbox/dist/basicLightbox.min.css";

const picApiService = new PicApiService();

const form = document.getElementById('search-form');
const loadButton = document.getElementById('load-btn');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', onSearch);


function onSearch(e) {
    e.preventDefault();
    gallery.innerHTML = '';

    picApiService.searchQuery = e.currentTarget.elements.query.value;
    picApiService.resetPage();
    picApiService.fetchPictures().then(createGalleriesPicMarkup);

    loadButton.classList.add('is-visible');

}

function onLoadMore() {
    picApiService.fetchPictures().then(result => {
        const lastVisiblePhoto = gallery.querySelector('.gallery-item:last-child');
        createGalleriesPicMarkup(result);
        if (lastVisiblePhoto) {
            const scrollValue = (lastVisiblePhoto.offsetTop + lastVisiblePhoto.clientHeight + 20);
            window.scrollTo({
            top: scrollValue,
            behavior: 'smooth'
        });
        }

    });

    picApiService.fetchPictures().then(data => {
        if (data.total > (picApiService.page * picApiService.perPage)) {
            loadButton.classList.remove('is-visible');
        }
    });
}

function createGalleriesPicMarkup(items) {
    gallery.insertAdjacentHTML('beforeend', galleryItems(items));

}

loadButton.addEventListener('click', onLoadMore);
gallery.addEventListener('click', onGalleryPictureClick);

function onGalleryPictureClick(e) {
    e.preventDefault();

    const galleryImgClass = e.target.classList.contains('gallery-image');

    if (!galleryImgClass) {
    return;
    }

    if (e.target.dataset.source) {
        const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">`);

    instance.show()
    }
}
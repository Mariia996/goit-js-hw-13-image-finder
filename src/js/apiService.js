const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '20959102-f72134d377a9abd463ec560fa';

export default class PicApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPictures() {
        return fetch(`${BASIC_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка. Попробуйте позже.');
                }
                return response.json();
            })
            .then(data => {
                this.page += 1;
                return data.hits;
            })
            .catch(error => console.log(error));
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
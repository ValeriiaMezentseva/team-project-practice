import refs from './ refs';
import axios from 'axios';
import { save, load } from './localeStorageHelper';

const KEY = '?api_key=a672ae57e08bb16567badfa77d9e520f';
const basePosterUrl = 'https://image.tmdb.org/t/p/';
const noPosterImg =
    'https://freedesignfile.com/upload/2014/07/Movie-time-design-elements-vector-backgrounds-01.jpg';
const fileSize = `w500`;
const GENRE_LIST_KEY = 'genreList';
let genreList = {};

function generatePosterImgLink(poster_path) {
    if (poster_path === null) {
        return noPosterImg;
    } else {
        return `${basePosterUrl}${fileSize}${poster_path}`;
    }

}
async function getGenreList() {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${KEY}&language=en-US`);
        data.genres.forEach(genre => (genreList[genre['id']] = genre['name']))

    } catch (error) {
        console.log(error.message);
    }
}

function generateGenreList(ids) {
    if (localStorage.key === GENRE_LIST_KEY) {
        return (genreList = load(GENRE_LIST_KEY));
    }
    let genreNames = ids.map(id => genreList[id])
    if (genreNames > 2) {
        return `${genreNames[0]}, ${genresName[1]}, Other `
    }
    return genreNames.join(', ')
}

async function setGenreListToLocalStorage() {
    if (localStorage.key === GENRE_LIST_KEY) {
        return;
    }
    await getGenreList();
    save(GENRE_LIST_KEY, genreList);
}

async function makeMovieCard(movieInfo) {
    await setGenreListToLocalStorage();
    return movieInfo
        .map(
            ({
                id,
                title,
                poster_path,
                genre_ids,
                release_date,
                vote_average,
            
            }) => `<li class="movie-card" data="${id}">
            <div class="movie-card__wrapper">
            <img src="${generatePosterImgLink(poster_path)}"
            alt="${title} movie poster"
            loading = "lazy"
            class="movie-card__img"/>
            </div>
            <div class="movie-card__text">
            <h2 class="movie-card__title">${title.toUpperCase()}</h2>
            <p class="movie-card__info">${generateGenreList(genre_ids)}
        `
    )
}

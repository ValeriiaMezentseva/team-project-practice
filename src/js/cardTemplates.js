import refs from './ refs';
import axios from 'axios';

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


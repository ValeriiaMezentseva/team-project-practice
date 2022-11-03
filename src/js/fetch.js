import axios from "axios";

export default class APIService {
  constructor() {
    this.key = '?api_key=a672ae57e08bb16567badfa77d9e520f';
    this.page = 1;
    this.searchQuery = "";
  }
  async getMovies() {
    try {
      const url = `https://api.themoviedb.org/3/trending/movie/day?${this.key}&page=${this.page}`;
      
      const response = await axios.get(url);
      return response.data;
    }
    catch (error) {
      console.log(error);
    }
    //   const API_KEY = 'a672ae57e08bb16567badfa77d9e520f';
    // const mainUrl = `https://api.themoviedb.org/3/search/movie`;
    // const filters = `?api_key=${API_KEY}&query=${inputQuery}&page=${currentPage}`;
    // const response = await fetch(`${mainUrl}${filters}`);
    //   return response.json();
  }
  async getMoviesByID(movieID) {
    try {
      const url = `https://api.themoviedb.org/3/trending/movie/${movieID}?${this.key}&language=en-US`;
      const response = await axios.get(url);
    }
    catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  setPage(newPage) {
    this.page = newPage;
  }
  incrementPage() {
    return this.page += 1;
  }
  decrementPage() {
    if (this.page === 1) {
      return 
    } else {
      return this.page -= 1;
    }
  }

  getQuery() {
    return this.searchQuery;
  }
  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }

  // let inputQuery = '';
  // searchForm.addEventListener('submit', onFormSubmit);


  // function onFormSubmit(event) {
  //     event.preventDefault();
  //   inputQuery = searchInput.value;
  // } 
  // }

}
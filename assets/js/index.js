import { apiKey } from './apiKey.js';
// function trailer(movieName) {
//   const formattedMovieName = movieName.replace(/\s+/g, '-')
//   return `https://megafilmeshd50.org/filme/${formattedMovieName}/`
// }
function createMovie(movies) {
  let { id, poster_path, title, vote_average, release_date, overview } = movies
  const isFavorited = checkMovieIsFavorited(id)
  // const trailerMovie = trailer(title)
  // const linkTrailer = document.createElement("a")
  // linkTrailer.classList.add("favorite-wrapper__text");
  // linkTrailer.setAttribute("href", trailerMovie)
  // linkTrailer.setAttribute("target", "_blank")
  // linkTrailer.innerText = "assista ao trailer"

  const articleCard = document.createElement("article");
  articleCard.classList.add("container-cards-films__card");

  const divWrapperImg = document.createElement("div");
  divWrapperImg.classList.add("card__wrapper-img");

  const imgMovieCover = document.createElement("img");
  imgMovieCover.classList.add("card__img-film");
  imgMovieCover.setAttribute("src", `https://image.tmdb.org/t/p/w500/${poster_path}`);
  imgMovieCover.setAttribute("alt", "capa filme");

  const divInfoFilm = document.createElement("div");
  divInfoFilm.classList.add("card__info-film");

  const h2TitleFilm = document.createElement("h2");
  h2TitleFilm.classList.add("card__title-film");
  h2TitleFilm.innerText = `${title} (${release_date.slice(0, 4)})`;

  const divWrapperRateFilm = document.createElement("div");
  divWrapperRateFilm.classList.add("card__info-film__favorite-wrapper");

  const pTextStar = document.createElement("p");
  pTextStar.classList.add("favorite-wrapper__text", "favorite-wrapper__star");
  pTextStar.innerText = vote_average.toFixed(1);

  const favoriteContainer = document.createElement("div")
  favoriteContainer.classList.add("wrapper__favorite-container")
  const pTextHeart = document.createElement("p");
  pTextHeart.classList.add("favorite-wrapper__text");
  pTextHeart.innerText = "Favoritar";

  const favoriteImg = document.createElement("img")
  favoriteImg.src = isFavorited ? '/assets/imgs/Heart-fill-red.svg' : '/assets/imgs/Heart.svg'
  favoriteImg.alt = 'Heart'
  favoriteImg.addEventListener("click", (e) => favoriteButtonPressed(e, movies))
  favoriteContainer.append(favoriteImg, pTextHeart)

  const pDescription = document.createElement("p");
  pDescription.classList.add("card__text-description");
  pDescription.innerText = overview;

  containerCards.append(articleCard);
  articleCard.append(divWrapperImg, divInfoFilm, pDescription);
  divWrapperImg.appendChild(imgMovieCover);
  divInfoFilm.append(h2TitleFilm, divWrapperRateFilm);
  divWrapperRateFilm.append(pTextStar, favoriteContainer);
}

function favoriteButtonPressed(event, movie) {
  const favoriteState = {
    favorited: '/assets/imgs/Heart-fill-red.svg',
    notFavorited: '/assets/imgs/Heart.svg'
  }
  if (event.target.src.includes(favoriteState.notFavorited)) {
    event.target.src = favoriteState.favorited
    saveToLocalStorage(movie)
  } else {
    event.target.src = favoriteState.notFavorited
    removeFromLocalStorage(movie.id)
  }
}

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function saveToLocalStorage(movie) {
  const movies = getFavoriteMovies() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem('favoriteMovies', moviesJSON)
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id)
}

function removeFromLocalStorage(id) {
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))
}




async function getPuplarMovies() {
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  try {
    const responde = await fetch(`${apiUrl}?api_key=${apiKey}`);
    const data = await responde.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function searchMovie(query) {
  const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  try {
    const responde = await fetch(urlSearch)
    const data = await responde.json()
    return data.results
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const movies = await getPuplarMovies()
  const search = await searchMovie(input.value.toLowerCase());
  if (input.value === "") {
    containerCards.innerHTML = ""
    movies.forEach(movie => createMovie(movie));
    // favoritar()
  } else if (input.value.length > 0 && search.length > 0) {
    containerCards.innerHTML = ""
    search.forEach(movie => createMovie(movie))
  } else {
    alert("Filme nao encontrado, digite um filme valido")
    input.value = ""
  }
}



const containerCards = document.querySelector(".container-wrapper__container-cards-films");
const input = document.querySelector("#film-name");
input.addEventListener('input', main)

const checkbox = document.querySelector('#favorite-filme')
checkbox.addEventListener("click", () => {
  const favoriteMovies = getFavoriteMovies()
  if (checkbox.checked && favoriteMovies.length > 0) {
    containerCards.innerHTML = ""
    favoriteMovies.forEach(movie => createMovie(movie))
  } else if (checkbox.checked && favoriteMovies.length == 0) {
    alert('lista de favoritos vazia')
  } else {
    main()
  }
})


main()
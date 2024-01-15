import { apiKey } from './apiKey.js';

function createMovie(movies) {
  let { poster_path, title, vote_average, release_date, overview } = movies
  const isFavorited = false
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

  const pTextHeart = document.createElement("p");
  pTextHeart.classList.add("favorite-wrapper__text");
  isFavorited ? pTextHeart.classList.add("favorite-wrapper__heart-fill") : pTextHeart.classList.add("favorite-wrapper__heart");
  pTextHeart.innerText = "Favoritar";

  const pDescription = document.createElement("p");
  pDescription.classList.add("card__text-description");
  pDescription.innerText = overview;

  containerCards.append(articleCard);
  articleCard.append(divWrapperImg, divInfoFilm, pDescription);
  divWrapperImg.appendChild(imgMovieCover);
  divInfoFilm.append(h2TitleFilm, divWrapperRateFilm);
  divWrapperRateFilm.append(pTextStar, pTextHeart);
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
  const movies = await getPuplarMovies();
  const search = await searchMovie(input.value);
  if (input.value === "") {
    containerCards.innerHTML = ""
    movies.forEach(movie => createMovie(movie));
  } else if (input.value.length > 0 && search.length > 0) {
    containerCards.innerHTML = ""
    search.forEach(movie => createMovie(movie))
    input.value = ""
  } else {
    alert("Filme nao encontrado, digite um filme valido")
    input.value = ""
  }
}

const containerCards = document.querySelector(".container-wrapper__container-cards-films");
const input = document.querySelector("#film-name");
input.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    main()
  }
})

const iconSearch = document.querySelector("#search")
iconSearch.addEventListener("click", main)

main()
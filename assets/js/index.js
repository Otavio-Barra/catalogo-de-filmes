function criarFilme(movies){
  let {image,title,rating,year,description,isFavorited} = movies
const articleCard = document.createElement("article");
articleCard.classList.add("container-cards-films__card");

const divWrapperImg = document.createElement("div");
divWrapperImg.classList.add("card__wrapper-img");

const imgMovieCover = document.createElement("img");
imgMovieCover.classList.add("card__img-film");
imgMovieCover.setAttribute("src",image);
imgMovieCover.setAttribute("alt","capa filme");

const divInfoFilm = document.createElement("div");
divInfoFilm.classList.add("card__info-film");

const h2TitleFilm = document.createElement("h2");
h2TitleFilm.classList.add("card__title-film");
h2TitleFilm.innerText = `${title} (${year})`;

const divWrapperRateFilm = document.createElement("div");
divWrapperRateFilm.classList.add("card__info-film__favorite-wrapper");

const pTextStar = document.createElement("p");
pTextStar.classList.add("favorite-wrapper__text", "favorite-wrapper__star");
pTextStar.innerText = rating;

const pTextHeart = document.createElement("p");
pTextHeart.classList.add("favorite-wrapper__text");
isFavorited ? pTextHeart.classList.add("favorite-wrapper__heart-fill"): pTextHeart.classList.add( "favorite-wrapper__heart");
pTextHeart.innerText = "Favoritar";

const pDescription = document.createElement("p");
 pDescription.classList.add("card__text-description");
pDescription.innerText = description;

containerCards.append(articleCard);
articleCard.append(divWrapperImg,divInfoFilm,pDescription);
divWrapperImg.appendChild(imgMovieCover);
divInfoFilm.append(h2TitleFilm,divWrapperRateFilm);
divWrapperRateFilm.append(pTextStar,pTextHeart);
}

const containerCards = document.querySelector(".container-wrapper__container-cards-films");

const movies = [
  {
    image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 9.2,
    year: 2022,
    description: "Descrição do filme…",
    isFavorited: true,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    title: 'Avengers',
    rating: 9.2,
    year: 2019,
    description: "Descrição do filme…",
    isFavorited: false
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doctor Strange',
    rating: 9.2,
    year: 2022,
    description: "Descrição do filme…",
    isFavorited: false
  },
]
movies.forEach(movie=>criarFilme(movie))
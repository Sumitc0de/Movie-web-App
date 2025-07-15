const apikey = `efcb3efafc28e4854c312b121539667a`;
const loadingScreen = document.getElementById('loadingScreen');
const movieTitles = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "The Lord of the Rings: The Return of the King",
    "Forrest Gump",
    "Inception",
    "Fight Club",
    "The Matrix",
    "The Empire Strikes Back",
    "Interstellar",
    "Gladiator",
    "The Green Mile",
    "The Lion King",
    "The Silence of the Lambs",
    "Saving Private Ryan",
    "Avengers: Endgame",
    "Schindler's List",
    "The Prestige",
    "Whiplash",
    "The Departed",
    "Django Unchained",
    "Parasite",
    "Titanic",
    "Joker",
    "The Wolf of Wall Street",
    "The Social Network",
    "La La Land",
    "Spider-Man: No Way Home",
    "Avengers: Infinity War",
    "The Batman",
    "The Revenant",
    "The Irishman",
    "Tenet",
    "Black Panther",
    "Doctor Strange in the Multiverse of Madness",
    "Guardians of the Galaxy",
    "No Country for Old Men",
    "Everything Everywhere All At Once",
    "Oppenheimer"
];



const moviesList = {
    action: [],
    adventure: [],
    comedy: [],
    romance: [],
    horror: [],
    thriller: [],
    mystery: [],
    fantasy: [],
    sciFi: [],
    crime: [],
};

const genreKeyMap = {
    Action: "action",
    Adventure: "adventure",
    Comedy: "comedy",
    Romance: "romance",
    Horror: "horror",
    Thriller: "thriller",
    Mystery: "mystery",
    Fantasy: "fantasy",
    "Science Fiction": "sciFi",
    Crime: "crime",
};

const genreDisplayNames = {
    action: "Action",
    adventure: "Adventure",
    comedy: "Comedy",
    romance: "Romance",
    horror: "Horror",
    thriller: "Thriller",
    mystery: "Mystery",
    fantasy: "Fantasy",
    sciFi: "Science Fiction",
    crime: "Crime",
};

const loadMoviesData = async () => {
    console.log("All movies from the list:");

    for (const query of movieTitles) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        const imageBase = "https://image.tmdb.org/t/p/w1280";
        if (data.results && data.results.length > 0) {
            const movie = data.results[0];
            const poster = movie.backdrop_path ? imageBase + movie.backdrop_path : null;
            const title = movie.title;

            // Fetch genre names
            const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
            const res = await fetch(genreUrl);
            const genreData = await res.json();

            if (movie.genre_ids && movie.genre_ids.length > 0) {
                for (const genreId of movie.genre_ids) {
                    const genreObj = genreData.genres.find(g => g.id === genreId);
                    if (genreObj) {
                        const key = genreKeyMap[genreObj.name];
                        if (key && moviesList.hasOwnProperty(key)) {
                            moviesList[key] = [
                                ...moviesList[key],
                                { title, poster, id: movie.id }
                            ];
                        }
                    }
                }
            }
        }
    }
    console.log(moviesList);
};




const createGenreSwiper = (genreKey, movies) => {
    const container = document.createElement("div");
    container.className = "mb-25";

    // Genre Title
    const title = document.createElement("p");
    title.className = "py-5 text-2xl ";
    title.textContent = `${genreDisplayNames[genreKey] || genreKey} Movies`;
    container.appendChild(title);

    // Swiper Container
    const swiperId = `swiper-${genreKey}`;
    const nextBtnId = `swiper-next-${genreKey}`;
    const prevBtnId = `swiper-prev-${genreKey}`;
    const swiperDiv = document.createElement("div");
    swiperDiv.className = `swiper ${swiperId}`;
    swiperDiv.innerHTML = `
        <div class="swiper-wrapper"></div>
        <button class="swiper-button-next ${nextBtnId}" id="${nextBtnId}">
          
        </button>
        <button class="swiper-button-prev ${prevBtnId}" id="${prevBtnId}">
            
        </button>
    `;
    container.appendChild(swiperDiv);

    // Add slides
    const wrapper = swiperDiv.querySelector(".swiper-wrapper");
    movies.forEach(movie => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide flex flex-col items-center justify-center pb-4 cursor-pointer";
        slide.innerHTML = `
            <div><img src="${movie.poster}" alt="${movie.title}"></div>
            <h1 class="font-semibold">${movie.title}</h1>
        `;

        slide.addEventListener("click", (e) => {
            window.location.href = `./movie.html?id=${movie.id}`;
            console.log(movie.id);
        });
        wrapper.appendChild(slide);
    });

    // Append to main movies container
    document.getElementById("movies").appendChild(container);

    // Initialize Swiper with navigation
    setTimeout(() => {
        new Swiper(`.${swiperId}`, {
            slidesPerView: 3,
            spaceBetween: 15,
            navigation: {
                nextEl: `#${nextBtnId}`,
                prevEl: `#${prevBtnId}`,
            },
            pagination: false,
        });
    }, 0);
};

loadMoviesData().then(() => {
    document.getElementById("movies").innerHTML = ""; // Clear previous content
    Object.keys(moviesList).forEach(genreKey => {
        if (moviesList[genreKey].length > 0) {
            createGenreSwiper(genreKey, moviesList[genreKey]);
        }
    });
    loadingScreen.style.display = "none";
});




// const movieCard = (genre) => {
//     const genreMovies = moviesList[genre];
//     console.log(genreMovies);

//     for (let i = 0; i < genreMovies.length; i++) {
//         const movie = genreMovies[i];
//         const div = document.createElement("div");
//         div.className = "swiper-slide flex flex-col items-center justify-center pb-4";
//         div.innerHTML = `
//            <div><img src="${movie.poster}" alt="${movie.title}"></div>
//            <h1 class="font-semibold">${movie.title}</h1>
      
//     `;
//         const wrapper = document.querySelector(".swiper-wrapper");
//         if (wrapper) {
//             wrapper.appendChild(div);
//         }

//         if (window.swiper) {
//         window.swiper.update();
//     }
//     }


// }

// // Call loadMoviesData and then movieCard after data is loaded
// loadMoviesData().then(() => {
//     movieCard("action");
// });






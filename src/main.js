

const apikey = `efcb3efafc28e4854c312b121539667a`;
const loadingScreen = document.getElementById('loadingScreen');
const searchIcon = document.getElementById('search_icon');
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


const movieCardBackground = document.getElementById('home_page');

const createMovieCardSlides = (movie) => {
    const div = document.createElement('div');
    div.className = 'swiper-slide';
    div.innerHTML = ` <img src="${movie.Poster}" alt="Movie 2">`;
    const swiperWrapper = document.getElementsByClassName("swiper-wrapper")[0];
    if (swiperWrapper) {
        swiperWrapper.appendChild(div);
    }
    div.addEventListener('click', () => {
        MovieCardClick(movie);
       
        movieCardBackground.style.backgroundImage = `url(${movie.Background})`;
        movieCardBackground.style.backgroundSize = 'cover';
        movieCardBackground.style.backgroundPosition = 'center';
        movieCardBackground.style.backgroundRepeat = 'no-repeat';
        movieCardBackground.style.transition = 'background-image 0.5s ease-in-out';
    });
};

const MovieCardClick = (movie) => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1 class="text-6xl font-bold">${movie.title}</h1>
                <div id="rating_box" class="inline-flex items-center justify-between gap-4 mt-4">
                    <h4 class="flex items-center justify-center gap-2">
                    <p class="bg-yellow-400 px-3 py-0.5 rounded-sm text-black font-semibold text-sm">IMDb</p>
                    <p class="text-[#b9adadde]">${movie.vote_average.toFixed(1)}</p>

                    </h4>

                    <span>&bull;</span>
                    <p class="text-[#b9adadde]">
                        <span>${movie.release_date.slice(0, 4)}</span>
                        |
                        <span>${movie.Runtime ? movie.Runtime + ' min' : '-'}</span>
                        |
                        <span>${movie.Genre}</span>
                    </p>
                </div>

                <div id="movie_description" class="my-3">
                    ${movie.overview}
                </div>

                <div id="watch_btn_container" class="mt-10 flex gap-4">
                    <button id="watch_btn" class="bg-amber-400 hover:scale-105 transition-transform duration-200 text-black font-semibold px-4 py-2 rounded-md"><ion-icon name="play"></ion-icon><span>Watch Now</span></button>
                    <button id="trailer_btn" class="px-4 py-2 rounded-md border-[1px] border-[#cfc1c1c8] hover:scale-105 transition-transform duration-200">Watch Trailer</button>
                </div>`;

}




function initializeSearchFeature() {
    let isSearchBarVisible = false;

    const searchBar = () => {
        if (isSearchBarVisible) return; // Prevent duplicate bars
        isSearchBarVisible = true;

        const searchDiv = document.createElement('div');
        searchDiv.id = 'search_div';
        searchDiv.className = ' absolute right-[8vw] top-[5vw] overflow-hidden w-[20vw] h-fit bg-white rounded-sm transition-all duration-300 ease-in-out';
        searchDiv.innerHTML = `
            <input 
                type="text" 
                id="search_input" 
                placeholder="Search for movies..." 
                class="h-9 px-4 bg-white w-full text-black placeholder-gray-500 focus:outline-none focus:ring-[1px] focus:ring-gray-500 transition"
            >`;

        document.getElementById('main').appendChild(searchDiv);

        const searchInput = document.getElementById('search_input');
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === "Enter" && searchInput.value.trim() !== "") {
                const searchIn = searchInput.value;
                console.log(searchInput.value);
                // Clear previous results if any
                const existingResults = document.getElementById('search_results');
                if (existingResults) existingResults.remove();

                const resultsDiv = document.createElement('div');
                resultsDiv.id = 'search_results';
                resultsDiv.className = 'bg-white mt-2 rounded shadow max-h-60 overflow-y-auto';

                // Fetch movies from TMDB API
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(searchIn)}&language=en-US&page=1&include_adult=false`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.results && data.results.length > 0) {
                            const ul = document.createElement('ul');
                            data.results.forEach(movie => {
                                const li = document.createElement('li');
                                li.className = "px-4 py-2 hover:bg-amber-400 text-black transition rounded cursor-pointer";
                                li.innerHTML = `<a href="./movie.html?id=${movie.id}" class="block w-full h-full">${movie.title}</a>`;
                                ul.appendChild(li);
                            });
                            resultsDiv.appendChild(ul);
                        } else {
                            resultsDiv.innerHTML = '<div class="px-4 py-2 text-gray-500">No movies found.</div>';
                        }
                        searchDiv.appendChild(resultsDiv);
                    })
                    .catch(() => {
                        resultsDiv.innerHTML = '<div class="px-4 py-2 text-red-500">Error fetching results.</div>';
                        searchDiv.appendChild(resultsDiv);
                    });    itemDiv.className = ' rounded-lg h-fit overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300';
                itemDiv.innerHTML = `
                     <ul>
                        <li class="px-4 py-2 hover:bg-amber-400 hover:text-black transition rounded cursor-pointer">
                            <a href="" class="block w-full h-full">Iron Man 3</a>
                        </li>
                        
                    </ul>`;

                if (searchDiv) {
                    searchDiv.appendChild(itemDiv);

                } else {
                    console.error("Missing #search_results element in DOM.");
                }
            }
        });
    };

    const searchIcon = document.getElementById('search_icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const existingSearchDiv = document.querySelector('#search_div');
            if (existingSearchDiv) {
                existingSearchDiv.remove();
                isSearchBarVisible = false;
            } else {
                searchBar();
            }
        });
    } else {
        console.error("Missing #search_icon element in DOM.");
    }
}

initializeSearchFeature();

const homeMovieCard = (movie) => {
    MovieCardClick(movie);
    movieCardBackground.style.backgroundImage = `url(${movie.Background})`;
    movieCardBackground.style.backgroundSize = 'cover';
    movieCardBackground.style.backgroundPosition = 'center';
    movieCardBackground.style.backgroundRepeat = 'no-repeat';
}


const gotoMoviePage = (movieId)=>{
window.location.href = `./movie.html?id=${movieId}`;
}

const trendingMovies = async () => {
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikey}`;
    const response = await fetch(trendingUrl);
    const data = await response.json();
    data.results.forEach((movie) => {
        const trendingDiv = document.createElement('div');
        trendingDiv.className = '"bg-gray-800 rounded-lg h-[15vw] overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300';
        trendingDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;
        trendingDiv.style.backgroundSize = 'cover';
        trendingDiv.style.backgroundPosition = 'center';
        trendingDiv.style.backgroundRepeat = 'no-repeat';
        document.getElementById('trending').appendChild(trendingDiv);

        trendingDiv.addEventListener('click', () => {
          gotoMoviePage(movie.id);
        });
    }
    );
}


const searchMovie = async () => {

    for (const title of movieTitles) {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(title)}&language=en-US&page=1&include_adult=false`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const movie = data.results[0];
            // Fetch additional details
            const trendingDiv = document.createElement('div');
            trendingDiv.className = '"bg-gray-800 rounded-lg h-[15vw] overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300';
            trendingDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;
            trendingDiv.style.backgroundSize = 'cover';
            trendingDiv.style.backgroundPosition = 'center';
            trendingDiv.style.backgroundRepeat = 'no-repeat';
            document.getElementById('more_cards').appendChild(trendingDiv);

            
        trendingDiv.addEventListener('click', () => {
          gotoMoviePage(movie.id);
        });

        }
    }

}


const getGenreName = async (genreId) => {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();
    const genreObj = genreData.genres.find(genre => genre.id === genreId);
    return genreObj ? genreObj.name : '-';
}

const getMovieRuntime = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return data.runtime;
}

const getMovieDets = async () => {
    const imageBase = "https://image.tmdb.org/t/p/w1280";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || !Array.isArray(data.results)) {
            throw new Error('Invalid data structure from API.');
        }

        for (const movie of data.results) {
            try {
                if (movie.backdrop_path && movie.poster_path) {
                    const posterIMageUrl = imageBase + movie.poster_path;
                    const fullImageUrl = imageBase + movie.backdrop_path;

                    movie.Poster = posterIMageUrl;
                    movie.Background = fullImageUrl;

                    movie.Genre = movie.genre_ids && movie.genre_ids.length > 0
                        ? await getGenreName(movie.genre_ids[0])
                        : '-';

                    movie.Runtime = await getMovieRuntime(movie.id);

                    createMovieCardSlides(movie);

                    if (data.results.indexOf(movie) === 3) {
                        homeMovieCard(movie);
                    }

                }
            } catch (movieError) {
                console.error("Error processing individual movie:", movie.title, movieError);
            }
        }

        // Call trending and searchMovie functions
        try {
            await trendingMovies();
            await searchMovie();
        } catch (innerError) {
            console.error("Error in trending or searchMovie:", innerError);
        }

    } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        document.getElementById('content').innerHTML = `
            <p class="text-red-500 text-xl font-semibold">Failed to load movies. Please try again later.</p>`;
    } finally {
        if (loadingScreen) loadingScreen.style.display = "none"; // Hide loading screen
    }


};




getMovieDets();
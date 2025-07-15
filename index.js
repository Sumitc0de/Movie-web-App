// ✅ Full Refactored JavaScript Code With Structured Movie Objects

const apikey = `efcb3efafc28e4854c312b121539667a`;
const loadingScreen = document.getElementById('loadingScreen');
const searchIcon = document.getElementById('search_icon');
const movieCardBackground = document.getElementById('home_page');
const allMovies = []; // Global movie list

const getGenreName = async (genreId) => {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();
    const genreObj = genreData.genres.find(genre => genre.id === genreId);
    return genreObj ? genreObj.name : '-';
};

const getMovieRuntime = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return data.runtime;
};

const MovieCardClick = (movie) => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1 class="text-6xl font-bold">${movie.title}</h1>
        <div id="rating_box" class="inline-flex items-center justify-between gap-4 mt-4">
            <h4 class="flex items-center gap-2">
                <p class="bg-yellow-400 px-3 py-0.5 rounded-sm text-black font-semibold text-sm">IMDb</p>
                <p class="text-[#b9adadde]">${movie.vote_average.toFixed(1)}</p>
            </h4>
            <span>&bull;</span>
            <p class="text-[#b9adadde]">
                <span>${movie.release_date?.slice(0, 4)}</span> |
                <span>${movie.runtime ? movie.runtime + ' min' : '-'}</span> |
                <span>${movie.genre}</span>
            </p>
        </div>
        <div id="movie_description" class="my-3">
            ${movie.overview}
        </div>
        <div id="watch_btn_container" class="mt-10 flex gap-4">
            <button id="watch_btn" class="bg-amber-400 hover:scale-105 transition-transform duration-200 text-black font-semibold px-4 py-2 rounded-md">
                <ion-icon name="play"></ion-icon><span>Watch Now</span>
            </button>
            <button id="trailer_btn" class="px-4 py-2 rounded-md border-[1px] border-[#cfc1c1c8] hover:scale-105 transition-transform duration-200">
                Watch Trailer
            </button>
        </div>`;
};

const createMovieCardSlides = (movie) => {
    const div = document.createElement('div');
    div.className = 'swiper-slide';
    div.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper?.appendChild(div);

    div.addEventListener('click', () => {
        MovieCardClick(movie);
        movieCardBackground.style.backgroundImage = `url(${movie.background})`;
        movieCardBackground.style.backgroundSize = 'cover';
        movieCardBackground.style.backgroundPosition = 'center';
        movieCardBackground.style.backgroundRepeat = 'no-repeat';
        movieCardBackground.style.transition = 'background-image 0.5s ease-in-out';
    });
};

const homeMovieCard = (movie) => {
    MovieCardClick(movie);
    movieCardBackground.style.backgroundImage = `url(${movie.background})`;
    movieCardBackground.style.backgroundSize = 'cover';
    movieCardBackground.style.backgroundPosition = 'center';
    movieCardBackground.style.backgroundRepeat = 'no-repeat';
};

const trendingMovies = async () => {
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikey}`;
    const response = await fetch(trendingUrl);
    const data = await response.json();
    data.results.forEach((movie) => {
        const trendingDiv = document.createElement('div');
        trendingDiv.className = 'bg-gray-800 rounded-lg h-[15vw] overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300';
        trendingDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;
        trendingDiv.style.backgroundSize = 'cover';
        trendingDiv.style.backgroundPosition = 'center';
        trendingDiv.style.backgroundRepeat = 'no-repeat';
        trendingDiv.addEventListener('click', () => window.location.href = `./movie.html?id=${movie.id}`);
        document.getElementById('trending').appendChild(trendingDiv);
    });
};

const getMovieDets = async () => {
    const imageBase = "https://image.tmdb.org/t/p/w1280";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        for (const movie of data.results) {
            if (!movie.backdrop_path || !movie.poster_path) continue;

            const structuredMovie = {
                id: movie.id,
                title: movie.title,
                poster: imageBase + movie.poster_path,
                background: imageBase + movie.backdrop_path,
                overview: movie.overview,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                runtime: await getMovieRuntime(movie.id),
                genre: movie.genre_ids?.length > 0 ? await getGenreName(movie.genre_ids[0]) : '-'
            };

            allMovies.push(structuredMovie);
            createMovieCardSlides(structuredMovie);
            if (allMovies.length === 4) homeMovieCard(structuredMovie);
        }

        await trendingMovies();
    } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        document.getElementById('content').innerHTML = `<p class="text-red-500 text-xl font-semibold">Failed to load movies. Please try again later.</p>`;
    } finally {
        if (loadingScreen) loadingScreen.style.display = "none";
    }
};

// Initialize everything
getMovieDets();

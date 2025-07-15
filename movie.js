const apikey = `efcb3efafc28e4854c312b121539667a`;


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=en-US`;
const movieProviderUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apikey}`;


const crewDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();
    // Find the director from the crew array

    console.log(data)
    const director = data.crew.find(member => member.department === "Directing" && member.job === "Director");
    if (director) {
        document.getElementById("director").innerText = director.name;
    } else {
        document.getElementById("director").innerText = "Director not found";
        console.log("Director not found");
    }

    // Find writers (job can be 'Writer', 'Screenplay', etc.)
    const writers = data.crew.filter(member => 
        member.job === "Writer" || member.job === "Screenplay" || member.job === "Story"
    );
    if (writers.length > 0) {
        document.getElementById("writers").innerText = writers.map(w => w.name).join(', ');
    } else {
        document.getElementById("writers").innerText = "Writers not found";
    }

    document.getElementById("cast").innerText = data.cast
        .slice(0, 5)
        .map(member => member.name)
        .join(', ');
}

const loadMovieDets = async () => {
    try {
        const response = await fetch(movieUrl);
        const data = await response.json();

        const providerResponse = await fetch(movieProviderUrl);
        const providerData = await providerResponse.json();
        // Display movie provider link and images if available

        // Match the provider result with 'IN' and console log data on 'IN'
        if (providerData.results && providerData.results.IN) {
            // console.log(providerData.results.IN);
            const ProviderLogo = providerData.results.IN.flatrate[0].logo_path
            // console.log(ProviderLogo)
            const providerName = providerData.results.IN.flatrate[0].provider_name
            // console.log(providerName)

            document.getElementById("provider_logo").src = `https://image.tmdb.org/t/p/w1280${ProviderLogo}`;
            document.getElementById("provider_name").innerText = `Streaming on ${providerName}`;
        } else {
            console.log('No provider data for IN');
        }



        // console.log(data)
        const Poster = document.getElementById("poster");
        Poster.src = `https://image.tmdb.org/t/p/w1280${data.poster_path}`;

        document.getElementById('year').innerText = data.release_date.split('-')[0];
        document.getElementById('genre').innerText = data.genres.map(genre => genre.name).join(', ');
        document.getElementById('movie_title').innerText = data.title;
        document.getElementById('description').innerText = data.overview;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

const movieTrailer = async (movieId) => {
    const trailerURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}&language=en-US`;
    const response = await fetch(trailerURL);
    const data = await response.json();
    // console.log(data);

    if (data.results && data.results.length > 0) {
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
            document.getElementById("trailer_container").innerHTML = `<iframe class="w-full h-full" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            console.error('No suitable trailer found.');
        }
    }
}

movieTrailer(movieId);
crewDetails(movieId)
loadMovieDets();

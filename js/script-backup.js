// ----------------------------------------------------------------------------------------
// >>>>> GLOBALS
// ----------------------------------------------------------------------------------------
const global = {
    currentPage: window.location.pathname
}


// ----------------------------------------------------------------------------------------
// >>>>> FETCH DATA FROM SPECIFIC ENDPOINT (TMDB API)
// ----------------------------------------------------------------------------------------
async function fetchAPIData (endpoint) {
    const API_KEY = '1b2278a2450196115b4b7190d5dcc01e';
    const API_URL = 'https://api.themoviedb.org/3';

    showSpinner();

    const response = await fetch (`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`) 
    const data = await response.json();

    hideSpinner();

    console.log(data)
    return data;
}


// ----------------------------------------------------------------------------------------
// >>>>> DISPLAY AFTER FETCHING ALL THE DATA FROM A SPECIFIC ENDPOINT
// ----------------------------------------------------------------------------------------
// 20 most Popular Tv Shows
// ----------------------------------------------------------------------------------------
async function displayPopularMovies() {
    const {results} = await fetchAPIData('/movie/popular'); // de-structure '{Object}' converts it to an array.

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');

        const baseURLforPostersAndImages = `https:image.tmdb.org/t/p`
        const widthOfThePOster = `/w500`

        div.innerHTML = 
        `
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path 
                ? `<img src="${baseURLforPostersAndImages}${widthOfThePOster}${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>` 
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text"><small class="text-muted">Release: ${movie.release_date}</small></p>
        </div>
        `
    document.querySelector('#popular-movies').appendChild(div);
    })
}

// ----------------------------------------------------------------------------------------
// 20 most Popular Tv Shows
// ----------------------------------------------------------------------------------------
async function displayPopularTVShows() {
    const {results} = await fetchAPIData('/tv/popular'); // de-structure '{Object}' converts it to an array.

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');

        const baseURLforPostersAndImages = `https:image.tmdb.org/t/p`
        const widthOfThePOster = `/w500`

        div.innerHTML = 
        `
        <a href="tv-details.html?id=${show.id}">
            ${show.poster_path 
                ? `<img src="${baseURLforPostersAndImages}${widthOfThePOster}${show.poster_path}" class="card-img-top" alt="${show.name}"/>` 
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}"/>`}
        </.name
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text"><small class="text-muted">Air Date: ${show.first_air_date}</small></p>
        </div>
        `
    document.querySelector('#popular-shows').appendChild(div);
    })
}


// ----------------------------------------------------------------------------------------
// Display Movie Details
// ----------------------------------------------------------------------------------------
async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];
    console.log(movieID);
    
    const movie = await fetchAPIData(`/movie/${movieID}`); // de-structure '{Object}' converts it to an array.

    const contentType = 'movie';

    // Overlay for backgroud Image
    displayBackgroundImage(contentType, movie.backdrop_path);
    
    let div = null;

    if (contentType === 'movie') {

        div = document.createElement('div');
    
        const baseURLforPostersAndImages = `https://image.tmdb.org/t/p`
        const widthOfThePoster = `/w500`
    
        div.innerHTML = 
        `
        <div class="details-top">
            <div>
                ${movie.poster_path 
                    ? `<img src="${baseURLforPostersAndImages}${widthOfThePoster}${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>` 
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`}
            </div>
            <div>
                <h2>${movie.title}</h2>
                <p><i class="fas fa-star text-primary">${movie.vote_average.toFixed(1)}</i>/ 10</p>
                <p class="text-muted">Release Date: ${movie.release_date}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres.map((genre) => { return `<li>${genre.name}</li>`}).join('')}
                </ul>
                <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${addComasToNumber(movie.budget)}</li>
                <li><span class="text-secondary">Revenue:</span> $${addComasToNumber(movie.revenue)}</li>
                <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
                <li><span class="text-secondary">Status:</span> ${movie.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${movie.production_companies.map((company) => {return `<span>${company.name}<\span>`}).join(', ')}
            </div>
        </div>
        `
       document.querySelector('#movie-details').appendChild(div);

    } else {
        div = document.createElement('div');
        div.classList.add('background-image-container');

        const h1 = document.createElement('h1');
        h1.innerText = `Background image only available for "Movies" and "TV Shows"`;

        div.append(h1);      
        h1.setAttribute("id", "background-image-not-available")

        h1.style.color = 'red';
        h1.style.textAlign = "center"

        document.querySelector('#movie-details').append(div);
    }
}


// ----------------------------------------------------------------------------------------
// Display TV Show Details
// ----------------------------------------------------------------------------------------
async function displayTVDetails() {
    const showID = window.location.search.split('=')[1];
    console.log(showID);
    
    const show = await fetchAPIData(`/tv/${showID}`); // de-structure '{Object}' converts it to an array.

    const contentType = 'tv';

    // Overlay for backgroud Image
    displayBackgroundImage(contentType, show.backdrop_path);
    
    let div = null;

     if (contentType === 'tv') {

        div = document.createElement('div');
        
        const baseURLforPostersAndImages = `https://image.tmdb.org/t/p`
        const widthOfThePoster = `/w500`
        
        div.innerHTML = 
        `
         <div class="details-top">
            <div>
                ${show.poster_path 
                    ? `<img src="${baseURLforPostersAndImages}${widthOfThePoster}${show.poster_path}" class="card-img-top" alt="${show.name}"/>` 
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}"/>`}
            </div>
            <div>
                <h2>${show.name}</h2>
                <p><i class="fas fa-star text-primary">${show.vote_average.toFixed(1)}</i>/ 10</p>
                <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
                <p>${show.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${show.genres.map((genre) => { return `<li>${genre.name}</li>`}).join('')}
                </ul>
                <a href="${show.homepage}" target="_blank" class="btn">Visit TV Show Homepage</a>
           </div>
        </div>
        <div class="details-bottom">
            <h2>TV Show Info</h2>
            <ul>
                <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
                <li><span class="text-secondary">Number of Seasons:</span> ${show.number_of_seasons}</li>
                <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}</li>
                <li><span class="text-secondary">Status:</span> ${show.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${show.production_companies.map((company) => {return `<span>${company.name}<\span>`}).join(', ')}
            </div>
        </div>
        `
       document.querySelector('#show-details').appendChild(div);
    
    } else {
        div = document.createElement('div');
        div.classList.add('background-image-container');

        const h1 = document.createElement('h1');
        h1.innerText = `Background image only available for "Movies" and "TV Shows"`;

        div.append(h1);      
        h1.setAttribute("id", "background-image-not-available")

        h1.style.color = 'red';
        h1.style.textAlign = "center"

        document.querySelector('#show-details').append(div);
    }
}







// ----------------------------------------------------------------------------------------
// >>>>> STYLING FUNCTIONS
// ----------------------------------------------------------------------------------------
// 'Show' Spinner when waiting from the results from the Endpoint
// ----------------------------------------------------------------------------------------
function showSpinner () {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('show');
}

// ----------------------------------------------------------------------------------------
// 'Hide' Spinner when waiting from the results from the Endpoint
// ----------------------------------------------------------------------------------------
function hideSpinner () {
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('show');
}

// ----------------------------------------------------------------------------------------
// Hightlight Active Page
// ----------------------------------------------------------------------------------------
function highLightActiveLink() {
    const links = document.querySelectorAll('.nav-link')
    
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })

}

// ----------------------------------------------------------------------------------------
// Add commas to money values
// ----------------------------------------------------------------------------------------
function addComasToNumber (number) {

    console.log(Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(number)) // Alternative way #1
    console.log(number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})) // Alternative way #2


    const comasAddedToNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return comasAddedToNumber
}

// ----------------------------------------------------------------------------------------
// Display Backdrop On Details Pages (Movies and TVshows)
// ----------------------------------------------------------------------------------------
function displayBackgroundImage(type, backgroundPath) {

    const overlayDiv = document.createElement('div');

    const baseURLforPostersAndImages = `https://image.tmdb.org/t/p`

    // Styles
    overlayDiv.style.backgroundImage = `url(${baseURLforPostersAndImages}/original${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.333';
   
    console.log(`${overlayDiv.style.backgroundImage}`)
    


     switch (type) {
        case 'movie': {
            document.querySelector('#movie-details').appendChild(overlayDiv);
            break;
        }
        case 'tv': {
            document.querySelector('#show-details').appendChild(overlayDiv);
            break;
        } 
     }   

    //  if (type === 'movie') {
    //     document.querySelector('#movie-details').appendChild(overlayDiv);

    //  } else {
    //     document.querySelector('#show-details').appendChild(overlayDiv);
    //  }


}






// ----------------------------------------------------------------------------------------
// >>>>> INIT
// ----------------------------------------------------------------------------------------
// Initialization 
// ----------------------------------------------------------------------------------------
function init () {
    
    switch (global.currentPage) {
        case `/`:
        case `/index.html`:
            console.log('Home');
            displayPopularMovies();
            break;
        case `/shows.html` :
            console.log('Shows');
            displayPopularTVShows()
            break;
        case `/movie-details.html` :
            console.log('Movie Details');
            displayMovieDetails()
            break;
        case `/tv-details.html` :
            console.log('TV Details');
            displayTVDetails();
            break;
        case `/search.html` :
            console.log('Search');
            break;
    }

    highLightActiveLink();
}


// ----------------------------------------------------------------------------------------
// >>>>> MAIN RUNNER
// ----------------------------------------------------------------------------------------
// Startup
// ----------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', init())
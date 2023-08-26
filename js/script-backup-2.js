// ----------------------------------------------------------------------------------------
// >>>>> GLOBALS
// ----------------------------------------------------------------------------------------
const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1
    },
    api: {
        apiKey: '1b2278a2450196115b4b7190d5dcc01e',
        apiURL: 'https://api.themoviedb.org/3',
        
        URLforPostersAndImages: 'https://image.tmdb.org/t/p',
        widthOfThePoster: `/w500`
    }
};


// ----------------------------------------------------------------------------------------
// >>>>> FETCH DATA FROM SPECIFIC ENDPOINT (TMDB API)
// ----------------------------------------------------------------------------------------
// Fetch API
// ----------------------------------------------------------------------------------------
async function fetchAPIData (endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;

    showSpinner();

    const response = await fetch (`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`) 
    const data = /*await*/ response.json();

    hideSpinner();

    console.log(data);
    return data
}

// ----------------------------------------------------------------------------------------
// Make Request to Search
// ----------------------------------------------------------------------------------------
async function searchAPIData () {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;

    showSpinner();

    const endpoint = `${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
    const response = await fetch (endpoint);
    const data = /*await*/ response.json();

    console.log('ENDPOINT: ' + endpoint);
    console.log('RESPONSE: ' + response);
    console.log('DATA: (From the response in JSON format):', data);
    
    hideSpinner();

    return data
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

        const baseURLforPostersAndImages = global.api.URLforPostersAndImages;
        const widthOfThePoster = global.api.widthOfThePoster;

        div.innerHTML = 
        `
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path 
                ? `<img src="${baseURLforPostersAndImages}${widthOfThePoster}${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>` 
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text"><small class="text-muted">Release: ${movie.release_date}</small></p>
        </div>
        `
    document.querySelector('#popular-movies').appendChild(div)
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

        const baseURLforPostersAndImages = global.api.URLforPostersAndImages;
        const widthOfThePoster = global.api.widthOfThePoster;

        div.innerHTML = 
        `
        <a href="tv-details.html?id=${show.id}">
            ${show.poster_path 
                ? `<img src="${baseURLforPostersAndImages}${widthOfThePoster}${show.poster_path}" class="card-img-top" alt="${show.name}"/>` 
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}"/>`}
        </.name
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text"><small class="text-muted">Air Date: ${show.first_air_date}</small></p>
        </div>
        `
    document.querySelector('#popular-shows').appendChild(div)
    })
}

// ----------------------------------------------------------------------------------------
// Display Movie Details
// ----------------------------------------------------------------------------------------
async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];
    console.log(movieID);
    
    const movie = await fetchAPIData(`/movie/${movieID}`); // de-structure '{Object}' converts it to an array.

    // Overlay for backgroud Image
    displayBackgroundImage('movie', movie.backdrop_path);
    
    const div = document.createElement('div');
    const baseURLforPostersAndImages = global.api.URLforPostersAndImages;
    const widthOfThePoster = global.api.widthOfThePoster;

    div.innerHTML = 
    `
    <div class="details-top">
        <div class="card-details">
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
    document.querySelector('#movie-details').appendChild(div)
}

// ----------------------------------------------------------------------------------------
// Display TV Show Details
// ----------------------------------------------------------------------------------------
async function displayTVDetails() {
    const showID = window.location.search.split('=')[1];
    console.log(showID);
    
    const show = await fetchAPIData(`/tv/${showID}`); // de-structure '{Object}' converts it to an array.

    // Overlay for backgroud Image
    displayBackgroundImage('tv', show.backdrop_path);
    
    const div = document.createElement('div');
    const baseURLforPostersAndImages = global.api.URLforPostersAndImages;
    const widthOfThePoster = global.api.widthOfThePoster;
    
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
}

// ----------------------------------------------------------------------------------------
// Display Slider Movies
// ----------------------------------------------------------------------------------------
async function displaySlider () {
    const { results } = await fetchAPIData ('/movie/now_playing')

    console.log(results);

    results.forEach ((movie) => {
        const div = document.createElement('div');
        
        const baseURLforPostersAndImages = `https://image.tmdb.org/t/p`
        const widthOfThePoster = `/w500`

        div.classList.add('swiper-slide');

        div.innerHTML = 
        `
        <div class="swiper-slide">
            <a href="movie-details.html?id=${movie.id}">
                <img src="${baseURLforPostersAndImages}${widthOfThePoster}${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
        </div>
        `
        document.querySelector('.swiper-wrapper').appendChild(div);

        // Init swiper
        initSwiper();


    })
}

async function search() {
    const queryString  = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type'),
    global.search.term = urlParams.get('search-term')
    console.log(global.search.type, ``, global.search.term)

    if (global.search.term !== '' && global.search.term !== 'a') {
        const resultsObject = await searchAPIData();                        // Gets all results in the form of OBJECT.
        console.log('TYPE OF \'resultsObject\' variable: ' + typeof(resultsObject));
        
        const { results, total_pages, page } = await searchAPIData();       // De-structures the Object. The name(s) inside {} are the Object(s) attributes. 
                                                                            // In this case 'results' is an array. This is used to select only the needed portions of an Object.
        console.log('RESULTS OBJECT (All info):',  resultsObject )
        console.log('RESULTS DESTRUCTURED (\'Results\' only):',  results )
        
        // Demo example for getting specific data from an Object and adding it to an array (Not needed in this Application. For reference only)
            let matches = [];
            Object.entries(resultsObject).map((entry) => {
            matches.push(entry)
            return console.log(entry)
        })
        console.log('MATCHES:', matches[1][1])

        if (results.length === 0) {
            showAlert('No results found');
            return;
        }
      
        displaySearchResults(results);
        document.querySelector('#search-term').value = '';

    } else {
        showAlert('Please enter a search term');
    }
}

function displaySearchResults (results) {

    results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');

        const baseURLforPostersAndImages = global.api.URLforPostersAndImages;
        const widthOfThePoster = global.api.widthOfThePoster;

        const title = global.search.type === 'movie' ? result.title : result.name;
        const dateOfRelease = global.search.type === 'movie' ? result.release_date : result.first_air_date;

        div.innerHTML = 
        `
        <a href="${global.search.type}-details.html?id=${result.id}">
            ${result.poster_path 
                ? `<img src="${baseURLforPostersAndImages}${widthOfThePoster}${result.poster_path}" class="card-img-top" alt="${title}"/>` 
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${title}"/>`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"><small class="text-muted">Release: ${dateOfRelease}</small></p>
        </div>
        `
    document.querySelector('#search-results').appendChild(div)
    })
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
function displayBackgroundImage (type, backgroundPath) {

    const overlayDiv = document.createElement('div');

    const baseURLforPostersAndImages = global.api.URLforPostersAndImages;

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
}


function showAlert (message, className = 'error') {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', className);
    
    alertElement.appendChild(document.createTextNode(message))

    document.querySelector('#alert').appendChild(alertElement);

    setTimeout (() => {
        alertElement.remove();
    }, 3000)

}

// ----------------------------------------------------------------------------------------
// >>>>> INIT
// ----------------------------------------------------------------------------------------
// Page Initialization 
// ----------------------------------------------------------------------------------------
function init () {
    switch (global.currentPage) {
        case `/`:
        case `/index.html`:
            console.log('Home');
            displaySlider();
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
            search();
            break;
    }
    highLightActiveLink();
}

// ----------------------------------------------------------------------------------------
// Swiper Initialization 
// ----------------------------------------------------------------------------------------
function initSwiper () {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1, 
        spaceBetween: 12, 
        freeMode: true, 
        loop: true, 
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            },
        }
    })
}


// ----------------------------------------------------------------------------------------
// >>>>> MAIN RUNNER
// ----------------------------------------------------------------------------------------
// Startup
// ----------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', init())
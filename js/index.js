window.addEventListener('load', init);

// global variables

// get elements
let headerText;
let seeMore;
let backgroundVideo;

let homeDisplay;
let projectsDisplay;
let contactDisplay;


let headerAnimation = 0;

// initial function
function init() {
    body = document.getElementById('body');
    headerText = document.getElementById('header-text');
    seeMore = document.getElementById('see-more');
    backgroundVideo = document.getElementById('background-video');

    language = localStorage.getItem("portfolioLanguage");
    darkmode = localStorage.getItem("portfolioDarkmode");

    homeDisplay = document.getElementById('home');
    projectsDisplay = document.getElementById('projects');
    contactDisplay = document.getElementById('contact');

    randomDisplay();

    randomizeText(document.getElementById("header-word-one"));
    randomizeText(document.getElementById("header-word-two"));
}

function randomDisplay() {

    let numbers = [];
    while (numbers.length < 4) {
        let r = Math.floor(Math.random() * 23) + 1;
        if (numbers.indexOf(r) === -1) {
            numbers.push(r);
        }
    }

    homeDisplay.style.backgroundImage = `url("./img/backgrounds/home_backgrounds/homepage_background_${numbers[0]}.webp")`;
    projectsDisplay.style.backgroundImage = `url("./img/backgrounds/home_backgrounds/homepage_background_${numbers[1]}.webp")`;
    contactDisplay.style.backgroundImage = `url("./img/backgrounds/home_backgrounds/homepage_background_${numbers[3]}.webp")`;

}

function randomizeText(element) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let interval = null;
    let intervalDuration = 0;
    let pauseTime = 0;

    let iteration = 0;

    interval = setInterval(() => {
        if (intervalDuration === 0) {
            element.innerText = element.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return element.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= element.dataset.value.length) {
                clearInterval(interval);
                if (headerAnimation === 1) {
                    headerText.style.animation = "headerText 2s ease 1";
                    headerText.style.opacity = "1";

                    seeMore.style.animation = "headerText 2s ease 1";
                    seeMore.style.opacity = "1";

                    backgroundVideo.style.animation = "headerBackground 20s ease 1";
                    backgroundVideo.style.opacity = "0.25";
                }
                headerAnimation++;
            }

            iteration += 1 / 3;
            pauseTime = pauseTime + 2;
            intervalDuration = pauseTime;
        }
        intervalDuration--;
    }, 0);
}


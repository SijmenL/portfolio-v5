window.addEventListener('load', init);

// global variables

// get elements
let homepage;
let body;
let languageButton;
let darkmodeButton;

let navLanguageButton;
let navDarkmodeButton;

let hamburgerLanguageButton;
let hamburgerDarkmodeButton;


let headerImage;
let navImage;

// functional
let removeWhenLoaded
let darkmode;
let language;
let hamburger;
let nav;
let navbar;
let hamburgerOpen = false;
let hamburgerMenu;


// initial function
function init() {
    removeWhenLoaded = document.getElementById('load-bar');

    homepage = !!document.getElementById('language-button');

    hamburger = document.querySelector(".hamburger");
    nav = document.getElementById('nav-content');
    navbar = document.getElementById('nav')
    hamburger.addEventListener("click", mobileMenu);
    hamburgerMenu = document.getElementById('hamburger-menu');

    body = document.getElementById('body');

    headerImage = document.getElementById('logo');
    navImage = document.getElementById('nav-logo');

    if (homepage) {
        languageButton = document.getElementById('language-button');
        darkmodeButton = document.getElementById('darkmode-button');
        languageButton.addEventListener("click", languageButtonPressed);
        darkmodeButton.addEventListener("click", darkmodeButtonPressed);
    }

    navLanguageButton = document.getElementById('nav-language-button');
    navDarkmodeButton = document.getElementById('nav-darkmode-button');
    navLanguageButton.addEventListener("click", languageButtonPressed);
    navDarkmodeButton.addEventListener("click", darkmodeButtonPressed);

    hamburgerLanguageButton = document.getElementById('hamburger-language-button');
    hamburgerDarkmodeButton = document.getElementById('hamburger-darkmode-button');
    hamburgerLanguageButton.addEventListener("click", languageButtonPressed);
    hamburgerDarkmodeButton.addEventListener("click", darkmodeButtonPressed);

    language = localStorage.getItem("portfolioLanguage");
    darkmode = localStorage.getItem("portfolioDarkmode");

    languageSwitcher();
    darkMode();
    randomHeaderImage();

    // set the copyright date to the current year
    document.getElementById('date').innerHTML = (new Date().getFullYear()).toString();

    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        console.log('images finished loading');
        body.style.overflowY = 'scroll'
        removeWhenLoaded.style.animation = 'fadeOut ease 1 2s'
        removeWhenLoaded.style.opacity = '0'

        removeWhenLoaded.addEventListener("animationend", function() {
            removeWhenLoaded.remove()
        });
    });
}

function mobileMenu() {
    if (hamburgerOpen === false) {
        hamburgerMenu.style.transform = 'translateY(0px)';
        hamburgerMenu.style.opacity = '1'
        hamburger.classList.toggle("active");
        hamburgerOpen = true;
        body.style.overflowY = 'hidden'
        navbar.style.boxShadow = '0 5px 23px 0 var(--nav-menu)'
    } else {
        hamburgerMenu.style.transform = 'translateY(-100vh)';
        hamburgerMenu.style.opacity = '0'
        hamburger.classList.remove("active");
        hamburgerOpen = false;
        body.style.overflowY = 'scroll'
        navbar.style.boxShadow = 'none'
    }
}

window.addEventListener('resize', function(event){
    if (Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    ) > 840 && hamburgerOpen === true) {
        mobileMenu()
    }
});

function darkmodeButtonPressed() {
    if (darkmode === "true") {
        darkmode = "false";
        localStorage.setItem("portfolioDarkmode", "false");
        darkMode();
    } else {
        darkmode = "true";
        localStorage.setItem("portfolioDarkmode", "true");
        darkMode();
    }

}

function darkMode() {
    let darkmodeButtonImage;
    let languageButtonImage;
    if (homepage) {
        darkmodeButtonImage = document.getElementById('darkmode-image');
        languageButtonImage = document.getElementById('language-image');
    }

    let navDarkmodeButtonImage = document.getElementById('nav-darkmode-image');
    let navLanguageButtonImage = document.getElementById('nav-language-image');

    let hamburgerDarkmodeButtonImage = document.getElementById('hamburger-darkmode-image');
    let hamburgerLanguageButtonImage = document.getElementById('hamburger-language-image');

    let instagram = document.getElementById('instagram');
    let youtube = document.getElementById('youtube');
    let github = document.getElementById('github');


    if (darkmode === "true") {
        document.documentElement.style.setProperty('--main-bg-color', '#3d3d3d');
        document.documentElement.style.setProperty('--nav-menu', '#212121');
        document.documentElement.style.setProperty('--item-card', '#2d2d2d');
        document.documentElement.style.setProperty('--text', '#fff');
        document.documentElement.style.setProperty('--header', '#000000');
        document.documentElement.style.setProperty('--card', '#00000051');

        if (homepage) {
            darkmodeButtonImage.style.filter = "invert()";
            languageButtonImage.style.filter = "invert()";
            darkmodeButtonImage.src = "./img/light.svg";
        }

        navDarkmodeButtonImage.style.filter = "invert()";
        navLanguageButtonImage.style.filter = "invert()";
        navDarkmodeButtonImage.src = "./img/light.svg";

        hamburgerDarkmodeButtonImage.style.filter = "invert()";
        hamburgerLanguageButtonImage.style.filter = "invert()";
        hamburgerDarkmodeButtonImage.src = "./img/light.svg";


        youtube.style.filter = "invert()";
        github.style.filter = "invert()";
        instagram.style.filter = "invert()";


    } else {
        document.documentElement.style.setProperty('--main-bg-color', '#f1f1f1');
        document.documentElement.style.setProperty('--nav-menu', '#c1c2cb');
        document.documentElement.style.setProperty('--item-card', '#fff');
        document.documentElement.style.setProperty('--text', '#000000');
        document.documentElement.style.setProperty('--header', '#ffffff');
        document.documentElement.style.setProperty('--card', 'rgba(255,255,255,0.55)');

        if (homepage) {
            darkmodeButtonImage.style.filter = "";
            languageButtonImage.style.filter = "";
            darkmodeButtonImage.src = "./img/dark.svg";
        }

        youtube.style.filter = "";
        github.style.filter = "";
        instagram.style.filter = "";

        navDarkmodeButtonImage.style.filter = "";
        navLanguageButtonImage.style.filter = "";
        navDarkmodeButtonImage.src = "./img/dark.svg";

        hamburgerDarkmodeButtonImage.style.filter = "";
        hamburgerLanguageButtonImage.style.filter = "";
        hamburgerDarkmodeButtonImage.src = "./img/dark.svg";
    }
    console.log(`Darkmode set to ${darkmode}`);

}


function languageButtonPressed() {
    if (language === "dutch") {
        language = "english";
        languageSwitcher();
    } else {
        language = "dutch";
        languageSwitcher();
    }
}

function languageSwitcher() {
    // remove the old style element
    let oldStyle = document.getElementById('style');
    if (oldStyle) {
        oldStyle.remove();
    }

    if (language === "dutch") {
        // Change elements based on the classes
        let style = document.createElement('style');
        style.id = 'style';
        style.innerHTML = ".dutch {display: inline;} .english {display: none;}";
        body.appendChild(style);

        if (homepage) {
            languageButton.style.backgroundImage = "url(\"./img/english-flag.webp\")";
        }
        navLanguageButton.style.backgroundImage = "url(\"./img/english-flag.webp\")";
        hamburgerLanguageButton.style.backgroundImage = "url(\"./img/english-flag.webp\")";

        localStorage.setItem("portfolioLanguage", "dutch");
    } else {
        // Change elements based on the classes
        let style = document.createElement('style');
        style.id = 'style';
        style.innerHTML = ".dutch {display: none;} .english {display: inline;}";
        body.appendChild(style);

        if (homepage) {
            languageButton.style.backgroundImage = "url(\"./img/dutch-flag.webp\")";
        }
        navLanguageButton.style.backgroundImage = "url(\"./img/dutch-flag.webp\")";
        hamburgerLanguageButton.style.backgroundImage = "url(\"./img/dutch-flag.webp\")";


        localStorage.setItem("portfolioLanguage", "english");

    }
    console.log(`Language set to ${language}`);
}

function randomHeaderImage() {
    let images = ["./img/backgrounds/lijnen_background.webp", "./img/backgrounds/lichten_background.webp", "./img/backgrounds/stal_background.webp", "./img/backgrounds/beamer_background.webp", "./img/backgrounds/twee_kleuren_background.webp", "./img/backgrounds/roze_background.webp", "./img/backgrounds/drie_kleuren_background.webp", "./img/backgrounds/meerdere_tubes_background.webp", "./img/backgrounds/lampen_lijnen_background.webp", "./img/backgrounds/groen_background.webp"];
    let glows = ["#2d1f04", "#090701", "#182028", "#2c356a", "#301101", "#29002d", "#2c356a", "#2c356a", "#2c356a", "#2c356a"];
    let randomNumber = Math.floor(Math.random() * images.length);

    if (homepage) {
        headerImage.style.backgroundImage = `url("${images[randomNumber]}")`;
        headerImage.style.filter = `drop-shadow(0px 0px 25px ${glows[randomNumber]})`;
    }

    navImage.style.backgroundImage = `url("${images[randomNumber]}")`;
    navImage.style.filter = `drop-shadow(0px 0px 25px ${glows[randomNumber]})`;

}

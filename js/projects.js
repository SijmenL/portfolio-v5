window.addEventListener('load', init);

// global variables
let projectsDisplay;
let radioButtonLeft;
let radioButtonRight;

let projectData;
let projectDisplay;

let display;

// initial function
function init() {
    projectsDisplay = document.getElementById('projects');
    projectsDisplay.style.backgroundImage = `url("./img/backgrounds/home_backgrounds/homepage_background_${Math.round(Math.random() * 22) + 1}.webp")`;

    projectDisplay = document.getElementById('project-showcase-area');

    radioButtonLeft = document.getElementById('radio-button-left');
    radioButtonRight = document.getElementById('radio-button-right');

    radioButtonLeft.addEventListener('click', leftRadioButton);
    radioButtonRight.addEventListener('click', rightRadioButton);

    leftRadioButton();
    ajaxRequest('./projects.json', loadData);
}

function ajaxRequest(url, succes) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(succes)
        .catch(ajaxErrorHandler);
}

function loadData(data) {
    projectData = data;
    displayProjects(projectData);
}

function ajaxErrorHandler(data) {
    console.error(data);
}

function displayProjects(data) {
    projectDisplay.innerHTML = "";
    if (data !== undefined) {
        for (let project of data.projects) {
            if (display !== project.type) {
                let card = document.createElement('a');
                card.href = project.page;
                projectDisplay.appendChild(card);

                let img = document.createElement('img');
                img.src = project.image;
                card.appendChild(img);

                let title = document.createElement('h2');
                card.appendChild(title);

                let titleContentDutch = document.createElement('span');
                titleContentDutch.innerHTML = project.title_dutch;
                titleContentDutch.classList.add('dutch');
                title.appendChild(titleContentDutch);

                let titleContentEnglish = document.createElement('span');
                titleContentEnglish.innerHTML = project.title_english;
                titleContentEnglish.classList.add('english');
                title.appendChild(titleContentEnglish);

                let subtitle = document.createElement('p');
                subtitle.classList.add('subtitle');
                subtitle.innerHTML = project.subtitle;
                card.appendChild(subtitle);

                let date = document.createElement('p');
                date.innerHTML = project.date;
                date.classList.add('date');
                card.appendChild(date);

                let description = document.createElement('p');
                description.classList.add('description');
                card.appendChild(description);

                let descriptionContentDutch = document.createElement('span');
                descriptionContentDutch.innerHTML = project.description_dutch;
                descriptionContentDutch.classList.add('dutch');
                description.appendChild(descriptionContentDutch);

                let descriptionContentEnglish = document.createElement('span');
                descriptionContentEnglish.innerHTML = project.description_english;
                descriptionContentEnglish.classList.add('english');
                description.appendChild(descriptionContentEnglish);


            }
        }
    }
}

function leftRadioButton() {
    if (display !== 0) {
        display = 0;

        radioButtonLeft.classList.add('active-radio-button');
        radioButtonRight.classList.remove('active-radio-button');

        console.log(`View switched to commission`);
    }
    displayProjects(projectData);
}

function rightRadioButton() {
    if (display !== 1) {
        display = 1;

        radioButtonLeft.classList.remove('active-radio-button');
        radioButtonRight.classList.add('active-radio-button');

        console.log(`View switched to experiments`);
    }
    displayProjects(projectData);
}
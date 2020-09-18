let showSelector = document.createElement("select");
showSelector.id = "showSelector";
showSelector.name = "chooseShow";
showSelector.style.height = "30px";

document.getElementById("root").style.display = "none";

let showsContainer = document.createElement("div");
showsContainer.id = "showsContainer";
document.body.appendChild(showsContainer);

let navShow = document.createElement("nav");
navShow.id = "navShow";
navShow.style.display = "flex";
navShow.style.alignItems = "center";
showsContainer.appendChild(navShow);
navShow.appendChild(showSelector);
let optionAllShow = document.createElement("option");
optionAllShow.value = 0;
optionAllShow.innerText = "All shows";
showSelector.appendChild(optionAllShow);
function setup() {
  let allShows = getAllShows().filter((i) => i.id != 1127);
  allShows.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    })
    .forEach((item) => {
      let option = document.createElement("option");
      option.value = item.id;
      option.innerText = item.name;
      chooseAShow.appendChild(option);
      
      showSelector.appendChild(option.cloneNode(true));
    });
makePageForShows(allShows);
  //loadShow(allShows[0].id); // Not useful on the level 500
}

function makePageForShows(showList){
showList.forEach(showObject =>{
  let showContainer = document.createElement("div");
  showContainer.className = "show";
  showContainer.innerHTML = `<h1>${showObject.name}</h1><br><img src = "${showObject.image.medium}">`;
  showsContainer.appendChild(showContainer);
});
addFooter();
};

function loadShow(id) {
  let removeOptions = chooseAnEpisode.querySelectorAll("option");
  removeOptions.forEach((item) => chooseAnEpisode.removeChild(item));
  helpfulArray = [];
  displayedEpisodes = 0;
  numberOfAllEpisodes = 0;
  search.value = "";

  let removeEpisodes = rootElem.querySelectorAll(".episode");

  removeEpisodes.forEach((item) => rootElem.removeChild(item));

  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json())
    .then((allEpisodes) => makePageForEpisodes(allEpisodes))
    .catch((err) => console.log(err));
}

const rootElem = document.getElementById("root");

let helpfulArray = [];
let displayedEpisodes = 0;
let numberOfAllEpisodes = 0;
let nav = document.createElement("nav");
nav.id = "navBar";
nav.style.display = "flex";
nav.style.alignItems = "center";

let chooseAShow = document.createElement("select");
chooseAShow.id = "chooseAShow";
chooseAShow.name = "choose";
chooseAShow.style.height = "30px";
nav.appendChild(chooseAShow);

let chooseAnEpisode = document.createElement("select");
chooseAnEpisode.id = "chooseAnEpisode";
chooseAnEpisode.name = "choose";
chooseAnEpisode.style.height = "30px";
chooseAnEpisode.style.marginLeft = "20px";
chooseAnEpisode.style.minWidth = "350px";
nav.appendChild(chooseAnEpisode);
let search = document.createElement("input");

rootElem.insertBefore(nav, rootElem.firstChild);
nav.appendChild(search);
search.id = "search";
search.style.marginLeft = "20px";
search.style.width = "250px";
search.style.height = "25px";
search.style.borderRadius = "5px";
search.placeholder = "your search term...";
let displayedEpisodesP = document.createElement("p");

nav.appendChild(displayedEpisodesP);

function makePageForEpisodes(episodeList) {
  let startOption = document.createElement("option");
  startOption.value = "All episodes";
  startOption.innerText = "All episodes";
  chooseAnEpisode.appendChild(startOption);

  episodeList.forEach((element) => {
    let episodeContainer = document.createElement("div");
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleEp";
    let epImage = document.createElement("img");
    episodeContainer.className = "episode";
    displayedEpisodes++;
    numberOfAllEpisodes++;
    let episodeFullNumber = `S${("0" + element.season).slice(-2)}E${(
      "0" + element.number
    ).slice(-2)}`;
    helpfulArray.push({
      episode: episodeContainer,
      name: element.name.toLowerCase(),
      summary: element.summary ? element.summary.toLowerCase() : "",
      fullNumber: episodeFullNumber,
    });
    titleDiv.innerText = `${element.name} - ${episodeFullNumber}`;

    episodeContainer.innerHTML = element.summary ? element.summary : ``;

    rootElem.appendChild(episodeContainer);

    let episodeOption = document.createElement("option");
    episodeOption.value = episodeFullNumber;
    episodeOption.innerText = `${episodeFullNumber} - ${element.name}`;
    chooseAnEpisode.appendChild(episodeOption);

    if (element.image) {
      epImage.src = element.image.medium;
      epImage.className = "epImg";
      episodeContainer.insertBefore(epImage, episodeContainer.firstChild);
    }

    episodeContainer.insertBefore(titleDiv, episodeContainer.firstChild);
    let episodeNumber = document.createElement("div");
    episodeNumber.innerText = "82";
    episodeNumber.className = "hidden";
    episodeContainer.insertBefore(episodeNumber, episodeContainer.firstChild);
  });
  displayedEpisodesP.innerText = `Displaying ${displayedEpisodes}/${numberOfAllEpisodes} episodes`;
}

function addFooter() {
  let footer = document.createElement("footer");
  footer.style.textAlign = "right";
  footer.style.paddingRight = "20px";
  footer.innerHTML =
    'Data provided by <a href = "https://www.tvmaze.com/" target = "_blank" >www.tvmaze.com</a>';
  document.body.appendChild(footer);
}

function searchEpisodes() {
  chooseAnEpisode.value = "All episodes";
  displayedEpisodes = 0;
  helpfulArray.forEach((element) => {
    if (
      element.name.includes(search.value.toLowerCase()) ||
      element.summary.includes(search.value.toLowerCase())
    ) {
      element.episode.classList.remove("hidden");
      displayedEpisodes++;
    } else {
      element.episode.classList.add("hidden");
    }
  });
  displayedEpisodesP.innerText = `Displaying ${displayedEpisodes}/${numberOfAllEpisodes} episodes`;
}

search.onkeyup = searchEpisodes;

chooseAnEpisode.onchange = (event) => {
  search.value = "";
  if (event.target.value === "All episodes") {
    searchEpisodes();
  } else {
    helpfulArray.forEach((element) => {
      if (element.fullNumber === event.target.value) {
        element.episode.classList.remove("hidden");
        displayedEpisodes++;
      } else {
        element.episode.classList.add("hidden");
      }
    });
  }
};
document.addEventListener("click", (event) => {
  if (event.target.parentNode.className === "episode") {
    loadShow(event.target.parentNode.firstChild.innerText);
    chooseAShow.value = 82;
  } else if (event.target.className === "episode") {
    loadShow(event.target.firstChild.innerText);
    chooseAShow.value = 82;
  }
});
chooseAShow.onchange = (event) => loadShow(event.target.value);

window.onload = setup;

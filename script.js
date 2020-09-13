function setup() {
  const allShows = getAllShows();
  allShows.forEach((item) => {
    let option = document.createElement("option");
    option.value = item.id;
    option.innerText = item.name;
    chooseAnShow.appendChild(option);
  });

  loadShow(allShows[0].id);

}

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

let chooseAnShow = document.createElement("select");
chooseAnShow.id = "chooseAnShow";
chooseAnShow.name = "choose";
chooseAnShow.style.height = "30px";
nav.appendChild(chooseAnShow);

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
      summary: element.summary ? element.summary.toLowerCase():"",
      fullNumber: episodeFullNumber,
    });
    titleDiv.innerText = `${element.name} - ${episodeFullNumber}`;

    episodeContainer.innerHTML = element.summary ? element.summary:``;
    
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

let footer = document.createElement("footer");
footer.style.textAlign = "right";
footer.style.paddingRight = "20px";
footer.innerHTML =
  'Data provided by <a href = "https://www.tvmaze.com/" target = "_blank" >www.tvmaze.com</a>';
document.body.appendChild(footer);

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
    helpfulArray.forEach(element => {
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
  if(event.target.parentNode.className === "episode") {loadShow(event.target.parentNode.firstChild.innerText)}
  else if (event.target.className === "episode") {loadShow(event.target.firstChild.innerText)}
});
chooseAnShow.onchange = (event) => loadShow(event.target.value);


window.onload = setup;

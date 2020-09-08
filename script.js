function setup() {
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  fetch("https://api.tvmaze.com/shows/527/episodes")
  .then(response => response.json())
  .then(allEpisodes => makePageForEpisodes(allEpisodes))
  .catch( err => console.log(err));
}

const rootElem = document.getElementById("root");

let helpfulArray = [];
let displayedEpisodes = 0;
let numberOfAllEpisodes = 0;
let nav = document.createElement("nav");
nav.id = "navBar";
nav.style.display = "flex";
nav.style.alignItems = "center";
let chooseAnEpisode = document.createElement("select");
chooseAnEpisode.id = "chooseAnEpisode";
chooseAnEpisode.name = "choose";
chooseAnEpisode.style.height = "30px";
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

  episodeList.forEach((element, ind) => {
    
    let episodeContainer = document.createElement("div");
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleEp";
    let epImage = document.createElement("img");
    episodeContainer.className = "episode";
    displayedEpisodes++;
    numberOfAllEpisodes++;
    helpfulArray.push({
      episode: episodeContainer,
      name: element.name.toLowerCase(),
      summary: element.summary.toLowerCase(),
    });
    titleDiv.innerText = `${element.name} - S${("0" + element.season).slice(
      -2
    )}E${("0" + element.number).slice(-2)}`;
    epImage.src = element.image.medium;
    epImage.className = "epImg";

    episodeContainer.innerHTML = element.summary;
    rootElem.appendChild(episodeContainer);

    let startOption = document.createElement("option");
    startOption.value = element.name;
    startOption.innerText = `S${("0" + element.season).slice(-2)}E${(
      "0" + element.number
    ).slice(-2)} - ${element.name}`;
    chooseAnEpisode.appendChild(startOption);

    episodeContainer.insertBefore(epImage, episodeContainer.firstChild);
    episodeContainer.insertBefore(titleDiv, episodeContainer.firstChild);
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
  let listName = "";
  if(event.target.value === "All episodes"){
    search.value = "";
  } else {
    search.value = event.target.value;
  }
  searchEpisodes();
}

window.onload = setup;

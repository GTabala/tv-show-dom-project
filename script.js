//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function getEpisodeNumber(episode){

}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.forEach((element) => {
    let episodeContainer = document.createElement("div");
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleEp";
    let epImage = document.createElement("img");
    episodeContainer.className = "episode";
    console.log(element);
    titleDiv.innerText = `${element.name} - S${("0" + element.season ).slice(-2)}E${("0" + element.number ).slice(-2)}`;
    epImage.src = element.image.medium;
    epImage.className = "epImg";

    episodeContainer.innerHTML = element.summary;
    rootElem.appendChild(episodeContainer);

    episodeContainer.insertBefore(epImage, episodeContainer.firstChild);
    episodeContainer.insertBefore(titleDiv, episodeContainer.firstChild);
  });
}

window.onload = setup;

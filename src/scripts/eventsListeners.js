export {addEventListeners};
import * as log from './log';

let player;

function addEventListeners(sskyplayer) {
    player = sskyplayer;
    /**** For Static Pages - Remove Loader after Player is Loaded ****/
    sskyplayer.addEventListener('load', hideLoader);
    sskyplayer.addEventListener('survey', showSurveyContainer); //Emitted if a <sundaysky-survey> component is connected and the survey trigger point was reached for the first time.
    // sskyplayer.addEventListener('progress', showCtas); //Emitted every 5% of the video duration when the video is in "playing" state, including 0% and 100%
    // sskyplayer.addEventListener('playRequested', ); //Emitted when the user clicks "play" for the first time. Not fired on Autoplay
    // sskyplayer.addEventListener('playStart', showCtas); //Emitted when the video starts playing for the first time
    // sskyplayer.addEventListener('scene', createSurvey); //Emitted every time the video starts playing a new scene in the video
    // sskyplayer.addEventListener('userAction', ); //Emitted every time a user interaction
    // sskyplayer.addEventListener('surveySubmit', ); //Emitted if a <sundaysky-survey> component is connected and the survey was submitted
    // sskyplayer.addEventListener('ctaShow', ); //Emitted when a CTA button should be displayed
    // sskyplayer.addEventListener('ctaHide', ); //Emitted when a CTA menu should be hidden
    // sskyplayer.addEventListener('ctaClicked', ); //Emitted when a CTA menu option was clicked
    // sskyplayer.addEventListener('metadata', ); //Emitted when video metadata is made available
    // sskyplayer.addEventListener('error', ); //Emitted whenever the player encounters an error
    // sskyplayer.addEventListener('ended', ); //Emitted whenever the video ends
    // sskyplayer.addEventListener('transcript', getTranscript); //Emitted whenever the video ends

}

export function hideLoader() {
    let loader = document.getElementById('loader');
    loader.style.display = 'none';
    //Because the page height is more than 100%, it is required to add a scroll when the loader ends
    document.getElementById('body').style.overflow = 'auto';

    player.removeEventListener('load', hideLoader)
}

function showCtas() {
    let ctasContainer = document.getElementById('ctas')
    let ctas = ctasContainer.childNodes;
    ctas.forEach(cta => {
        if (cta.getAttribute("data-id").toLowerCase() === 'attbutton') {
            cta.style.display = 'none';
        }
    });
    ctasContainer.style.display = 'flex';
    player.removeEventListener('progress', showCtas)
}

function showWatchButton() {
    let watchOverGif = document.getElementById('watch-over-gif');
    let watchButton = document.getElementById('watch-button');

    watchOverGif.setAttribute('onclick', 'window.pageScripts.moveToSecondView()');
    watchOverGif.classList.add('first-view__watch--show');
    watchButton.classList.add('first-view__main__button--show');
    player.removeEventListener('load', showWatchButton);
}

function createSurvey(e) {
    if (e && e.detail && e.detail.scene && e.detail.scene.name && e.detail.scene.name.toLowerCase() === "cta") {
        player.removeEventListener('progress', showCtas);
        let surveyContainer = document.getElementById("survey-container");

        let survey = document.createElement("sundaysky-survey");
        survey.setAttribute("player", player.id);
        survey.setAttribute("show-at", "0");
        survey.setAttribute("survey-id", "SF-00000129");
        survey.setAttribute("id", "survey");
        survey.setAttribute("class", "survey__ssky-survey");

        surveyContainer.appendChild(survey);
        log.info("Survey Created");
    }
}

function showSurveyContainer() {
    let surveyContainerHeadlines = document.getElementById('survey-container__headlines');
    surveyContainerHeadlines.style.display = 'none';
    let surveyContainer = document.getElementById("survey-subcontainer-sub");
    surveyContainer.style.display = 'flex';
}

function getTranscript(event) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && this.status === 200) {
            document.getElementById("transcript-text").innerHTML = xhr.responseText;
            document.getElementById('sskyplayer').reportCtaDisplay('viewTranscript', 'View transcript', '');
        }
    }
    xhr.open('GET', event.detail.descriptivetranscript, true);
    xhr.send();
}
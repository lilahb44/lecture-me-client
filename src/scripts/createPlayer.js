export {createPlayer};
import {addEventListeners} from "./eventsListeners";
import * as log from './log';
import {hideLoader} from "./eventsListeners";

import invitationImage from '../assets/InvitationImage.png';
import fallbackImage from '../assets/error.png';

let playerId = "sskyplayer";

let OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";

function createPlayer(session, SF, PLAYER_ELEMENT_ID, invitationImageDevMode, variation) {

    if (session.indexOf("error") >= 0 || session.indexOf("Error") >= 0 || variation == 'null') {
        createFallbackImage(PLAYER_ELEMENT_ID)
    } else {

        const sskyplayer = document.createElement("sundaysky-video");
        sskyplayer.setAttribute("id", playerId);
        sskyplayer.setAttribute("class", playerId);
        if (OSName === 'Windows') sskyplayer.classList.add('play-windows');
        sskyplayer.setAttribute("session", session);
        sskyplayer.setAttribute("session-parameters", "{}");
        sskyplayer.setAttribute("analytics-token", SF.toUpperCase());
        sskyplayer.setAttribute('no-autoplay', "true");
        sskyplayer.setAttribute('pre-roll', "");
        sskyplayer.setAttribute('playsinline', "true");
        if (invitationImageDevMode) {
            sskyplayer.setAttribute('poster', invitationImage);
        } else if (variation === 'tu') {
            sskyplayer.setAttribute('poster', "https://" + SF + ".images.sundaysky.com/poster_cl/image.png?format=png&text=NAME&text1=NAME1&text2=NAME2&t=1611058096517");
        } else if (variation === 'pp') {
            sskyplayer.setAttribute('poster', "https://" + SF + ".images.sundaysky.com/poster_or/image.png?format=png&text=NAME&text1=NAME1&text2=NAME2&t=1611058249470");
        }
        sskyplayer.setAttribute("transcript-button", "show");
        // sskyplayer.setAttribute('pre-roll', ''); //image or gif
        // sskyplayer.setAttribute('default-error-message', ''); //text in case of error
        // sskyplayer.setAttribute('no-captions', ''); //leave empty
        // sskyplayer.setAttribute('controls-end-state', ''); //if set to "show" controls will stay on screen for mobile devices
        // sskyplayer.setAttribute('no-fullscreen', ''); // leave empty. Disable full screen button
        // sskyplayer.setAttribute('fallback-video-url', '');
        // sskyplayer.setAttribute('fallback-video-metadata', '');
        // sskyplayer.setAttribute('cta-highlight', 'false'); // disable CTA highlight
        // sskyplayer.setAttribute('cc-on-by-default', 'true');
        // sskyplayer.setAttribute('aspect-ratio', ''); // 'horizontal','vertical','square' or 'large-square'
        // sskyplayer.setAttribute('hide-cc-on-video', ''); // hides captions/subtitles on video without changing captions state

        addEventListeners(sskyplayer);
        appendPlayer(PLAYER_ELEMENT_ID, sskyplayer);
    }
}

function appendPlayer(PLAYER_ELEMENT_ID, sskyplayer) {
    let playerContainer = document.getElementById(PLAYER_ELEMENT_ID);
    if (playerContainer) {
        playerContainer.appendChild(sskyplayer);
        log.step("Player Created");
    } else {
        log.error("Could not find player container. Supplied ID: " + PLAYER_ELEMENT_ID);
        setTimeout(() => {
            appendPlayer(PLAYER_ELEMENT_ID, sskyplayer)
        }, 100);
    }
}

function createFallbackImage(PLAYER_ELEMENT_ID) {
    let fallbackImg = document.createElement('img');
    fallbackImg.setAttribute('src', fallbackImage);
    fallbackImg.setAttribute('class', 'img__fallback')
    fallbackImg.setAttribute('alt', 'error message')
    appendPlayer(PLAYER_ELEMENT_ID, fallbackImg);

    hideLoader()
}
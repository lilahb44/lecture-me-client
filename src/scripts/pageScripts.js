import {query} from "./general";
import * as log from "./log";

const escape = require('escape-html');

export function initiate() {
    let variation = escape(query.get("u"));
    variation = variation !== "cl" && variation !== "or" ? "cl" : variation;
    setVariation(variation);
}

function setVariation(variation) {
    document.getElementById("headline-" + variation).style.display = "block";
    document.getElementById("survey-container-headlines-" + variation).style.display = "block";
    document.getElementById("disclaimer-" + variation).style.display = "block";
}


function setFirstName() {
    let name = query.get("name");
    let currentText = "Thanks again for being<br>an AT&T customer";
    if (name) {
        name = escape(query.get("name"));
        let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        document.getElementById('watch-name').innerHTML = "Hi, " + nameCapitalized + "!";

        document.getElementById('second-view-headline').innerHTML = currentText + ", " + nameCapitalized + "!";
        document.getElementById('second-view-headline-mobile').innerHTML = currentText + ", " + nameCapitalized + "!";
    } else {
        document.getElementById('second-view-headline').innerHTML = currentText + "!";
        document.getElementById('second-view-headline-mobile').innerHTML = currentText + "!";
    }
}


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const daySuffix = ["th", "st", "nd", "rd"];
let refresh = 1000;

function setCurrentTime() {
    let currentDate = new Date();
    let currentDayOfWeek = days[currentDate.getDay()];
    let currentDay = currentDate.getDate();
    let currentDaySuffix = getDaySuffix(currentDay);
    let currentMonth = months[currentDate.getMonth()];
    let currentYear = currentDate.getFullYear();
    let currentHour = formatTime(currentDate.getHours());
    let currentMinute = formatTime(currentDate.getMinutes());
    return (currentDayOfWeek + " " + currentDay + "<span>" + currentDaySuffix + " </span>" + " " + currentMonth + " " + currentYear + " " + currentHour + ":" + currentMinute);
}

function formatTime(fragment) {
    if (fragment < 10) {
        return "0" + fragment;
    }
    return fragment;
}

function getDaySuffix(currentDay) {
    if (currentDay !== 1 && currentDay !== 2 && currentDay !== 3) {
        currentDay = 0;
    }
    return daySuffix[currentDay];
}



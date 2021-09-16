import "../style/main.scss"

/**** BASIC SETUP ****/
const PLAYER_ELEMENT_ID = "player-container"; //ID of HTML element to contain SSKY-Player
const DEV_MODE = true; //If you don't have a functioning video, use a placeholder for dev
const INVITATION_IMAGE_DEV_MODE = false; //If you don't have a functioning poster image, use a placeholder for dev
const SF = "SF-00000770";

/**** Functions and Vars ****/
import {ENV, sskySegments, query, isMobile} from "./general"; //General functions and variables
import {requestSession} from './requestSession'; //Generate Session (Edit for custom behaviour)
import {createPlayer} from './createPlayer'; //Create Player Element (Edit for custom behaviour, EventListeners in a separate file)
import * as log from './log';

/**** ADD CUSTOM REPORTING ****/
// TODO: customize reporting (usually the following is OK, but please review)
sskySegments["userid"] = query.get('id');
sskySegments["page"] = 'landing page';
sskySegments["source"] = 'email';
sskySegments["u"] = query.get('u') ? query.get('u') : "cl"
ENV !== 'prod' && log.info(sskySegments);
debugger;
/**** END REPORTING ****/

/**** Start ****/
let variation = escape(query.get("u"));
variation = variation !== "cl" && variation !== "or" ? "cl" : variation;


/**** Start ****/
requestSession(SF, ENV, DEV_MODE).then(session => {
    createPlayer(session, SF, PLAYER_ELEMENT_ID, INVITATION_IMAGE_DEV_MODE, variation);
});

import * as scripts from './pageScripts'

window.pageScripts = scripts;
window.sskySegments = sskySegments;




import {ENV} from "./general";

export function error(message) {
    if (ENV !== "prod") console.log('%c' + message, 'color:red');
}

export function info(message) {
    if (typeof message === 'object' && message !== null) {
        if (ENV !== "prod") console.log(JSON.stringify(message));
    } else {
        if (ENV !== "prod") console.log('%c' + message, 'color:blue');
    }

}


export function step(message) {
    if (ENV !== "prod") console.log('%c' + message, 'color:green');
}

export {ENV, isMobile, sskySegments, query};

let isMobile;
try {
    isMobile = (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent));
} catch (e) {
    console.log("Error in isMobile");
    isMobile = false;
}

let ENV;
let urlPath = window.location.origin + window.location.pathname;

if (urlPath.indexOf('localhost') !== -1) {
    ENV = 'localhost';
} else if (urlPath.indexOf('dev') !== -1 || urlPath.indexOf('lp-staging') !== -1 || urlPath.indexOf('maintenance') !== -1) {
    ENV = 'dev';
} else if (urlPath.indexOf('uat') !== -1) {
    ENV = 'uat';
} else {
    ENV = 'prod';
}

//for reporting
let query = new URLSearchParams(window.location.search);
let sskySegments = {};
sskySegments["env"] = ENV;
for (let pair of query.entries()) {
    sskySegments[pair[0]] = pair[1];
}



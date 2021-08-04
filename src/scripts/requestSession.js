import 'whatwg-fetch';
import * as log from './log';

export {requestSession}

async function requestSession(SF, ENV, DEV_MODE) {
    if (!DEV_MODE) {
        let endpoint = "https://" + SF + ".web.sundaysky.com/create_video_session" + window.location.search;
        if (ENV !== "prod") {
            endpoint = replaceToSb(endpoint);
        }
        log.info("EP: " + endpoint);

        const options = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(endpoint, options).catch(err => {
            log.error(err);
        });

        log.step("Session Received")
        return await response.text();
    } else {
        return 'ewogICJfbGlua3MiOiB7CiAgICAic2VsZiI6IHsKICAgICAgImhyZWYiOiAiIgogICAgfSwKICAgICJ2aWRlby1zdHJlYW0iOiBbCiAgICAgIHsKCQkiaHJlZiI6ICJodHRwczovL3BsYXllci5zdW5kYXlza3kuY29tL2N1c3RvbWVycy9yYXotdGVzdC9DdXJyZW50LUN1c3RvbWVyLm1wNCIsCgkJImZvcm1hdCI6ICJhcHBsaWNhdGlvbi94LW1wZWdVUkwiCiAgICAgIH0KICAgIF0sCiAgICAibWV0YWRhdGEiOiB7CiAgICAgICJocmVmIjogImh0dHBzOi8vcGxheWVyLnN1bmRheXNreS5jb20vY3VzdG9tZXJzL3Jhei10ZXN0L0N1cnJlbnQtQ3VzdG9tZXIxLmpzb24iCiAgICB9LAogICAgImNhcHRpb25zIjogewogICAgICAiaHJlZiI6ICJodHRwczovL3BsYXllci5zdW5kYXlza3kuY29tL2N1c3RvbWVycy9yYXotdGVzdC9DdXJyZW50LUN1c3RvbWVyLnZ0dCIKICAgIH0sCiAgICAibG9nIjogewogICAgICAiaHJlZiI6ICIiCiAgICB9LAogICAgIm1ldGFkYXRhVXJpIjogewogICAgICAiaHJlZiI6ICJodHRwczovL3BsYXllci5zdW5kYXlza3kuY29tL2N1c3RvbWVycy9yYXotdGVzdC9DdXJyZW50LUN1c3RvbWVyMS5qc29uIgogICAgfQogIH0sCiAgImFjY291bnRJZCI6ICJURVNUIiwKICAicHJvamVjdElkIjogIlRFU1QiLAogICJqb2JJZCI6ICJURVNUIiwKICAicmVxdWVzdElkIjogIlRFU1QiLAogICJzdGF0dXMiOiAiIiwKICAiZXJyb3JzIjogWwogICAgewogICAgICAibWVzc2FnZSI6ICJTVUNDRVNTIgogICAgfQogIF0KfQ==';
    }
}

function replaceToSb(ep) {
    return ep.replace(".sundaysky.", ".sundaysky-sandbox.");
}
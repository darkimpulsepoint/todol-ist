import {todoSeverity} from "./todoSeverity.js";

export const severitiesToCheckboxOpts = severities => {
    const severitiesOpts = []
    severities.forEach(value => severitiesOpts.push({name:todoSeverity[value], value}))

    return severitiesOpts
}

export const hashtagsOptsToCheckboxOpts = hashtags => {
    const hashtagsOpts = []
    hashtags.forEach(value => hashtagsOpts.push({name:value, value}))
    return hashtagsOpts;
}
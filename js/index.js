let words = undefined;

function setWords(json) {
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
        json[json[keys[i]]] = keys[i]; //value as key with old key as new value
    }
    words = json;
}

fetch("Vertauschte-Woerter/res/words.json")
    .then(function (response) {
            response.json().then(setWords)
        }, function (error) {
            error.text().then(console.log)
        }
    );


function getUrlVars() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter) {
    if (window.location.href.indexOf(parameter) > -1) {
        return decodeURI(getUrlVars()[parameter]);
    } else {
        return "";
    }
}

document.getElementById("text_input").value = getUrlParam("text");

function firstLetterIsUpperCase(str) {
    if(str.length === 0) return false;
    const firstLetter = str.substr(0, 1);
    return firstLetter.toLocaleUpperCase() === firstLetter;
}

function stringIsUpperCase(str) {
    return str.toUpperCase() === str;
}

function setFirstLetterUpperCase(str) {
    if(str.length === 0) return str;
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function replaceText(input) {
    if(input === "") return "";

    const text = input.split(/[^a-zA-ZÄÖÜäöü]+/); // everything that isn't word
    const not_text = input.split(/[a-zA-ZÄÖÜäöü]+/);  //everything that is word


    const starts_with_text = text[0].length > 0;

    function getNextTextPart(index, replacedText) {
        let str = "";
        if(starts_with_text) {
            str += replacedText;
            if(index + 1 < not_text.length) str += not_text[index + 1];
        } else {
            if(index - 1 < not_text.length) str += not_text[index - 1];
            str += replacedText;
        }
        return str;
    }

    let out = "";

    for (let i = starts_with_text ? 0 : 1; i < text.length; i++) {
        let replacement = words[text[i].toLocaleLowerCase()];
        if(replacement === undefined) {
            replacement = text[i];

            const e = text[i].toLocaleLowerCase().lastIndexOf('e');
            if(e > 0) {
                let replacement2 = words[text[i].substr(0, e).toLocaleLowerCase()];
                if(replacement2 === undefined) {
                    replacement2 = words[text[i].substr(0, e + 1).toLocaleLowerCase()];
                }
                if(replacement2 !== undefined) {
                    replacement = replacement2 + text[i].substr(e);
                }
            }
        }

        if(replacement !== text[i]) {
            if (stringIsUpperCase(text[i])) {
                replacement = replacement.toUpperCase();
            } else if (firstLetterIsUpperCase(text[i])) {
                replacement = setFirstLetterUpperCase(replacement);
            }
        }

        out += getNextTextPart(i, replacement);
    }

    return out;
}

function onSubmit() {
    if(words === undefined) {
        alert("Try again.");
        return;
    }
    const input = document.getElementById("text_input").value;
    if(input.length === 0) {
        alert("Type some text in.");
        return;
    }
    document.getElementById("output").textContent = replaceText(input);
}
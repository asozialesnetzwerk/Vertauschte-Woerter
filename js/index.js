let json  = {
    "aggressiv": "attraktiv",

    "amüsant": "relevant",
    "amüsanz": "relevanz",

    "ministerium": "mysterium",
    "ministerien": "mysterien",

    "bundestag": "schützenverein",

    "ironisch": "erotisch",
    "ironie": "erotik",
    "ironiker": "erotiker",

    "problem": "ekzem",

    "kritisch": "kryptisch",
    "kritik": "kryptik",

    "provozier": "produzier",

    "arbeitnehmer": "arbeitgeber",
};

let keys = Object.keys(json);
const words = json;
for (let i = 0; i < keys.length; i++) {
    words[json[keys[i]]] = keys[i]; //value as key with old key as new value
}
keys = Object.keys(words);


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
        let replacement = text[i].toLowerCase();

        for (let j = 0; j < keys.length; j++) {
            if(replacement.indexOf(keys[j]) !== -1) {
                replacement = replacement.replace(keys[j], words[keys[j]]);
                break;
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
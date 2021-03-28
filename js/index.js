let json  = {
    "aggressiv": "attraktiv",

    "amüsant": "relevant",
    "amüsanz": "relevanz",

    "ministerium": "mysterium",
    "ministerien": "mysterien",

    "bundestag": "schützenverein",

    "ironisch": "erotisch",
    "ironien": "erotiken",
    "ironie": "erotik",
    "ironiker": "erotiker",

    "problem": "ekzem",

    "kritisch": "kryptisch",
    "kritik": "kryptik",

    "provozier": "produzier",

    "arbeitnehmer": "arbeitgeber",
    "arbeitsnehmer": "arbeitsgeber"
};

let keys = Object.keys(json);
const words = json;
for (let i = 0; i < keys.length; i++) {
    words[json[keys[i]]] = keys[i]; //value as key with old key as new value
}
keys = Object.keys(words);
// sort from long to short to replace the longer once with higher priority
keys.sort((a,b) => b.length - a.length);

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

function isText(val) {
    if (typeof val !== "string") return false;
    if (val.length === 0) return false;
    return val.replace(noTextRegex, "").length === 0;
}

function arrIsEmpty(arr) {
    if (!Array.isArray(arr)) return true;
    if (arr.length === 0) return true;
    for (const arrElement of arr) {
        if (arrElement.length > 0) {
            return false;
        }
    }
    return true;
}

const noTextRegex = /[^a-zA-ZÄÖÜäöü]+/gm;
const textRegex = /[a-zA-ZÄÖÜäöü]+/gm;
function replaceText(input) {
    if(input.length === 0) return "";

    const text = input.split(noTextRegex); // everything that isn't word

    if (arrIsEmpty(text)) {
        return input;
    }

    const notText = input.split(textRegex);  //everything that is word

    let noTextIndex = 0;
    let textIndex = 0;
    let out = "";

    if (!isText(input[0])) { // if not starts with text
        out = notText[0];
        noTextIndex++;

        if (text[0].length === 0) {
            textIndex = 1;
        }
    }

    for (; textIndex < text.length; textIndex++) {
        if(text[textIndex].length > 0) {
            let replacement = text[textIndex].toLowerCase();
            let replaced = false;

            for (let j = 0; j < keys.length; j++) {
                if (replacement.indexOf(keys[j]) !== -1) {
                    replaced = true;
                    replacement = replacement.replace(keys[j], words[keys[j]]);
                    break;
                }
            }

            if(!replaced) {
                replacement = text[textIndex];
            } else if (replacement .length > 0) {
                if (text[textIndex].toUpperCase() === text[textIndex]) { //checks if string is uppercase
                    replacement = replacement.toUpperCase();
                } else {
                    const firstLetterOfText = text[textIndex].charAt(0);
                    if (firstLetterOfText.toUpperCase() === firstLetterOfText) { //checks if first letter is uppercase
                        replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1); //sets first letter uppercase, to match case with the original word
                    }
                }
            }

            out += replacement;
        }
        if (noTextIndex < notText.length) {
            out += notText[noTextIndex];
            noTextIndex += 1;
        }
    }
    for (; noTextIndex < notText.length; noTextIndex++) {
        out += notText[noTextIndex];
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

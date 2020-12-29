let json  = {
    "aggressiv": "attraktiv",
    "aggressive": "attractive",

    "amüsant": "relevant",
    "amüsanz": "relevanz",
    "amusing": "relevant",
    "amusement": "relevance",

    "ministerium": "mysterium",
    "ministerien": "mysterien",
    "ministry": "mystery",
    "ministries": "mystries",

    "bundestag": "schützenverein",
    "congress": "the nra",

    "ironisch": "erotisch",
    "ironie": "erotik",
    "ironiker": "erotiker",
    "ironic": "erotic",
    "irony": "erotica",
    "ironist": "eroticist",

    "problem": "ekzem",
    "problem": "eczema",

    "kritisch": "kryptisch",
    "kritik": "kryptik",
    "critical": "cryptic",
    "criticism": "cryptics",

    "provozier": "produzier",
    "provocate": "produce",

    "arbeitnehmer": "arbeitgeber",
    "employee": "employer",
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

function replaceText(input) {
    if(input.length === 0) return "";

    const text = input.split(/[^a-zA-ZÄÖÜäöü]+/); // everything that isn't word
    const notText = input.split(/[a-zA-ZÄÖÜäöü]+/);  //everything that is word


    const startsWithText = text[0].length > 0;

    function getNextTextPart(index, replacedText) {
        let str = "";
        if(startsWithText) {
            str += replacedText;
            if(index + 1 < notText.length) str += notText[index + 1];
        } else {
            if(index - 1 < notText.length) str += notText[index - 1];
            str += replacedText;
        }
        return str;
    }

    let out = "";
    for (let i = startsWithText ? 0 : 1; i < text.length; i++) {
        if(text[i].length > 0) {
            let replacement = text[i].toLowerCase();

            for (let j = 0; j < keys.length; j++) {
                if (replacement.indexOf(keys[j]) !== -1) {
                    replacement = replacement.replace(keys[j], words[keys[j]]);
                    break;
                }
            }

            if (replacement !== text[i] && replacement .length > 0) {
                if (text[i].toUpperCase() === text[i]) { //checks if string is uppercase
                    replacement = replacement.toUpperCase();
                } else {
                    const firstLetterOfText = text[i].charAt(0); //first letter
                    if (firstLetterOfText.toUpperCase() === firstLetterOfText) { //checks if first letter is uppercase
                        replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1); //sets first letter uppercase, to match case with the original word
                    }
                }
            }

            out += getNextTextPart(i, replacement);
        }
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

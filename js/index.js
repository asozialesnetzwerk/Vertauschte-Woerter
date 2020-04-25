var words = undefined;

function setWords(json) {
    words = json;
}

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

fetch("res/words.json")
    .then(function(response) {
            response.json().then(setWords)
        }, function (error) {
            error.text().then(console.log)
        }
    );

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

    const text = input.split(/[^a-zA-Z_0-9_Ä_Ö_Ü_ä_ö_ü]+/); // everything that isn't [a-zA-Z_0-9ÄÖÜäöü]
    const not_text = input.split(/[a-zA-Z_0-9_Ä_Ö_Ü_ä_ö_ü]+/);  //everything that is [a-zA-Z_0-9ÄÖÜäöü]

    console.log(text.toString());
    console.log(not_text.toString());


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

    for (var i = starts_with_text ? 0 : 1; i < text.length; i++) {
        let replacement = words[text[i].toLocaleLowerCase()];
        console.log(text[i].toLocaleLowerCase());
        if(replacement === undefined) {
            replacement = text[i];

            const e = text[i].toLocaleLowerCase().lastIndexOf('e');
            if(e > 0) {
                let replacement2 = words[text[i].substr(0, e).toLocaleLowerCase()];
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

    document.getElementById("output").textContent = out;
}

//Es ist relevant, wie AMÜSANT manche Leute Aggressivität finden.



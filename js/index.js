var words = undefined;

function setWords(json) {
    words = json;
}

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

    const text = input.split(/[^a-zA-Z_0-9]+/); // everything that isn't [a-zA-Z_0-9]
    const not_text = input.split(/[a-zA-Z_0-9]+/);  //everything that is [a-zA-Z_0-9]

    console.log(text.toString());
    console.log(not_text.toString());


    const starts_with_text = input.indexOf(text[0]) === 0;

    function getNextTextPart(index, replacedText) {
        let str = "";
        if(starts_with_text) {
            str += replacedText;
            if(index + 1 < not_text.length) str += not_text[index + 1];
        } else {
            if(index < not_text.length) str += not_text[index];
            str += replacedText;
        }
        return str;
    }

    let out = "";

    for (var i = 0; i < text.length; i++) {
        let replacement = words[text[i].toLowerCase()];
        if(replacement === undefined) {
            replacement = text[i];

            const e = text[i].toLowerCase().lastIndexOf('e');
            if(e > 0) {
                let replacement2 = words[text[i].substr(0, e).toLowerCase()];
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

let vocabulary = {};
let stopWords = [];
let fixedTerms = ["halal", "haram", "sharia", "jihad", "zakat", "hajj", "umrah", "Allah", "Jesus", "Buddha", "nirvana", "dharma", "Tao", "karma", "sin", "salvation", "amen", "hallelujah", "om", "mantra", "Torah", "Gospel", "Quran", "Bible", "Talmud", "Scriptures", "Ten Commandments", "Five Pillars of Islam", "Eightfold Path", "sacrament", "worship", "prayer", "meditation", "faith", "hope", "charity", "forgiveness", "heaven", "hell", "soul", "spirit", "God", "creator", "divine", "sacred", "holy", "prophet", "apostle", "saint", "angel", "demon", "Satan", "evil", "good", "righteousness", "justice", "mercy", "compassion", "love", "peace"];


fetch('https://zayuvalya.github.io/Library/Languages/eng_synonyms.json')
    .then(response => response.json())
    .then(data => {
        vocabulary = data;
        console.log("Vocabulary loaded successfully.");
    })
    .catch(error => console.error("Error loading vocabulary:", error));


fetch('stop_words.json')
    .then(response => response.json())
    .then(data => {
        stopWords = data;
        console.log("Stop words loaded successfully.");
    })
    .catch(error => console.error("Error loading stop words:", error));


function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function countSentences(text) {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}

function isStopWord(word) {
    return stopWords.includes(word.toLowerCase());
}

function isProperNoun(word) {
    return /^[A-Z][a-z]*$/.test(word); // Capitalized words are treated as proper nouns
}

function isFixedTerm(word) {
    return fixedTerms.includes(word.toLowerCase());
}

function replaceWord(word, previousWord, nextWord) {
    const lowerCaseWord = word.toLowerCase();


    if (isStopWord(lowerCaseWord) || isProperNoun(word) || isFixedTerm(lowerCaseWord)) {
        return word;
    }


    if (["and", "or", "but", "in", "on", "at", "with"].includes(lowerCaseWord)) {
        return word;
    }


    if (vocabulary[lowerCaseWord]) {
        const synonyms = vocabulary[lowerCaseWord];
        return synonyms[Math.floor(Math.random() * synonyms.length)]; // Pick a random synonym
    }

    return word;
}

function paraphraseText(inputText) {
    const words = inputText.split(/(\b|\s+|[.,!?]+)/);
    let paraphrasedWords = [];

    words.forEach((word, index) => {
        if (/\w+/.test(word)) {
            const previousWord = words[index - 1] || "";
            const nextWord = words[index + 1] || "";
            const newWord = replaceWord(word, previousWord, nextWord);

            if (newWord !== word) {
                paraphrasedWords.push(`<span class='highlight'>${newWord}</span>`); 
            } else {
                paraphrasedWords.push(word);
            }
        } else {
            paraphrasedWords.push(word); 
        }
    });

    return paraphrasedWords.join('');
}

// Event Listeners
const inputTextElement = document.getElementById('inputText');
const outputPreviewElement = document.getElementById('outputPreview');
const outputTextElement = document.getElementById('outputText');
const wordCountElement = document.getElementById('wordCount');
const sentenceCountElement = document.getElementById('sentenceCount');

inputTextElement.addEventListener('input', () => {
    const inputText = inputTextElement.value;
    wordCountElement.textContent = countWords(inputText);
    sentenceCountElement.textContent = countSentences(inputText);
});

const paraphraseButton = document.getElementById('paraphraseBtn');
paraphraseButton.addEventListener('click', () => {
    const inputText = inputTextElement.value;
    const paraphrasedHtml = paraphraseText(inputText);

    outputPreviewElement.innerHTML = paraphrasedHtml;

    const plainParaphrasedText = outputPreviewElement.innerText;
    outputTextElement.value = plainParaphrasedText;
});

const copyButton = document.getElementById('copyBtn');
copyButton.addEventListener('click', () => {
    outputTextElement.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
});

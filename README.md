# ZAYUVALYA - AI Humanizer

ZAYUVALYA - AI Humanizer is a free, open-source tool designed to help users rephrase and humanize text effortlessly. Built with simplicity and efficiency in mind, this tool ensures that your text is transformed into a more natural and human-like form while preserving its original meaning. ZAYUVALYA - AI Humanizer operates entirely in the browser, making it accessible, private, and 100% free to use without any login required.

---

## Key Features

1. **Context-Aware Paraphrasing**: 
   - Uses advanced logic to replace words with contextually appropriate synonyms.
   - Identifies proper nouns and fixed terms to avoid altering essential information.

2. **Highlight Changes**: 
   - Words that are altered during the paraphrasing process are highlighted in the output for easy identification.

3. **Word and Sentence Counters**: 
   - Provides real-time tracking of word and sentence counts for input text.

4. **Responsiveness**: 
   - Fully responsive design optimized for desktop and mobile devices.

5. **Dark Theme Interface**: 
   - Elegant dark-themed UI with a minimalistic approach for a better user experience.

6. **Open Source**: 
   - Encourages contributions from the community to improve and expand the project.

---

## How It Works (Developer Overview)

This section explains the internal logic, algorithms, and structure of ZAYUVALYA - AI Humanizer for developers. The primary components include the vocabulary dataset, JSON structure, stop words handling, proper noun detection, and the paraphrasing algorithm.

### 1. Vocabulary Dataset
The vocabulary is stored in a JSON file (`eng_synonyms.json`) with the following structure:

```json
{
    "word": ["synonym1", "synonym2", "synonym3"]
}
```
- **Key**: The word to be replaced.
- **Value**: An array of synonyms for the word.

Example:
```json
{
    "happy": ["joyful", "content", "pleased"],
    "run": ["jog", "sprint", "dash"]
}
```

#### Source of Vocabulary Dataset:
- **Current Hosted File**: [https://zayuvalya.github.io/Library/Languages/eng_synonyms.json](https://zayuvalya.github.io/Library/Languages/eng_synonyms.json)
- **Original Source**: [Kaggle Dataset - English Synonyms JSON Thesaurus](https://www.kaggle.com/datasets/behcetsenturk/englishengen-synonyms-json-thesaurus)

### 2. Stop Words Handling
Stop words are common words that should not be altered, such as "the", "is", and "at". These are stored in a separate JSON file (`stop_words.json`) and loaded into memory during initialization.

Example structure of `stop_words.json`:
```json
["the", "is", "and", "at", "on", "in"]
```

The function `isStopWord()` checks if a word is in the stop words list:
```javascript
function isStopWord(word) {
    return stopWords.includes(word.toLowerCase());
}
```

### 3. Fixed Terms Detection
Certain terms like "halal", "haram", or specific names should not be modified. These are stored in an array within the script itself:
```javascript
const fixedTerms = ["halal", "haram", "sharia", "jihad", "zakat", "hajj", "umrah", "Allah", "Jesus", "Buddha", "nirvana", "dharma", "Tao", "karma", "sin", "salvation", "amen", "hallelujah", "om", "mantra", "Torah", "Gospel", "Quran", "Bible", "Talmud", "Scriptures", "Ten Commandments", "Five Pillars of Islam", "Eightfold Path", "sacrament", "worship", "prayer", "meditation", "faith", "hope", "charity", "forgiveness", "heaven", "hell", "soul", "spirit", "God", "creator", "divine", "sacred", "holy", "prophet", "apostle", "saint", "angel", "demon", "Satan", "evil", "good", "righteousness", "justice", "mercy", "compassion", "love", "peace"];

function isFixedTerm(word) {
    return fixedTerms.includes(word.toLowerCase());
}
```

### 4. Proper Noun Detection
Proper nouns (e.g., "New York", "Tesla") are identified using regex patterns:
```javascript
function isProperNoun(word) {
    return /^[A-Z][a-z]*$/.test(word);
}
```

This ensures that capitalized words remain untouched during the paraphrasing process.

### 5. Paraphrasing Algorithm
The paraphrasing process involves:
1. Splitting the input text into words and punctuation using `\b` (word boundaries).
2. Iterating over each token and determining whether it should be replaced.
3. Highlighting replaced words and keeping unchanged words as they are.

Key function: `replaceWord()`
```javascript
function replaceWord(word) {
    const lowerCaseWord = word.toLowerCase();

    if (isStopWord(lowerCaseWord) || isFixedTerm(lowerCaseWord) || isProperNoun(word)) {
        return word; // No replacement
    }

    if (vocabulary[lowerCaseWord]) {
        const synonyms = vocabulary[lowerCaseWord];
        return synonyms[Math.floor(Math.random() * synonyms.length)]; // Random synonym
    }

    return word; // No synonym found
}
```

Paraphrasing execution:
```javascript
function paraphraseText(inputText) {
    const words = inputText.split(/(\b|\s+|[.,!?]+)/); // Split text
    let paraphrasedWords = [];

    words.forEach(word => {
        if (/\w+/.test(word)) { // Match words only
            const newWord = replaceWord(word);
            if (newWord !== word) {
                paraphrasedWords.push(`<span class='highlight'>${newWord}</span>`); // Highlight
            } else {
                paraphrasedWords.push(word);
            }
        } else {
            paraphrasedWords.push(word); // Keep punctuation
        }
    });

    return paraphrasedWords.join('');
}
```

### 6. Word and Sentence Counters
Two utility functions track the number of words and sentences:
```javascript
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function countSentences(text) {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}
```

### 7. Highlighting Changes
The `highlight` class is applied to replaced words:
```css
.highlight {
    background-color: #ECDFCC;
    color: #1E201E;
    font-weight: bold;
    padding: 2px 4px;
    border-radius: 3px;
}
```

---

## Project Structure

- **index.html**: Contains the layout and structure of the web application.
- **styles.css**: Provides styling for the dark theme and responsive design.
- **script.js**: Implements the paraphrasing logic and interactive functionality.
- **eng_synonyms.json**: Stores the vocabulary dataset for synonym replacement.
- **stop_words.json**: Contains the list of stop words.

---

## Contribution
We welcome contributions from the community! To contribute:
1. Fork the repository.
2. Create a branch for your changes.
3. Submit a pull request detailing your updates.

---

## Open Source and Licensing
This project is licensed under the MIT License, ensuring it remains free and open for everyone to use and improve.

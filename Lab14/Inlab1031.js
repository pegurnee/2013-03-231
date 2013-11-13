var theFlashcards = new Array();
var numCorrect;
var cardNum;

var words = [
				'mouse',
				'fungus',
				'die',
				'goose',
				'mongoose',
				'kudos',
				'memo',
				'seraph',
				'appendix',
				'diagnosis',
				'Bharat'
				];
var plural = [
				'mice',
				'fungi',
				'dice',
				'geese',
				'mongooses',
				'kudos',
				'memos',
				'seraphim',
				'appendices',
				'diagnoses',
				'Bharats'
				];

function flashcard(word, plural) {
	this.word = word;
	this.plural = plural;
	
	this.toString = toString;
	this.equals = equals;
	this.getWord = getWord;
	this.getPlural = getPlural;
	this.setWord = setPlural;
	this.setPlural = setPlural;
		
	
	function getWord() {
		return this.word;
	}
	function getPlural() {
		return this.plural;
	}
	function setWord(word) {
		this.word = word;
	}
	function setPlural(plural) {
		this.plural = plural;
	}
	
	function toString() {
		return 'Singular: "' + this.word + '"\nPlural: "' + this.plural + '"';
	}
	function equals(otherFlashcard) {
		return (this.word == otherFlashcard.word) && (this.plural == otherFlashcard.plural);
	}
}
function initCards() {
	for (var i = 0; i < words.length; i++) {
		addCard(words[i], plural[i]);
	}
	newGame();	
}
function loadNext() {
	document.getElementById('card').innerHTML = theFlashcards[cardNum].getWord();
}
function newGame() {
	numCorrect = 0;
	cardNum = 0;
	document.getElementById('btns').hidden = false;
	loadNext();
}
function guessLoaded() {
	guess(theFlashcards[cardNum]);	
	cardNum++;
	if (cardNum == theFlashcards.length) {
		alert('Game over!');
		alert('You got ' + numCorrect + ' correct!\nThat\'s a ' + ((cardNum / theFlashcards.length) * 100) + '% success rate!');
		if (confirm('Would you like to play again?')) {
			newGame();
		} else {
			alert('Okay, maybe next time.');
			document.getElementById('btns').hidden = true;
		}
	}
	loadNext();
}
function guess(flashcard) {
	var guess = prompt('What is the plural form of ' + flashcard.getWord() + '?', 'Man, I don\'t know that stuff!');
	if (guess == flashcard.getPlural()) {
		numCorrect++;
		alert('Correct!');
	} else {
		alert('Incorrect!\nThe English language is lost on you!');
	}
}
function addCard(word, plural) {
	theFlashcards.push(new flashcard(word, plural));
}
function createCard() {
	addCard(
		prompt('Enter singular form of the word:'),
		prompt('Enter plural form of the word:')
		);
}
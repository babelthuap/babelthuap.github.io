// HANGMAN
// Nicholas Neumann-Chun, last edited 27 Sep 2015

// these are the 200 longest words in Ogden's Basic English Word List (1930)
var poolOfWords = ['account','across','addition','adjustment','advertisement','against','agreement','amusement','apparatus','approval','argument','attempt','attention','attraction','authority','automatic','balance','beautiful','because','before','behavior','between','boiling','bright','brother','building','business','carriage','certain','chance','chemical','comfort','committee','common','company','comparison','competition','complete','complex','condition','connection','conscious','control','country','current','curtain','cushion','daughter','decision','delicate','dependent','design','destruction','development','different','digestion','direction','discovery','discussion','disease','disgust','distance','distribution','division','driving','education','elastic','electric','example','exchange','existence','expansion','experience','expert','feather','feeling','fertile','fiction','flower','foolish','forward','frequent','general','government','hanging','harbour','harmony','healthy','hearing','history','hospital','humour','important','impulse','increase','industry','instrument','insurance','interest','invention','journey','knowledge','language','learning','leather','library','living','machine','manager','married','material','measure','medical','meeting','military','morning','motion','mountain','natural','necessary','observation','office','operation','opinion','opposite','organization','ornament','parallel','payment','physical','picture','pleasure','pocket','political','position','possible','present','private','probable','process','produce','profit','property','protest','punishment','purpose','quality','question','reaction','reading','receipt','regular','relation','religion','representative','request','respect','responsible','school','science','scissors','secretary','selection','separate','serious','servant','sneeze','society','special','statement','station','stocking','stomach','straight','strange','stretch','structure','substance','suggestion','support','surprise','teaching','tendency','thought','through','through','thunder','together','tomorrow','transport','trouble','trousers','umbrella','violent','waiting','weather','whistle','writing','yellow','yesterday'];

// global variables
var maxLives       = 7;        // max number of lives
var lives          = maxLives; // current number of lives
var word           = "";       // the mystery word
var unknownLetters = 0;        // used for detecting a win
var gameInProgress = false;    // make game react only when it's supposed to

// choose a random word for the player to guess
var chooseWord = function(){
	word = poolOfWords[Math.floor(Math.random() * poolOfWords.length)];
	unknownLetters = word.length;
};

// add the correct number of blanks for the mystery word
var addBlanks = function(){
	// first erase any leftover marks
	$('#word').text('');
	for (var i = 0; i < word.length; ++i) {
		$('#word').append('<span id="' + i + '">_</span> ');
	};
};

// draw the hangman
var draw = function(){
	if (lives === maxLives) {
		$('.hangman').addClass('invisible');
		$('#gibbet').velocity({rotateZ: "180deg"});
		$('#gibbet').velocity({rotateZ: "0deg"});
	} else {
		var whichPart = maxLives - lives - 1;
		$($('.hangman')[whichPart]).removeClass('invisible');
	}
}

// handle the "restart" button
jQuery(document).ready(function(){
	$('#restart').on('click', function(){
		// reset the alphabet
		$('.bg-primary').removeClass('bg-primary');

		// pick a word, any word
		chooseWord();
		addBlanks();

		// reset lives
		lives = maxLives;
		$('#lives').text(lives);
		draw();

		gameInProgress = true;
	});
});

// main game
jQuery(document).ready(function(){
	// first, add the alphabet to the page
	// each letter is of the form <span id="A" class="text-muted"> A </span>
	for (var i = 65; i <= 90; ++i) {
		var letter = String.fromCharCode(i);
		var span = '<span id="' + letter + '" class="text-muted">&nbsp;' +
		           letter + '&nbsp;</span>';
		$('#letters').append(span);
	};

	// set up the rest of the page
	$('#restart').trigger('click');

	// handle key presses
	$(this).on('keydown',function(e){
		if (e.keyCode >= 65 && e.keyCode <= 90 && gameInProgress) {
			// the letter that was pressed
			var key = String.fromCharCode(e.keyCode);

			// only act if the letter hasn't already been guessed
			if ($('#' + key).hasClass('bg-primary')) {
				// blink screen
				$('.container-fluid').velocity("fadeOut", {duration: 75});
				$('.container-fluid').velocity("fadeIn", {duration: 75});
			} else {
				// highlight the letter
				$('#' + key).addClass('bg-primary');

				// check for matches in the mystery word
				var re = new RegExp(key, "gi");
				if (word.match(re) !== null) {
					// reveal the matched letters
					while ((match = re.exec(word)) !== null) {
    					var i = match.index;
    					$('#' + i).text(key);
    					--unknownLetters;
					};

					// handle a win
					if (unknownLetters === 0) {
						gameInProgress = false;
						$('#gibbet').velocity({translateY: "50px"});
						$('#gibbet').velocity({translateY: "-50px"});
						$('#gibbet').velocity({translateY: "0px"});
					};
				} else {
					// subtract a life
					--lives;
					$('#lives').text(lives);

					// draw more of the hangman
					draw();

					// handle a loss
					if (lives === 0) {
						gameInProgress = false;
						$('#word').text('YOU DEAD');
						$('#gibbet').velocity({translateX: "50px"});
						$('#gibbet').velocity({translateX: "-50px"});
						$('#gibbet').velocity({translateX: "0px"});
					};
				};
			};
		} else if (e.keyCode === 13) {
			// restart when return is pressed
			$('#restart').trigger('click');
		};
	});
});

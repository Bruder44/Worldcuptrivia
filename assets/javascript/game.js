$(document).ready(function () {

	
	
	$('#image').css('display', 'none');
	
	var timerNumber = 16;
	timerNumber --;
	
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	
	var answers = [];
	var currentQuestion = 0;

	var trivia = [
		q1 = {
			question: 'Which player holds the record for most career goals in the World Cup?',
			correct: 1,
			multChoice: ['Ronaldo(Brazil)', 'Miroslav Klose(Germany)', 'Zinedene Zidane(France)', 'Jay-Jay Okocha(Nigeria)'],
		},
		q2 = {
			question: 'Which player holds the record for most career World Cups won with their country?',
			correct: 0,
			multChoice: ['Pele(Brazil)', 'Diego Maradona(Argentia)', 'Roberto Baggio(Italy)', 'Lothar Matthaeus(Germany)'],
		},
		q3 = {
			question: 'Which country has won the most World Cups?',
			correct: 2,
			multChoice: ['Germany', 'Italy', 'Brazil', 'Argentina'],
		},
		q4 = {
			question: 'Who scored the game winning goal for Germany against Argentina in the 2014 World Cup Final?',
			correct: 1,
			multChoice: ['Andre Schurrle', 'Mario Gotze', 'Miroslav Klose', 'Toni Kroos'],
		},
		q5 = {
			question: 'Who was sent off for headbutting Italian player Marco Materazzi in the 2006 World Cup Final?',
			correct: 1,
			multChoice: ['Diego Maradona(Argentina)', 'Zinedine Zidane(France)', 'Jay-Jay Okocha(Nigeria)', 'Gary Lineker(England)'],
		},
		q6 = {
			question: 'What year did France win the World Cup?',
			correct: 3,
			multChoice: ['1994', '1986', '2002', '1998'],
		},
		q7 = {
			question: 'What year did England win the World Cup?',
			correct: 1,
			multChoice: ['1962', '1966', '2002', '1994'],
		},
		q8 = {
			question: 'What player won the golden ball award in 2010 for best player of the Tournament:',
			correct: 2,
			multChoice: ['David Villa(Spain)', 'Thiery Henry(France)', 'Diego Forlan(Uruguay)', 'Wayne Rooney(England)'],
		}
		


	];

	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};

	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	var questionWrite = function () {
		if (currentQuestion <= 7) { 
			$('#questionDiv').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].multChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

	
	var answerClear = function () {
		
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	
	var start = function() {
		counter = setInterval(countDown, 1000);
		$('#startTitle').empty();
		hide('#start');
		questionWrite();	
	};

	$('#scoreDiv').empty();
		answerClear();
	

	var countDown = function () {
		timerNumber --;
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');
		if (timerNumber == 0) {
			gameOver();
		}
	};

	var stop = function () {
		clearInterval(counter);
	};

	var reset = function () {
		stop();
		timerNumber = 16;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
		stop();
		clearScreen();
		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
	};

	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 16;
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 3 * 1000);
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			timerNumber = 16;
			$('#questionDiv').empty();
			answerClear();
			questionWrite();
		}
	});

	$('#start').on("click", start);
	$('#reset').on('click', reset);
})
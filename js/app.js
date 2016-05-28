$(document).ready(function() {
$('h1').hide().delay(500).fadeIn('slow');
$('.status').hide().delay(700).fadeIn('slow');
generateQuestions();
generateAnswers();
submit();
restart();
}); 

var currentQuestion = 0;
var selectedAnswer = "";
var score = 0;
var questions = new Array();
var counter = "";
var timeRemaining = "";


	/* click button to begin */
	$(".startButton").on("click",function(){

		/* one for timeUp counter, the other for counter h2. Match both. */
		timeRemaining = 60;
		counter = setTimeout(function(){timeUp()},60000);
		/* above code runs timeUp function at 45 seconds */

		/* every second, run countDownDisplay function */
	    secondsInterval = setInterval(countDownDisplay,1000);

	    /* if time remaining is greater than 0, decrement time remaining, push to html. */
	    function countDownDisplay (){
	    	if (timeRemaining>0){
			  	timeRemaining--;
			  	$(".timeDisplay").html(timeRemaining + " Seconds Remaining.");
					
			    }}

		function timeUp(){
			$('#heading').prepend("<h4>Times Up!  You scored" + " " + score + " " + "out of 10.  Correct Answers: 1. E 2. C 3. B 4. E 5. C 6. B 7. E 8. B 9. D 10. B <br>").hide().fadeIn('400');
				
		};

	});

//list of questions
function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions [0] = new Question ("Where do pugs come from?",["England", "U.S.A.", "France", "Tibet", "China"], 4);
questions [1] = new Question ("On average, how big do pugs get?",["5 to 10lbs", "10 to 15lbs", "15 to 20lbs", "20 to 25lbs", "25 to 30lbs"], 2);
questions [2] = new Question ("Where did the word pug come from?",["From the word Pugilist", "A term from a breed of monkies", "From the term Pug Life", "From Pugasaur", "From Doug the Pug"], 1);
questions [3] = new Question ("Which one of these movies did not have a pug as the main character?",["Men in Black", "Milo and Otis", "Men in Black 2", "Men in Black 3", "101 Dalmatian"], 4);
questions [4] = new Question ("Which king in Europe got his life saved by a pug?",["King in England", "King in Scottland", "King in Holland", "King in Ireland", "King in Iceland"], 2);
questions [5] = new Question ("Besides China, pugs are the official dogs of which royalty in 1688?",["France", "Dutch", "England", "Thailand", "Portugal"], 1);
questions [6] = new Question ("How many pugs were registered in the U.S. in 1920?",["115", "50" , "15", "150", "5"], 4);
questions [7] = new Question ("Pugs are known for their ___________",["Bark", "Head tilt", "Intelligence", "Snoring", "Poo"], 1);
questions [8] = new Question ("What term did the Chinese used to call pugs 2000 years ago?",["Pugs", "Cat dogs", "Monkey dogs", "Fu", "Doggy"], 3);
questions [9] = new Question ("How did pugs loose their popularity in the 15th century?",["Because of English bull dogs", "Because of cats", "Because of French bull dogs", "Because of pittbulls", "Because of Tibetan Mastiffs"], 1);


//questions appear
function generateQuestions() {
var q = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q + '</h4>').hide().delay(1200).fadeIn('slow');
}

//answers appear
function generateAnswers(){
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
}
$("#answers").append(write).hide().delay(1200).fadeIn('slow');
}

//radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
}

//evaluate answer 
function evaluation() {
var selected = $("input[type='radio'][name='radio']:checked");
	if (selected.length >= 0) {
    	selectedAnswer = selected.val();
	}
	if (selectedAnswer == questions [currentQuestion].correct) {
		$('#correct').append("<p>Correct!</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		$('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		playerScore();
		currentQuestion++;
	}
	
	else {
		$('#incorrect').append("<p>Incorrect.</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		$('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		currentQuestion++;
	}
}

//next question 
function nextQuestion() {
 	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 10) {
	complete();
	restart();
	return;
	}
else {
	questionNumber();
	generateQuestions();
	generateAnswers();
	submit();
	}
});

}


//set score
function playerScore() {
	$('#score p').remove();
	score++;
	$('#score').append(" " + '<p>' + score + '</p>');

}

//question marker
function questionNumber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/10</p>');
}

//final tally
function complete() {
	$('.status').hide();
	$('#heading').append("<h4>You scored" + " " + score + " " + "out of 10 <br>" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
	$('.restart').addClass('quiz-end');
}

//restart button
function restart() {
	$('.restart').click(function() {
		window.location.reload(true);	
	});
}
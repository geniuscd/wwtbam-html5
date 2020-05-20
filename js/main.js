$(document).ready(function(){

	var question_container = $("#question p");
	var all_answers = $(".answer")
	var answer_1 = $("#answers .a1");
	var answer_2 = $("#answers .a2");
	var answer_3 = $("#answers .a3");
	var answer_4 = $("#answers .a4");
	var erase = $("#help .erase img");
	var erase_toggle = false;
	var friends = $("#help .friend img");
	var friends_toggle = false;
	var phone = $("#help .phone img");
	var phone_toggle = false;
	var audio = null;

	// game variables
	var isSelected = false;
	var selected_answer = null;
	var answer_index = null;
	var current_question_index = 0;
	drawQuestion(questions[current_question_index]);

	function drawAnswers (answers) {
		answer_1.html(answers[0].answer);
		answer_2.html(answers[1].answer);
		answer_3.html(answers[2].answer);
		answer_4.html(answers[3].answer);
	}

	function drawQuestion (question) {
		question_container.html(question.question);
		drawAnswers (question.answers);
	}

	function resetAudio (audio) {
		if(audio != null){
			audio.pause();
			audio = null;
		}
	}

	function resetVariables() {
		isSelected = false;
		selected_answer = null;
		answer_index = null;
		resetAudio(audio);
	}


	function playAudio(file_name) {
		resetAudio(audio);

		audio = new Audio("./sounds/" + file_name);
		audio.play();
	}

	// controles
	$( "body" ).keyup(function(e ) {
		all_answers.removeClass('selected correct');
		switch (e.keyCode) {
			case 49: // 1
				answer_1.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[0]};
				answer_index = 0;	

				playAudio("ata_start.mp3");

			break;

			case 50: // 2
				answer_2.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[1]};
				answer_index = 1;
			break;

			case 51: // 3
				answer_3.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[2]};
				answer_index = 2;
			break;

			case 52: // 4
				answer_4.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[3]};
				answer_index = 3;
			break;

			case 81: // q // display answer
				if(isSelected) {
					for(var index in questions[current_question_index].answers){
						const answer_row = questions[current_question_index].answers[index];
						if(answer_row.correct) {
							switch(index){
								case "0": answer_1.addClass('correct'); break;
								case "1": answer_2.addClass('correct'); break;
								case "2": answer_3.addClass('correct'); break;
								case "3": answer_4.addClass('correct'); break;
							}
						}
					}
				}
			break;

			case 39: // right Arrow // next question
				resetVariables();
				if(current_question_index < questions.length-1){
					current_question_index += 1;
					drawQuestion(questions[current_question_index]);
				}
			break;

			case 37: // left Arrow // previous question
				resetVariables();
				if(current_question_index > 0) {
					current_question_index -= 1;
					drawQuestion(questions[current_question_index]);
				}
			break;

			case 73: // i // phone
				erase_toggle =! erase_toggle;
				if(erase_toggle){
					erase.attr('src','./images/5050_yellow.png');
					playAudio('lifeline_1_on.mp3');
				}
				else
					erase.attr('src','./images/5050.png');

			break;

			case 79: // i // phone
				phone_toggle =! phone_toggle;
				if(phone_toggle){
					phone.attr('src','./images/paf_yellow.png');
					playAudio('lifeline_2_on.mp3');
				}
				else
					phone.attr('src','./images/paf.png');
			break;

			case 80: // p // friends
				friends_toggle =! friends_toggle;
				if(friends_toggle){
					friends.attr('src','./images/ata_yellow.png');
					playAudio('lifeline_3_on.mp3');
				}
				else
					friends.attr('src','./images/ata.png');
			break;

		}
		
	});


});
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
	var hello_container = $(".hello");

	// game variables
	var isSelected = false;
	var selected_answer = null;
	var answer_index = null;
	var current_question_index = 0;
	drawQuestion(questions[current_question_index]);
	var display_hello = true;

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
		answer_1.css('opacity', 1);
		answer_2.css('opacity', 1);
		answer_3.css('opacity', 1);
		answer_4.css('opacity', 1);
		resetAudio(audio);
	}


	function playAudio(file_name) {
		resetAudio(audio);

		audio = new Audio("./sounds/" + file_name);
		audio.play();
	}

	function updateHelloVisibility (bool) {
		hello_container.css('opacity', bool ? 1 : 0);
	}

	all_answers.removeClass('selected correct');

	// controles
	$( "body" ).keyup(function(e ) {
		switch (e.keyCode) {
			case 49: // 1
				all_answers.removeClass('selected correct');
				answer_1.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[0]};
				answer_index = 0;	

				// playAudio("ata_start.mp3");

			break;

			case 50: // 2
				all_answers.removeClass('selected correct');
				answer_2.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[1]};
				answer_index = 1;
			break;

			case 51: // 3
				all_answers.removeClass('selected correct');
				answer_3.addClass('selected');
				isSelected = true;
				selected_answer = {...questions[current_question_index].answers[2]};
				answer_index = 2;
			break;

			case 52: // 4
				all_answers.removeClass('selected correct');
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

							// play the loose or win sound
							if(answer_index == index)
								playAudio("q1_to_q4_correct.mp3");
							else
								playAudio("q1_to_q5_lose.mp3");


						}
					}
				}
			break;

			case 39: // right Arrow // next question
				all_answers.removeClass('selected correct');
				resetVariables();
				if(current_question_index < questions.length-1){
					current_question_index += 1;
					drawQuestion(questions[current_question_index]);
				}
				playAudio("lights_down_3.mp3");
			break;

			case 37: // left Arrow // previous question
				all_answers.removeClass('selected correct');
				resetVariables();
				if(current_question_index > 0) {
					current_question_index -= 1;
					drawQuestion(questions[current_question_index]);
				}
				playAudio("lights_down_3.mp3");
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

			case 75 : //k 50:50 erase answers
				var available_to_delete = [];

				for(var index in questions[current_question_index].answers){
					const answer_row = questions[current_question_index].answers[index];
					if(!answer_row.correct)
						available_to_delete.push(index);
				}
				const shuffled = available_to_delete.sort(() => 0.5 - Math.random());
				let selected_anwers = shuffled.slice(0, 2);
				for (var index in selected_anwers) {

					switch(selected_anwers[index]){
						case "0": answer_1.css('opacity', 0); break;
						case "1": answer_2.css('opacity', 0); break;
						case "2": answer_3.css('opacity', 0); break;
						case "3": answer_4.css('opacity', 0); break;
					}
					
				}
				playAudio('fifty_fifty.mp3');

			break;

			case 76 : // L to play the sound of selected answer
				playAudio('final_answer_1.mp3');
			break;

			case 72 : // H to play the sound of Hello
				if(display_hello)
					playAudio('hello_long.mp3');

				setTimeout(function(){
					updateHelloVisibility(display_hello);
				},8000);

					display_hello = !display_hello;
			break; 

		}
		
	});


});
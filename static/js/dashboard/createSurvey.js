let totalQuestions = 1;
$(document).ready(function() {
    var questionTemplate = `
        <div class="question_<questionNumber>">
            <hr class="my-4">
            
            <div class="flex flex-wrap -mx-3 mb-2">

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_question_<questionNumber>_text">
                    Question
                  </label>
                  
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-question-id= "<questionNumber>" name="question_<questionNumber>_text" id="id_question_<questionNumber>_text" type="text">
                
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_question_<questionNumber>_type">
                    Type of the question
                  </label>

                  <div class="relative">

                    <select class="question-type-select block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-question-id= "<questionNumber>" name="question_<questionNumber>_type" id="id_question_<questionNumber>_type">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Select</option>
                    </select>

                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>

                  </div>
                  
                </div>

            </div>

            <div class="p-4 hidden" id="question_<questionNumber>_choices_container">
                <h4 class="text-gray-700 text-lg font-bold mb-2">Questions:</h4>
                <div id="question_<questionNumber>_choices" class="p-4">
                    <div class="flex flex-wrap -mx-3 mb-2" id="question_<questionNumber>_choice_1">

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-question-id= "<questionNumber>" data-choice-id="1" name="question_<questionNumber>_choice_1_text" id="id_question_<questionNumber>_choice_1_text" type="text" placeholder="Choice 1">
            
                        </div>
            
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2" id="question_<questionNumber>_choice_2">

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-question-id= "<questionNumber>" data-choice-id="2" name="question_<questionNumber>_choice_2_text" id="id_question_<questionNumber>_choice_2_text" type="text" placeholder="Choice 1">
            
                        </div>
                                
                    </div>
                </div>

                <p id="add_question_<questionNumber>_choice_button" data-question-id="<questionNumber>" class="add-choice-button text-blue-500 cursor-pointer">Add choice</p>
            </div>

            <p id="delete_question_<questionNumber>_button" data-question-id="<questionNumber>" class="delete-question-button text-red-500 cursor-pointer">Delete question</p>
        </div>
    `;

    $("#add_question_button").click(function() {
        totalQuestions++;
        $("#questions").append(questionTemplate.replace(/<questionNumber>/g, totalQuestions));
    });
});

// show the choices container when the question type is radio or checkbox
$(document).on("change", ".question-type-select", function() {
    var questionId = $(this).data("question-id");
    var questionType = $(this).val();
    if (questionType == "radio" || questionType == "checkbox" || questionType == "select") {
        $(`#question_${questionId}_choices_container`).removeClass("hidden");
    } else {
        $(`#question_${questionId}_choices_container`).addClass("hidden");
    }
});

// add choice to the question
$(document).on("click", ".add-choice-button", function() {
    var questionId = $(this).data("question-id");
    var choiceTemplate = `
        <div class="flex flex-wrap -mx-3 mb-2" id="question_<questionNumber>_choice_<choiceNumber>">

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-question-id= "<questionNumber>" data-choice-id="<choiceNumber>" name="question_<questionNumber>_choice_<choiceNumber>_text" id="id_question_<questionNumber>_choice_<choiceNumber>_text" type="text" placeholder="Choice <choiceNumber>">

            </div>

            <p id="delete_question_<questionNumber>_choice_<choiceNumber>_button" data-question-id="<questionNumber>" data-choice-id="<choiceNumber>" class="delete-choice-button text-red-500 cursor-pointer">Delete choice</p>
        
        </div>
    `;
    var choiceNumber = $(`#question_${questionId}_choices`).children().length + 1;
    $(`#question_${questionId}_choices`).append(choiceTemplate.replace(/<questionNumber>/g, questionId).replace(/<choiceNumber>/g, choiceNumber));
});

// delete question
$(document).on("click", ".delete-question-button", function() {
    var questionId = $(this).data("question-id");
    $(`.question_${questionId}`).remove();
    totalQuestions--;

    // update the question numbers
    for (let i = questionId; i <= totalQuestions; i++) {

        $(`.question_${i + 1}`).addClass(`question_${i}`);
        $(`.question_${i + 1}`).removeClass(`question_${i + 1}`);
        $(`.question_${i}`).attr("id", `question_${i}`);
        $(`.question_${i}`).find(`#id_question_${i + 1}_text`).attr("name", `question_${i}_text`);
        $(`.question_${i}`).find(`#id_question_${i + 1}_text`).attr("data-question-id", i);
        $(`.question_${i}`).find(`#id_question_${i + 1}_text`).attr("id", `id_question_${i}_text`);
        $(`.question_${i}`).find(`label[for="id_question_${i + 1}_text"]`).attr("for", `id_question_${i}_text`);
        $(`.question_${i}`).find(`#id_question_${i + 1}_type`).attr("name", `question_${i}_type`);
        $(`.question_${i}`).find(`#id_question_${i + 1}_type`).attr("data-question-id", i);
        $(`.question_${i}`).find(`#id_question_${i + 1}_type`).attr("id", `id_question_${i}_type`);
        $(`.question_${i}`).find(`label[for="id_question_${i + 1}_type"]`).attr("for", `id_question_${i}_type`);
        $(`.question_${i}`).find(`#delete_question_${i + 1}_button`).attr("data-question-id", i);
        $(`.question_${i}`).find(`#delete_question_${i + 1}_button`).attr("id", `delete_question_${i}_button`);

        $(`.question_${i}`).find(`#question_${i + 1}_choices_container`).attr("id", `question_${i}_choices_container`);
        $(`.question_${i}`).find(`#question_${i + 1}_choices`).attr("id", `question_${i}_choices`);
        $(`.question_${i}`).find(`#add_question_${i + 1}_choice_button`).attr("data-question-id", i);
        $(`.question_${i}`).find(`#add_question_${i + 1}_choice_button`).attr("id", `add_question_${i}_choice_button`);

        // if choices container exists
        if ($(`#question_${i}_choices`).children().length) {
            totalChoices = $(`#question_${i}_choices`).children().length;
            for (let j = 1; j <= totalChoices; j++) {
                $(`.question_${i}`).find(`#question_${i + 1}_choice_${j}`).addClass(`question_${i}_choice_${j}`);
                $(`.question_${i}`).find(`#question_${i + 1}_choice_${j}`).removeClass(`question_${i + 1}_choice_${j}`);
                $(`.question_${i}`).find(`#question_${i + 1}_choice_${j}`).attr("id", `question_${i}_choice_${j}`);
                $(`.question_${i}`).find(`#id_question_${i + 1}_choice_${j}_text`).attr("name", `question_${i}_choice_${j}_text`);
                $(`.question_${i}`).find(`#id_question_${i + 1}_choice_${j}_text`).attr("data-question-id", i);
                $(`.question_${i}`).find(`#id_question_${i + 1}_choice_${j}_text`).attr("data-choice-id", j);
                $(`.question_${i}`).find(`#id_question_${i + 1}_choice_${j}_text`).attr("id", `id_question_${i}_choice_${j}_text`);
                $(`.question_${i}`).find(`#delete_question_${i + 1}_choice_${j}_button`).attr("data-question-id", i);
                $(`.question_${i}`).find(`#delete_question_${i + 1}_choice_${j}_button`).attr("data-choice-id", j);
                $(`.question_${i}`).find(`#delete_question_${i + 1}_choice_${j}_button`).attr("id", `delete_question_${i}_choice_${j}_button`);
                
            }
        }
    }
});

// delete choice
$(document).on("click", ".delete-choice-button", function() {
    var questionId = $(this).data("question-id");
    var choiceId = $(this).data("choice-id");
    $(`#question_${questionId}_choice_${choiceId}`).remove();

    // update the choice numbers
    totalChoices = $(`#question_${questionId}_choices`).children().length;
    for (let i = 1; i <= totalChoices; i++) {
        $(`#question_${questionId}_choice_${i + 1}`).addClass(`question_${questionId}_choice_${i}`);
        $(`#question_${questionId}_choice_${i + 1}`).removeClass(`question_${questionId}_choice_${i + 1}`);
        $(`#question_${questionId}_choice_${i + 1}`).attr("id", `question_${questionId}_choice_${i}`);
        $(`#question_${questionId}_choice_${i}`).find(`#id_question_${questionId}_choice_${i + 1}_text`).attr("name", `question_${questionId}_choice_${i}_text`);
        $(`#question_${questionId}_choice_${i}`).find(`#id_question_${questionId}_choice_${i + 1}_text`).attr("data-question-id", questionId);
        $(`#question_${questionId}_choice_${i}`).find(`#id_question_${questionId}_choice_${i + 1}_text`).attr("data-choice-id", i);
        $(`#question_${questionId}_choice_${i}`).find(`#id_question_${questionId}_choice_${i + 1}_text`).attr("id", `id_question_${questionId}_choice_${i}_text`);
        $(`#question_${questionId}_choice_${i}`).find(`#delete_question_${questionId}_choice_${i + 1}_button`).attr("data-question-id", questionId);
        $(`#question_${questionId}_choice_${i}`).find(`#delete_question_${questionId}_choice_${i + 1}_button`).attr("data-choice-id", i);
        $(`#question_${questionId}_choice_${i}`).find(`#delete_question_${questionId}_choice_${i + 1}_button`).attr("id", `delete_question_${questionId}_choice_${i}_button`);
    }
});


// submitting the form
$("#create_survey_form").submit(function(e) {
    e.preventDefault();
    // get inout with name csrfmiddlewaretoken
    csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
    survey_title = $("#id_survey_title").val();
    survey_description = $("#id_survey_description").val();
    questions = [];

    if (!survey_title) {
        error_template = `
            <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                </svg>
                Please enter a title for your survey
            </div>
        `;
        $("#error_container").html(error_template);
        return;
    }

    if (!survey_description) {
        error_template = `
            <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                </svg>
                Please enter a description for your survey
            </div>
        `;
        $("#error_container").html(error_template);
        return;
    }

    for (let i = 1; i <= totalQuestions; i++) {
        question_text = $(`#id_question_${i}_text`).val();
        question_type = $(`#id_question_${i}_type`).val();

        // if question text is empty, alert the user
        if (!question_text) {
            error_template = `
                <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                    </svg>
                    Question ${i} is empty
                </div>
            `;
            $("#error_container").html(error_template);
            return;
        }

        question = {
            "text": $(`#id_question_${i}_text`).val(),
            "type": $(`#id_question_${i}_type`).val(),
        };

        if (question_type == "radio" || question_type == "checkbox" || question_type == "select") {

            if ($(`#question_${i}_choices`).children().length) {

                choices = [];
                for (let j = 1; j <= $(`#question_${i}_choices`).children().length; j++) {
                    choice = $(`#id_question_${i}_choice_${j}_text`).val();
                    if (choice) {
                        choices.push(choice);
                    } else {
                        error_template = `
                            <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                                </svg>
                                Question ${question_text} has empty choice
                            </div>
                        `;
                        $("#error_container").html(error_template);
                        return;
                    }
                }
                if (choices.length) question["choices"] = choices;

            } else {
                error_template = `
                    <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                        </svg>
                        Question ${question_text} has no choices
                    </div>
                `;
                $("#error_container").html(error_template);
                return;

            }
        }
        questions.push(question);
    }
    questions = JSON.stringify(questions);

    // sending the data to the server
    $.ajax({
        type: "POST",
        data: {
            csrfmiddlewaretoken,
            survey_title,
            survey_description,
            questions,
        },
        success: function(data) {
            // redirecting the user to the dashboard
            if (data.status == "success") {
                alert("Survey created successfully");
                window.location.href = "/dashboard/mySurveys";
            } else {
                error_template = `
                    <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                        </svg>
                        ${data.message}
                    </div>
                `;
                $("#error_container").html(error_template);
            }
        }
    });
});
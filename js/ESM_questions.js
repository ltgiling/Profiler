let esm_questions = [
    'How would you rate your <b>current</b> study <b>motivation</b>?',
    'How would you rate your <b>preferred</b> study </b>motivation</b>?',
    'How would you rate your <b>current</b> study <b>engagement</b>?',
    'How would you rate your <b>preferred</b> study <b>engagement</b>?'
];
let esm_answers = [];
var ESMQid = 0;

//ESM quiz launcher, always run on 1st question
function esm_startQst() {
	esm_answers = [];
	ESMQid = 0;
    var link = document.getElementById("esm_final_a");
    link.setAttribute('href', "");	
    document.getElementById("esm_current_q").innerHTML = esm_questions[ESMQid];
};

//ESM quiz answer parsing
function esm_answerQst(Aid) {
	//less than 25 answers recorded
    if (esm_answers.length < (esm_questions.length - 1)) {
    	esm_answers.push(Aid);
    	ESMQid = (ESMQid + 1);
        document.getElementById("esm_current_q").innerHTML = esm_questions[ESMQid];
        //replace href at 2nd to last question
        if (ESMQid == (esm_questions.length - 1)){
            var link = document.getElementById("esm_final_a");
            link.setAttribute('href', "#esm_activity");
        }
    }  
    //all answers recorded
    else {
    	esm_answers.push(Aid);
    };
};

function ESM_Activity(ans){
    ESM_Ans_5 = ans;
    esm_profileCalc();
    sendESMData();
};

function esm_profileCalc() {
	ESM_Ans_1 = esm_answers[0];
	ESM_Ans_2 = esm_answers[1];
	ESM_Ans_3 = esm_answers[2];
	ESM_Ans_4 = esm_answers[3];
	
	
	console.log("ESM values: " + ESM_Ans_1 + " , " + ESM_Ans_2 + " , " + ESM_Ans_3 + " , " + ESM_Ans_4 + " , " + ESM_Ans_5);
	alert("ESM values: " + ESM_Ans_1 + " , " + ESM_Ans_2 + " , " + ESM_Ans_3 + " , " + ESM_Ans_4 + " , " + ESM_Ans_5);
};
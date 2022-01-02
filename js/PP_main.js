window.onload = function() {

    // add eventListener for tizenhwkey
    window.addEventListener("tizenhwkey", function(ev) {
        var activePopup = null,
            page = null,
            pageId = "";

        if (ev.keyName === "back") {
            activePopup = document.querySelector(".ui-popup-active");
            page = document.getElementsByClassName("ui-page-active")[0];
            pageId = page ? page.id : "";

            if (pageId === "main_app" && !activePopup) {
                try {
                    tizen.application.getCurrentApplication().hide();
                } catch (ignore) {}
            } else {
                window.history.back();
            }
        }
    });
};

//show values on button press (debugging purposes)
function pp_values_debug(id) {
    let pp_debug_buttons = [pp_rcpcall, pp_scrcall, pp_autcall, pp_cmtcall, pp_cnscall, pp_likcall];
    document.getElementById("debug_value").innerHTML = pp_debug_buttons[id];
};

//Question array with 26 questions (STPS scale) to determine the persuasion profile of the user
let pp_questions = [
    //reciprocity
    'When a family member does me a favor, I am very inclined to return this favor.',
    'I always pay back a favor.',
    'If someone does something for me, I try to do something of similar value to repay the favor.',
    'When I receive a gift, I feel obliged to return a gift.',
    'When someone helps me with my work, I try to pay them back.',
    //scarcity
    'I believe rare products (scarce) are more valuable than mass products.',
    'When my favorite shop is about to close, I would visit it since it is my last chance.',
    'I would feel good if I was the last person to be able to buy something.',
    'When my favorite shampoo is almost out of stock I buy two bottles.',
    'Products that are hard to get represent a special value.',
    //authority
    'I am very inclined to listen to authority figures.',
    'I always obey directions from my superiors.',
    'I am more inclined to listen to an authority figure than a peer.',
    'I am more likely to do something if told, than when asked.',
    //commitment
    'Whenever I commit to an appointment I always follow through.',
    'I try to do everything I have promised to do.',
    'When I make plans I commit to them by writing them down.',
    'Once I have committed to do something I will surely do it.',
    'If I miss an appointment, I always make it up.',
    //consensus
    'If someone from my social network notifies me about a good tv show, I tend to watch it.',
    'When I am in a new situation I look at others to see what I should do.',
    'I often rely on other people to know what I should do.',
    'It is important to me to fit in.',
    //liking
    'I will do a favor for people that I like.',
    'The opinions of friends are more important than the opinions of others.',
    'If I am unsure, I will usually side with someone I like.'
];
let pp_answers = [];
var Qid = 0;

//PP quiz launcher
function pp_startQst() {
    pp_answers = [];
    Qid = 0;
    var link = document.getElementById("pp_final_a");
    link.setAttribute('href', "");
    document.getElementById("pp_current_q").innerHTML = pp_questions[Qid];
};

//PP quiz answer parsing
function pp_answerQst(Aid) {
    //less than 25 answers recorded
    if (pp_answers.length < (pp_questions.length - 1)) {
        pp_answers.push(Aid);
        Qid = (Qid + 1);
        document.getElementById("pp_current_q").innerHTML = pp_questions[Qid];
        //replace href at 2nd to last question
        if (Qid == (pp_questions.length - 1)) {
            var link = document.getElementById("pp_final_a");
            link.setAttribute('href', "#pp_final");
        }
    }

    //25 answers recorded
    else {
        pp_answers.push(Aid);
        pp_profileCalc();
    };
};

//PP quiz return to previous question button
function pp_backQst() {
    if (Qid >= 1) {
        //Failsafe to prevent redirecting with unfinished answers array by choosing 'back' as final input.
        if (Qid == (pp_questions.length - 1)) {
            pp_answers.push(4);
            pp_profileCalc();
        } else {
            pp_answers.pop();
            Qid = (Qid - 1);
            document.getElementById("pp_current_q").innerHTML = pp_questions[Qid];
        }
    } else {
        console.log("you are already at the first question!");
    }
};

function pp_profileCalc() {
    //for each variable, calulate the average score with 1 decimal.
    rcp = scr = aut = cmt = cns = lik = 0;
    for (i = 1; i <= 5; i++) {
        rcp = rcp + (pp_answers[i - 1] / 5);
    }
    rcp = (Math.round(rcp * 10) / 10);
    for (i = 6; i <= 10; i++) {
        scr = scr + (pp_answers[i - 1] / 5);
    }
    scr = (Math.round(scr * 10) / 10);
    for (i = 11; i <= 14; i++) {
        aut = aut + (pp_answers[i - 1] / 4);
    }
    aut = (Math.round(aut * 10) / 10);
    for (i = 15; i <= 19; i++) {
        cmt = cmt + (pp_answers[i - 1] / 5);
    }
    cmt = (Math.round(cmt * 10) / 10);
    for (i = 20; i <= 23; i++) {
        cns = cns + (pp_answers[i - 1] / 4);
    }
    cns = (Math.round(cns * 10) / 10);
    for (i = 24; i <= 26; i++) {
        lik = lik + (pp_answers[i - 1] / 3);
    }
    lik = (Math.round(lik * 10) / 10);
    alert("PP values: " + rcp + " " + scr + " " + aut + " " + cmt + " " + cns + " " + lik);
};

//calculates highest and second highest PP attribute values
function PPMaxAttr() {

    var pp_call_arr = [pp_rcpcall, pp_scrcall, pp_autcall, pp_cmtcall, pp_cnscall, pp_likcall];
    console.log("array called: " + pp_call_arr);
    //find the attribute with the biggest value
    pp_max_call = pp_call_arr[0];
    pp_max_pos = 0;
    for (var i = 0; i < pp_call_arr.length; i++) {
        if (pp_max_call < pp_call_arr[i]) {
            pp_max_call = pp_call_arr[i];
            pp_max_pos = i;
        }
    }
    console.log("max attribute: " + pp_max_pos);

    //find the attribute with the second biggest value
    if (pp_max_pos == 0) {
        pp_secmax_call = pp_call_arr[1];
        pp_secmax_pos = 1;
    } else {
        pp_secmax_call = pp_call_arr[0];
        pp_secmax_pos = 0;
    }
    for (var i = 0; i < pp_call_arr.length; i++) {
        if (i != pp_max_pos) {
            if (pp_secmax_call < pp_call_arr[i]) {
                pp_secmax_call = pp_call_arr[i];
                pp_secmax_pos = i;
            }
        }
    }
    console.log("second max attribute: " + pp_secmax_pos);
};

//chooses a notification to display from the calculated attribute values
function PPNotifChoice() {

    PPMaxAttr();
    //randomize the notification attribute
    pp_typeQ = (Math.floor(Math.random() * 20 + 1));
    //20% for random msg
    if (pp_typeQ <= 4) {
        pp_randattr = (Math.floor(Math.random() * 6));
        PPNotifArray(pp_randattr);
        pp_randQ = Math.floor(Math.random() * notif_msgs.length);
        pp_final_notif = notif_msgs[pp_randQ];
    }
    //55% for most susceptible attribute
    if (pp_typeQ > 4 && pp_typeQ < 16) {
        PPNotifArray(pp_max_pos);
        pp_randQ = Math.floor(Math.random() * notif_msgs.length);
        pp_final_notif = notif_msgs[pp_randQ];
    }
    //25% chance for 2nd most susceptible attribute
    if (pp_typeQ >= 16) {
        PPNotifArray(pp_secmax_pos);
        pp_randQ = Math.floor(Math.random() * notif_msgs.length);
        pp_final_notif = notif_msgs[pp_randQ];
    }
    
    //pp_final_notif contains the final string to be used as notification message
    console.log("final notification message ID: " + pp_final_notif);
    
    //store the string (and array id) as variable in indexed.db (activity ID = GAMEDESCRIPTORS.DIAGAME_MOOD_LOG)
    $gdId = '1076';
    var pp_storeNotif = {	
            "eventKey": new Date().getTime(),
            "eventType": "gb_activity",
            "eventOccuredAt": new Date().getTime(),
            "eventData": [{
                "gd_id": $gdId,
                "properties": [{
                    "id": '1145',
                    "value": array_id + ": " + pp_final_notif
                }]
            }]
        };
    	
        db.add(pp_storeNotif);
    
};

function PPNotifArray(id) {
    var array_id = id;
	//reciprocity
    if (array_id == 0) {
        notif_msgs = [
            'Why not help us help you?',
            'You fill in your activity, we take care of the rest!',
            'We worked hard to develop Profiler, consider telling us about your study activity.',
            'We carefully developed Profiler so you can succeed, return the favour by filling in your study activity?',
            'We believe our hard work in developing Profiler will be worth it if it helps you self-improve.',
            'Profiler is our gift to you that will benefit you for the rest of your career, use it now!',
            'Help us regulate your study pattern, we designed Profiler to do just that!',
            'Let us help you study better, all you have to do is use our carefully designed app.',
            'We would appreciate it if you used Profiler, we put a lot of effort into it.',
            'We give you Profiler, you give us the data to help you improve yourself.',
            'Let us help you improve your study behaviour!',
            'Regular self-assessment will help you, Profiler is here for you to do so.',
            'We spent a lot of time developing Profiler. Consider spending little time using it to help yourself',
            'See our hard work by using Profiler, the app made to help you.',
            'The developers of Profiler thank you for choosing our application!'
        ];
    }
    //scarcity
    if (array_id == 1) {
        notif_msgs = [
            'Profiler was developed specifically for students like you to help you improve!',
            'If you don\'t use Profiler, you\'ll miss out on self-improvement.',
            'If you don\'t use Profiler, you might be studying inefficiently.',
            'It\'s most efficient to record your study activity several times a day, don\'t miss your chance to map your behaviour!',
            'Profiler helps you reflect on your daily study behaviour, don\'t miss out!',
            'Many students do not self-regulate their learning, rise above them using Profiler!',
            'Record your activity using Profiler now to ensure you don\'t leave gaps in your data!',
            'If you don\'t use Profiler now, you might lose out on efficient study behaviour for the rest of your career.',
            'Only you can map your study behaviour, don\'t miss out!',
            'Be one of the first to accurately map study behaviour using Profiler.',
            'Profiler is here to help you improve right now, don\'t lose out when its gone!',
            'Profiler gives you a unique opportunity to improve through self-assessment now, don\'t miss out!',
            'Don\'t miss out on tracking your study behaviour, use Profiler.'
        ];
    }
    //authority
    if (array_id == 2) {
        notif_msgs = [
            'Profiler was prepared by designers for people like you, fill in your activity asap!',
            'It\'s time to fill in your study activity again!',
            'Profiler was created to help self-regulated learning. Fill in your activity now to help yourself.',
            'Research shows self-regulated learning helps students set goals, help yourself by collecting study activity!',
            'Get motivated! Tell us about your study motivation!',
            'Use Profiler now!',
            'Let us know what your current activity is.',
            'It\'s time to self-assess your study activity.',
            'Are you motivated to study right now? Let us know!',
            'Monitor your study behaviour, fill in your current study activity.',
            'Fill in your activity now and see the benefits later.',
            'Let us know how you are feeling about your study activity.',
            'Help us map your study activity right now.',
            'Learn when you are most motivated in a day and if you already study in those moments, use Profiler!',
            'Can you focus up while studying? Track your engagement!'
        ];
    }
    //commitment
    if (array_id == 3) {
        notif_msgs = [
            'It\'s important to regularly measure your study activity to get the best results.',
            'Regular self-assessment helps you set new goals.',
            'Routinely tracking your study behaviour will help you determine where you can improve.',
            'Routinely track how motivated you are to learn your personal ideal study schedule!',
            'Filling in your study activity takes only 2 minutes!',
            'The more data points the merrier! ',
            'Learn about how you study and set yourself new goals with Profiler.',
            'Profiler helps you reflect on your daily study behaviour.',
            'It takes a minimal amount of effort each day to help you imrpove over a lifetime, keep at it.',
            'Know what your goals are, you can use Profiler to determine your progress!',
            'It\'s important to keep measuring your study behaviour for the best results.',
            'Using profiling multiple times a day helps map YOUR study behaviour!',
            'Plan your study sessions well with help of Profiler!',
            'Achieve your study goals by mapping your study behaviour using Profiler!'
        ];
    }
    //consensus
    if (array_id == 4) {
        notif_msgs = [
            'People like you who use Profiler multiple times per day are more likely to benefit from it!',
            'Self-assessment is used by millions of students and employees worldwide, join them!',
            'Many Profiler users fill in their study activity at least 7 times per day, join this group now!',
            'Profiler users are talking about their study motivation right now! Consider doing the same!',
            'Research shows self-assessment benefits people far beyond their study program, why not join this group of people?',
            'Others around you want to improve, help yourself do the same by using Profiler.',
            'Want to belong to the group of students who study efficiently? Use Profiler!',
            'Join those who want to increase their study motivation.',
            'Self-regulated learners exert effort towards academic success, join them!',
            'Learn when you study effectively like those who came before you using Profiler.',
            'Others use profiler to help map study behaviour, why wouldn\'t you?'
        ];
    }
    //liking
    if (array_id == 5) {
        notif_msgs = [
            'You like yourself right? Why not help yourself grow?',
            'We appreciate you for using Profiler. ♥',
            'Thank you for using Profiler! ',
            'We would appreciate it if you recorded your current activity, thank you!',
            'We support you in your ways to help yourself improve! ',
            'We see self-assessment as self-care; take care of yourself using Profiler!',
            'Your brain is telling you it wants to learn, help yourself learn better!',
            'Remember to help yourself!',
            'If you tell yourself you can do better, you will! Profiler is here to help you do so.',
            'Help yourself improve, use Profiler.'
        ];
    }
};
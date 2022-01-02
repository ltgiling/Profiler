var $bearer = '******************************************************';
var $player_id = '***';

//Retrieve persuasion profiling JSON data from *********
function getgbPPData() {
    var pp_getcall = {
        url: '********************************' + $player_id + '/activities',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        data: "",
        headers: {
            Authorization: "Bearer " + $bearer,
        },
        beforeSend: function() {
           alert("webservice::requesting ajax...");
        },
        success: function(data) {
            alert("webservice::successfull ajax request");
             

            //grab the latest PP entry (in a very inefficient way)
            for (i = 1; i <= 200; i++) {
                var x = data.length - i;
                if (data[x].gameDescriptor.id == 1080) {
                    var latest_pp_entry = x;
                    i = 201;
                }
            };
            //grab the latest ESM entry
            /*       for(i = 1; i <= 200; i++) {
                       var x = data.length - i;
                       	if(data[x].gameDescriptor.id ==  1081 ) {
                       		var latest_esm_entry = x;
                      		i = 1001;
                      	}
                       }; 
             */
            //extract data from the called JSON
            pp_user = data[latest_pp_entry].creator.user.firstName;
            pp_rcpcall = data[latest_pp_entry].propertyInstances[0].value;
            pp_scrcall = data[latest_pp_entry].propertyInstances[1].value;
            pp_autcall = data[latest_pp_entry].propertyInstances[2].value;
            pp_cmtcall = data[latest_pp_entry].propertyInstances[3].value;
            pp_cnscall = data[latest_pp_entry].propertyInstances[4].value;
            pp_likcall = data[latest_pp_entry].propertyInstances[5].value;
        },
        error: function(e) {
            alert("webservice::something went wrong..");
            try {	
            //if the call to ********* fails, use locally stored data instead
            getlocalPPData();	
            }
            catch (e) {
            alert("something went wrong grabbing local data too..")
            }
        },
        complete: function() {
            alert("webservice::ajax call is done!");
        },
    };
    $.ajax(pp_getcall);
};

//grab data from indexed.db
function getlocalPPData() {
	// localppdata = db.get('1080'); 
	// pp_rcpcall = localppdata.eventData.properties[0].value;
    // pp_scrcall = localppdata.eventData.properties[1].value;
    // pp_autcall = localppdata.eventData.properties[2].value;
    // pp_cmtcall = localppdata.eventData.properties[3].value;
    // pp_cnscall = localppdata.eventData.properties[4].value;
    // pp_likcall = localppdata.eventData.properties[5].value;
}

//Create a new persuasion profiling entry through GameBus
function sendPPData() {
  var $gdId = '1080';
    
 /*   var pp_sdata = {
        "eventKey": new Date().getTime(),
        "eventType": "gb_activity",
        "eventOccuredAt": new Date().getTime(),
        "eventData": [{
            "gd_id": $gdId,
            "properties": [{
                "id": '1203',
                "value": rcp
            }, {
                "id": '1204',
                "value": scr
            }, {
                "id": '1205',
                "value": aut
            }, {
                "id": '1206',
                "value": cmt
            }, {
                "id": '1207',
                "value": cns
            }, {
                "id": '1208',
                "value": lik
            }]
        }]
    };
    db.put(pp_sdata); */
    
    //call back data that was just saved
    getlocalPPData();
    
     dataProvider = 1;
    timestamp = new Date().getTime();
    var pp_fd = new FormData();
    pp_fd.append(
        "activity",
        '{"gameDescriptor":' +
        $gdId +
        ',"dataProvider":' +
        dataProvider +
        ',"date":' +
        timestamp +
        ',"propertyInstances":[' +
        '{"property":1203' + ',"value":"' +
        rcp +
        '"},{"property":1204' + ',"value":"' +
        scr +
        '"},{"property":1205' + ',"value":"' +
        aut +
        '"},{"property":1206' + ',"value":"' +
        cmt +
        '"},{"property":1207' + ',"value":"' +
        cns +
        '"},{"property":1208' + ',"value":"' +
        lik +
        '"}],"players":[]}'
    );

    var pp_call = {
        url: "******************************************************",
        type: "POST",
        dataType: "json",
        processData: false,
        contentType: false,
        data: pp_fd,
        headers: {
            Authorization: "Bearer " + $bearer,
        },
        beforeSend: function() {
            console.log("webservice::requesting ajax...");

            //check data object type
            console.log(pp_fd);
        },
        success: function(data) {
            console.log("webservice::successfull ajax request");

            //returns details of data entry including user data
            console.log("user: " + data[0].creator.user.firstName + ", timestamp: " + data[0].date);
        },
        error: function(e) {
            console.log("webservice::something went wrong..");
        },
        complete: function() {
            console.log("webservice::ajax call is done!");

            getgbPPData();
        },
    };

    $.ajax(pp_call);
    
};

//Send ESM entry as JSON to *********
function sendESMData() {
		var $gdId = '1081';
		 /*   var esm_sdata = {
	        "eventKey": new Date().getTime(),
	        "eventType": "gb_activity",
	        "eventOccuredAt": new Date().getTime(),
	        "eventData": [{
	            "gd_id": $gdId,
	            "properties": [{
	                "id": '1210',
	                "value": ESM_Ans_1
	            }, {
	                "id": '1211',
	                "value": ESM_Ans_2
	            }, {
	                "id": '1212',
	                "value": ESM_Ans_3
	            }, {
	                "id": '1213',
	                "value": ESM_Ans_4
	            }, {
	                "id": '1214',
	                "value": ESM_Ans_5
	            }]
	        }]
	    };
	    db.add(esm_sdata); */
	
	
	dataProvider = 1;
    timestamp = new Date().getTime();
    var esm_fd = new FormData();
    esm_fd.append(
        "activity",
        '{"gameDescriptor":' + 
        $gdId +
        ',"dataProvider":' +
        dataProvider +
        ',"date":' +
        timestamp +
        ',"propertyInstances":[' +
        '{"property":1210' + ',"value":"' +
        ESM_Ans_1 +
        '"},{"property":1211' + ',"value":"' +
        ESM_Ans_2 +
        '"},{"property":1212' + ',"value":"' +
        ESM_Ans_3 +
        '"},{"property":1213' + ',"value":"' +
        ESM_Ans_4 +
        '"},{"property":1214' + ',"value":"' +
        ESM_Ans_5 +
        '"}],"players":[]}'
    );

    var esm_call = {
        url: "******************************************************",
        type: "POST",
        dataType: "json",
        processData: false,
        contentType: false,
        data: esm_fd,
        headers: {
            Authorization: "Bearer " + $bearer,
        },
        beforeSend: function() {
            console.log("webservice::requesting ajax...");

            //check data object type
            console.log(esm_fd);
        },
        success: function(data) {
            console.log("webservice::successfull ajax request");

            //returns details of data entry including user data
            console.log("user: " + data[0].creator.user.firstName + ", timestamp: " + data[0].date);
        },
        error: function(e) {
            console.log("webservice::something went wrong..");
        },
        complete: function() {
            console.log("webservice::ajax call is done!");
        },
    };

    $.ajax(esm_call);
    
};
// Code adapted from: https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js

// Loading tile layers in to seperate variables, to give multiple map layer options
var Light = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy26u500262roa9yk2e7r0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig', 
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
	
	Cream = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy8du3001q2qmzwl3id3f9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Satellite = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxyaclj00002ro8ehqsjf7b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Basic = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy6f9400272roa7rk37us5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Dark = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy5x0n000t2rn8sjo97h8k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'});
				

//Load default map, zoomed to University College of London (UCL)
var mymap = L.map('mapid', {
    center: [51.5246, -0.1340],
    zoom: 13,
    layers: [Cream]
});

//Create basemap varaibles 
var baseMaps = {
    "Default": Cream,
    "Light": Light,
	"Dark": Dark,
	"Satellite": Satellite,
	"Basic": Basic
};
// Add the layers to map
L.control.layers(baseMaps).addTo(mymap);




/* Code used to form tracker functionality for user position adapted from:
https://stackoverflow.com/questions/48651799/how-do-i-simply-get-the-current-geolocation-using-leaflet-without-events?noredirect=1&lq=1
https://github.com/domoritz/leaflet-locatecontrol
https://leafletjs.com/examples/mobile/
https://stackoverflow.com/questions/10563789/how-to-locate-user-with-leaflet-locate */
// Track the location of the user
// If the phone is unable to find the users locations then an alert message is returned expressing this. Error handling. 
var TrackUser = true;
var LocalUser;
var LocRad;
var autoPan = false;

function trackLocation() {
	if (!TrackUser){
		mymap.fitBounds(LocalUser.getLatLng().toBounds(250));
		autoPan = true;
	} else {
		if (navigator.geolocation) {
		alert("Finding location!");
		navigator.geolocation.watchPosition(showPosition);
	} else {
		alert("Geolocation is not supported within this browser."); //Error handing
		}
	}
}




// Create variable to hold XMLHttpRequest()
var VarQuest;
function processData(postString) {
   VarQuest = new XMLHttpRequest();
   VarQuest.open('POST','http://developer.cege.ucl.ac.uk:30302/UpAns',true); //connect to uploaded answers 
   VarQuest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   VarQuest.onreadystatechange = answerUploaded;
   VarQuest.send(postString);
}



// Receive response from the data server
function answerUploaded() {
	if (VarQuest.readyState == 4) {
		document.getElementById('PopQuest').style.display = 'none';
	document.getElementById('mapid').style.display = 'block';
		if (answerTrue) {PTClick.setIcon(CorrectQTM);
		} else {PTClick.setIcon(WrongQTM);
		}
    }
}



// Create variables for the XMLHttpRequest() and layer of questions 
PTQuest = [];
var qvariable;
var questionsLayer;

// Create function to use an XMLHttpRequest to retrieve question data 
function getQuestions() {
	qvariable = new XMLHttpRequest();
	qvariable.open('GET','http://developer.cege.ucl.ac.uk:30302/getquestions');
	qvariable.onreadystatechange = questionResponse; 
	qvariable.send();
}

// Get response from data server
function questionResponse() {
	if (qvariable.readyState == 4) {
		var questionData = qvariable.responseText;
		loadQuestionLayer(questionData);
	}
}

// Convert the received data to JSON format and add it to the map
function loadQuestionLayer(questionData) {
	var questionJSON = JSON.parse(questionData); 	// Convert text to JSON
	var questionsLayer = L.geoJson(questionJSON, 	// Load geoJSON layer
	{
	// Point to layer creates the question points
	pointToLayer: function (feature, latlng)
	{
		layer_marker = L.marker(latlng, {icon:QuestionsTM}) 		//Every question for database has pink marker 
		layer_marker.bindPopup("<b>"+feature.properties.questionlock +"</b>"); 		//Include popup with location description

		PTQuest.push(layer_marker); 		//Push markers to PTQuest
		return layer_marker;
	},
	}).addTo(mymap);

	// Map changes extent to fit the extent of questions layer
	mymap.fitBounds(questionsLayer.getBounds());
}






// Create global marker variables
var InitialTM = L.AwesomeMarkers.icon({markerColor: 'blue'});
var WrongQTM = L.AwesomeMarkers.icon({markerColor: 'red'});
var CorrectQTM = L.AwesomeMarkers.icon({markerColor: 'green'});
var QuestionsTM = L.AwesomeMarkers.icon({markerColor: 'pink'});
var QWithinRange = L.AwesomeMarkers.icon({markerColor: 'orange'});


// Create function for the intial show of the users position 
function showPosition(position) { 		// Blue marker used to display user intial position
	if(!TrackUser){
		mymap.removeLayer(LocalUser);
		mymap.removeLayer(LocRad);
	}
	var radius = 20; 		// Blue marker has 20m radial circle surroudning
	LocalUser = L.marker([position.coords.latitude,position.coords.longitude], {icon:InitialTM}).addTo(mymap);
	LocRad = L.circle([position.coords.latitude,position.coords.longitude], radius).addTo(mymap);
	if(TrackUser){
		TrackUser = false;
		mymap.fitBounds(LocalUser.getLatLng().toBounds(250)); 		// Center map on user
		autoPan = true;
	}else if (autoPan) {
		mymap.panTo(LocalUser.getLatLng());
	}
}






// Use fucntion to find distance from a marker and calculate the radius distance 
function DistCheckQ(questionMarkers){
	latlng = LocalUser.getLatLng(); 	// User current location
	alert("Checking if within 20m from question");
			for(var i=0; i<questionMarkers.length; i++) {
	   		 	currentMarker = questionMarkers[i];
	   		 	currentMarker_latlng = currentMarker.getLatLng();
					var distance = getDistanceFromLatLonInM(currentMarker_latlng.lat, currentMarker_latlng.lng, latlng.lat, latlng.lng);
						if (distance <= 20) {
           				 questionMarkers[i].setIcon(QWithinRange);
						 questionMarkers[i].on('click', onClick);
						} else {
        					questionMarkers[i].setIcon(QuestionsTM);
							questionMarkers[i].bindPopup("Move closer to the question marker on map");
       			 }
		}
}




// This variable tells the user is they are correct 
var answerTrue;

// Function and Process for user to iterate through in order to submit a question, with multiple error handling functionalities. 
function startDataUpload() {
	alert ("Selected answer submitted"); 	
	var AnsRight = PTClick.feature.properties.rightans; 	// Question's rightanswer
	var question = document.getElementById("question").value; // Assign question
	var answer; // The users answer
	var postString = "question="+question; 	// Uploads the data to database table 

	// Get radio button from Opt 
	if (document.getElementById("Opt1").checked) {answer = 1;postString=postString+"&answer="+answer;}
    if (document.getElementById("Opt2").checked) {answer = 2;postString=postString+"&answer="+answer;}
	if (document.getElementById("Opt3").checked) {answer =3;postString=postString+"&answer="+answer;}
	if (document.getElementById("Opt4").checked) {answer =4;postString=postString+"&answer="+answer;}
	
	if (answer == AnsRight) {alert("Correct!");answerTrue = true;  		// Is the answer correct?
	} else {
		alert("Sorry, your answer of " +answer+" is incorrect! \n The rightanswer is: " + AnsRight);
		answerTrue = false;
	}
	postString = postString + "&AnsRight="+AnsRight;
	processData(postString);
}






/*Adapted from:
https://github.com/njj/haversine
https://www.movable-type.co.uk/scripts/latlong.html
https://andrew.hedges.name/experiments/haversine/ */
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; 
  var dLat = deg2rad(lat2-lat1);  
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; 
  var d2 = d * 1000;
  return d2;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function availableQuestions(){
	DistCheckQ(PTQuest);
}





// Create a global variable for the clicked marker
var PTClick;

function onClick(e) {
	QClickShow(this);
	PTClick = this;
}

// Create variables to iterate through the answers with the options chosen in the app
function QClickShow(QClicked) {
	document.getElementById('PopQuest').style.display = 'block';
	document.getElementById('mapid').style.display = 'none';
	
	document.getElementById("question").value = QClicked.feature.properties.question;
	document.getElementById("answera").value = QClicked.feature.properties.answera;
	document.getElementById("answerb").value = QClicked.feature.properties.answerb;
	document.getElementById("answerc").value = QClicked.feature.properties.answerc;
	document.getElementById("answerd").value = QClicked.feature.properties.answerd;

	document.getElementById("Opt1").checked = false;
	document.getElementById("Opt2").checked = false;
	document.getElementById("Opt3").checked = false;
	document.getElementById("Opt3").checked = false;
	PTClick = QClicked;
}


// This is another error handling method which makes the user select a radio button, i.e. select an answer
function validateData() {
        var a=document.getElementById("Opt1").checked;
        var b=document.getElementById("Opt2").checked;
        var c=document.getElementById("Opt3").checked;
        var d=document.getElementById("Opt4").checked;
        if (a==false && b==false && c==false && d==false)
        {
            alert("Please select an answer.");
			return false;
        }
        else
        {
        	startDataUpload()
        }
}


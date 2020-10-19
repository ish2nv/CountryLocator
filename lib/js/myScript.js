

var mymap = L.map('mapid', {
    minZoom: 1,
    maxZoom: 20
}).setView([54.868166, -2.906557], 6);
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});
var storerate = 0;
var storecurrencycode = "";
var custommarker;
var currentlocationmarker;
var custompolygon=[];
var custompolygon2 = [];
var custompolyline = [];
var custompara2 = document.createElement("p");
var custombrace = document.createElement("br");
custompara2.innerHTML = "Click in specific region to get more";
L.easyButton('fa-crosshairs fa-lg', function(btn, map){
    getLocation();
}, {position: 'bottomleft'}).addTo( mymap );

sidebar.hide();


mymap.addControl(sidebar);
L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'KDSSZG2CPTPBXVdHu5DZV9dCeW0oS3eHrosMXOBYLneIKp6hmyOEtZDbjbauNEgD'
}).addTo(mymap);
mymap.setMaxBounds(  [[-90,-180],   [90,180]]  )



       var options = {
          isAlphaNumericIcon: true,
          iconShape: 'marker',
          borderColor: '#ffffff',
          textColor: '#FFFFFF',
          backgroundColor:'#00ABDC'
        };


function addAllCountriesToDropDown() {
     $.ajax({
	url: "lib/php/countries_large2.php",
	type: "POST",
	dataType: "json",
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
			var customdiv44 = document.getElementById("myCustomDropDown");
			for(var i = 0; i < result['data'].length;i++) {
				var optiontag = document.createElement("option");
				optiontag.setAttribute("class","dropdownitem3");
				optiontag.value = result['data2'][i];
				optiontag.innerText = result['data'][i];

				if(optiontag.innerText === "United Kingdom") {
					optiontag.setAttribute("selected","selected");
				}

				customdiv44.appendChild(optiontag);
			}
						customdiv44.removeChild(customdiv44.childNodes[0]);
						customdiv44.removeChild(customdiv44.childNodes[0]);

		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});
}

addAllCountriesToDropDown();

function onClickLink(e) {
					sidebar.hide();
					var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "none";
			     if(custommarker!= undefined) {
     mymap.removeLayer(custommarker);
}
if(custompolygon.length !== 0) {
	for(var i = 0; i < custompolygon.length;i++){
		window.mymap.removeLayer(window.custompolygon[i]);
	}
		custompolygon=[];
}
if(custompolygon2.length !== 0) {

	for(var i = 0; i < custompolygon2.length;i++){
		window.mymap.removeLayer(window.custompolygon2[i]);
	}
	custompolygon2=[];

}
if(custompolyline.length !== 0) {
	for(var i = 0; i < custompolyline.length;i++){
		window.mymap.removeLayer(window.custompolyline[i]);
	}
	custompolyline=[];
}
var countryname = $("#myCustomDropDown option:selected").text();;
var countrycode = e;

	showCountryInfoFromDropDown(countryname,countrycode);
}

	function showCountryInfoFromDropDown(countryname2,countrycode) {
   $.ajax({
	url: "lib/php/countries_large.php",
	type: "POST",
	dataType: "json",
	data: {
		countryname: countryname2
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
					sidebar.hide();
										var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "none";
					if(document.getElementById("countryinformationdetailed").contains(custompara2) && document.getElementById("countryinformationdetailed").contains(custombrace) ) {
		document.getElementById("countryinformationdetailed").removeChild(custombrace);
		document.getElementById("countryinformationdetailed").removeChild(custompara2);
	}
			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="block";
          if(result['data2'][0] === "Polygon") {
			for(var i = 0; i < result['data3'][0][0].length;i++) {
				var tmp = result['data3'][0][0][i][0];
				result['data3'][0][0][i][0] = result['data3'][0][0][i][1];
				result['data3'][0][0][i][1] = tmp;
			}
	
					   custompolygon.push(new L.polygon(result['data3'][0][0]));
					   mymap.addLayer(custompolygon[0]);
					   custompolygon[0].addTo(mymap);
					   	  mymap.fitBounds(custompolygon[0].getBounds());


					    myfunc4(countryname2,countrycode);

		document.getElementById("theLocation").style.display="none";
		document.getElementById("CurrentWeatherInfo").style.display="none";
		document.getElementById("weatherForecast").style.display="none";
		document.getElementById("CurrencyExchange").style.display="none";
		document.getElementById("WikipediaLinks").style.display="none";
		sidebar.show();
			var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "block";
		document.getElementById("countryinformationdetailed").appendChild(custombrace);
		document.getElementById("countryinformationdetailed").appendChild(custompara2);


		}
			else if(result['data2'][0] === "MultiPolygon") {
for(var i = 0; i < result['data3'][0].length;i++) {
for(var j = 0; j < result['data3'][0][i][0].length;j++) {
				var tmp = result['data3'][0][i][0][j][0];
				result['data3'][0][i][0][j][0] = result['data3'][0][i][0][j][1];
				result['data3'][0][i][0][j][1] = tmp;
				
			}
			}
	
			for (var i = 0; i < result['data3'][0].length; i++) {	
		    custompolygon2.push(new L.polygon(result['data3'][0][i][0]));
			mymap.addLayer(custompolygon2[i]);
		    custompolygon2[i].addTo(mymap);	

		}

var group = new L.featureGroup(custompolygon2);
mymap.fitBounds(group.getBounds());


		 myfunc4(countryname2,countrycode);
		 		document.getElementById("theLocation").style.display="none";
		document.getElementById("CurrentWeatherInfo").style.display="none";
		document.getElementById("weatherForecast").style.display="none";
		document.getElementById("CurrencyExchange").style.display="none";
		document.getElementById("WikipediaLinks").style.display="none";
		sidebar.show();
					var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "block";
		document.getElementById("countryinformationdetailed").appendChild(custombrace);
		document.getElementById("countryinformationdetailed").appendChild(custompara2);
		}
		else {

		}

}
	},
	error:function(result, textStatus, xhr){
		 	
	}
});
	}



// Create additional Control placeholders
function addControlPlaceholders(map) {
    var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
}
addControlPlaceholders(mymap);

// Change the position of the Zoom Control to a newly created placeholder.
mymap.zoomControl.setPosition('verticalcenterleft');

// You can also put other controls in the same placeholder.
L.control.scale({position: 'verticalcenterleft'}).addTo(mymap);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else { 
  }
}

function showPosition(position) {
					sidebar.hide();
				var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "none";
			     if(custommarker!= undefined) {
     mymap.removeLayer(custommarker);
}
if(custompolygon.length !== 0) {
	for(var i = 0; i < custompolygon.length;i++){
		window.mymap.removeLayer(window.custompolygon[i]);
	}
		custompolygon=[];
}
if(custompolygon2.length !== 0) {

	for(var i = 0; i < custompolygon2.length;i++){
		window.mymap.removeLayer(window.custompolygon2[i]);
	}
	custompolygon2=[];

}
if(custompolyline.length !== 0) {
	for(var i = 0; i < custompolyline.length;i++){
		window.mymap.removeLayer(window.custompolyline[i]);
	}
	custompolyline=[];
}
       if(currentlocationmarker!= undefined) {
     mymap.removeLayer(currentlocationmarker);
}
currentlocationmarker = new L.userMarker([position.coords.latitude,position.coords.longitude]);
currentlocationmarker.addTo(mymap).bindPopup(position.coords.latitude+", "+position.coords.longitude);

     $.ajax({
	url: "lib/php/countryCodeGeoNames.php",
	type: "POST",
	dataType: "json",
	data: {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
		username: "ish2nv"
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
	if(document.getElementById("countryinformationdetailed").contains(custompara2) && document.getElementById("countryinformationdetailed").contains(custombrace) ) {
		document.getElementById("countryinformationdetailed").removeChild(custombrace);
		document.getElementById("countryinformationdetailed").removeChild(custompara2);
	}  

	       document.getElementById('myCustomDropDown').value = getCountryISO3(result['data']['countryCode']);
		document.getElementById("theLocation").style.display="block";
		document.getElementById("CurrentWeatherInfo").style.display="block";
		document.getElementById("weatherForecast").style.display="block";
		document.getElementById("CurrencyExchange").style.display="block";
		document.getElementById("WikipediaLinks").style.display="inline-block";
		    myfunc4(result['data']['countryName'],result['data']['countryCode']);		
			myfunc3(result['data']['countryName'],result['data']['countryCode']);
			myfunc5(position.coords.latitude,position.coords.longitude,result['data']['countryCode']);
			myfunc10(position.coords.latitude,position.coords.longitude);
			myfunc8(result['data']['countryName']);
			myfunc9(position.coords.latitude,position.coords.longitude);
			document.getElementById("latitude20").innerHTML = "Latitude: " + (Math.round(position.coords.latitude * 100) / 100).toFixed(2);
			document.getElementById("longitude20").innerHTML = "Longitude: " + (Math.round(position.coords.longitude * 100) / 100).toFixed(2);
			document.getElementById("countryflag").style.display="none";
			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="none";
            sidebar.show();
			var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "block";
		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});


}

function backClick() {
	sidebar.hide();
	var sidebar2 = document.getElementById("sidebar");
	sidebar2.style.display = "none";
}

	function onMapClick(e) {
				sidebar.hide();
				var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "none";
			     if(custommarker!= undefined) {
     mymap.removeLayer(custommarker);
}
if(custompolygon.length !== 0) {
	for(var i = 0; i < custompolygon.length;i++){
		window.mymap.removeLayer(window.custompolygon[i]);
	}
		custompolygon=[];
}
if(custompolygon2.length !== 0) {

	for(var i = 0; i < custompolygon2.length;i++){
		window.mymap.removeLayer(window.custompolygon2[i]);
	}
	custompolygon2=[];

}
if(custompolyline.length !== 0) {
	for(var i = 0; i < custompolyline.length;i++){
		window.mymap.removeLayer(window.custompolyline[i]);
	}
	custompolyline=[];
}
		var lat = e.latlng.lat;
        var lng = e.latlng.lng;
     $.ajax({
	url: "lib/php/countryCodeGeoNames.php",
	type: "POST",
	dataType: "json",
	data: {
		latitude: lat,
		longitude: lng,
		username: "ish2nv"
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
if(document.getElementById("countryinformationdetailed").contains(custompara2) && document.getElementById("countryinformationdetailed").contains(custombrace) ) {
		document.getElementById("countryinformationdetailed").removeChild(custombrace);
		document.getElementById("countryinformationdetailed").removeChild(custompara2);
	}

	       document.getElementById('myCustomDropDown').value = getCountryISO3(result['data']['countryCode']);
		document.getElementById("theLocation").style.display="block";
		document.getElementById("CurrentWeatherInfo").style.display="block";
		document.getElementById("weatherForecast").style.display="block";
		document.getElementById("CurrencyExchange").style.display="block";
		document.getElementById("WikipediaLinks").style.display="inline-block";
		    myfunc4(result['data']['countryName'],result['data']['countryCode']);
			myfunc3(result['data']['countryName'],result['data']['countryCode']);
			myfunc5(lat,lng,result['data']['countryCode']);
			myfunc10(lat,lng);
			myfunc8(result['data']['countryName']);
			myfunc9(lat,lng);
			document.getElementById("latitude20").innerHTML = "Latitude: " + (Math.round(lat * 100) / 100).toFixed(2);
			document.getElementById("longitude20").innerHTML = "Longitude: " + (Math.round(lng * 100) / 100).toFixed(2);
			document.getElementById("countryflag").style.display="none";
			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="none";
              sidebar.show();
			var sidebar2 = document.getElementById("sidebar");
					sidebar2.style.display = "block";
		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});


      custommarker = new L.marker(e.latlng, {
          icon: L.BeautifyIcon.icon(options),
          draggable: false
        });


      mymap.addLayer(custommarker);
      custommarker.addTo(mymap);
	}


	function myfunc3(countryname2,countrycode) {
   $.ajax({
	url: "lib/php/countries_large.php",
	type: "POST",
	dataType: "json",
	data: {
		countryname: countryname2
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="block";
                mynode3.style.display="block";
          if(result['data2'][0] === "Polygon") {
			for(var i = 0; i < result['data3'][0][0].length;i++) {
				var tmp = result['data3'][0][0][i][0];
				result['data3'][0][0][i][0] = result['data3'][0][0][i][1];
				result['data3'][0][0][i][1] = tmp;
			}
	
					   custompolygon.push(new L.polygon(result['data3'][0][0]));
					   mymap.addLayer(custompolygon[0]);
					   custompolygon[0].addTo(mymap);
					   	  mymap.fitBounds(custompolygon[0].getBounds());

		}
			else if(result['data2'][0] === "MultiPolygon") {
for(var i = 0; i < result['data3'][0].length;i++) {
for(var j = 0; j < result['data3'][0][i][0].length;j++) {
				var tmp = result['data3'][0][i][0][j][0];
				result['data3'][0][i][0][j][0] = result['data3'][0][i][0][j][1];
				result['data3'][0][i][0][j][1] = tmp;
				
			}
			}
	
			for (var i = 0; i < result['data3'][0].length; i++) {	
		    custompolygon2.push(new L.polygon(result['data3'][0][i][0]));
			mymap.addLayer(custompolygon2[i]);
		    custompolygon2[i].addTo(mymap);	

		}
var group = new L.featureGroup(custompolygon2);
mymap.fitBounds(group.getBounds());

		}
		else {

		}
		

}
	},
	error:function(result, textStatus, xhr){
		 	
	}
});
	}


function myfunc4(countryname,countrycode) {
  $.ajax({
	url: "lib/php/countryInfo.php",
	type: "POST",
	dataType: "json",
	data: {
		mycountryCode: countrycode
	},
	success: function(result, textStatus, xhr){
		if (xhr.status === 200) {
			document.getElementById("countryflag").style.display="block";
			document.getElementById("country1").innerHTML = "Country: " + countryname;	
			if(result['data']!== null && result['data']!==undefined) {
				document.getElementById("Capital1").innerHTML = "Capital: " + result['data'];	
			} 
			else {
			document.getElementById("Capital1").innerHTML = "Capital: No capital detected";	
			}
			if(result['data2']!== null && result['data2']!==undefined) {
			document.getElementById("population1").innerHTML = "Population: " + numberWithCommas(result['data2']);
			}
			else {
			document.getElementById("population1").innerHTML = "Population: No population detected";	
			}
		    if(result['data6']!== null && result['data6']!==undefined) {
				document.getElementById("countryflag").setAttribute("src",result['data6']);
			}
			else {
				document.getElementById("countryflag").setAttribute("src","imgs/noflag.png");
			}		
		
		var str1 = "";
		var str2 = "";
		var str3 = "";
			for(var i =0;i<result['data3'].length;i++){
				if(i <= 0) {
			if(result['data3'][i] != null && result['data3'][i] != undefined) {
					document.getElementById("Currency1").innerHTML = "Currency: "+result['data3'][i];
					str1 = "Currency: "+result['data3'][i];
				}
			}
				else {
				if(result['data3'][i] != null && result['data3'][i] != undefined) {
					document.getElementById("Currency1").innerHTML = document.getElementById("Currency1").innerHTML +", "+result['data3'][i];
					str1 = str1+", "+result['data3'][i];
				}
			}
			}
			if(str1 === "") {
					document.getElementById("Currency1").innerHTML = "Currency: No currency detected";	
			}
            for(var i =0;i<result['data4'].length;i++){
				if(i <= 0) {
				if(result['data4'][i] != null && result['data4'][i] != undefined) {
					document.getElementById("Language1").innerHTML = "Language: "+result['data4'][i];
					str2="Language: "+result['data4'][i];
				}
				//else no data found!
			}
				else {
				if(result['data4'][i] != null && result['data4'][i] != undefined) {
					document.getElementById("Language1").innerHTML = document.getElementById("Language1").innerHTML +", "+result['data4'][i];
					str2 = str2 +", "+result['data4'][i];
				}
			}
			}
						if(str2 === "") {
				document.getElementById("Language1").innerHTML = "Language: No language detected";	
			
			}
			   for(var i =0;i<result['data5'].length;i++){
				if(i <= 0) {
					if(result['data5'][i] != null && result['data5'][i] != undefined) {
					document.getElementById("CallingCode1").innerHTML = "Calling code: +"+result['data5'][i];
					str3 = "Calling code: +"+result['data5'][i];
				}
				}
				else {
					if(result['data5'][i] != null && result['data5'][i] != undefined) {
					document.getElementById("CallingCode1").innerHTML = document.getElementById("CallingCode1").innerHTML +", +"+result['data5'][i];
					str3 = str3 + ", +"+result['data5'][i];
				}
			}
			}
			}
						if(str3 === "") {
				document.getElementById("CallingCode1").innerHTML = "Calling code: No calling code detected";	
			
			}
		
	},
	error:function(result, textStatus, xhr){
					document.getElementById("country1").innerHTML = "Country: " + countryname;	
			document.getElementById("Capital1").innerHTML = "Capital: No capital detected";	
				document.getElementById("population1").innerHTML = "Population: No population detected";	
				document.getElementById("Currency1").innerHTML = "Currency: No currency detected";	
				document.getElementById("Language1").innerHTML = "Language: No language detected";	
				document.getElementById("CallingCode1").innerHTML = "Calling code: No calling code detected";	
				document.getElementById("countryflag").setAttribute("src","imgs/noflag.png");
	}
});

}

function myfunc5(lat,lng,countrycode) {
	    $.ajax({
	url: "lib/php/findNearbyArea.php",
	type: "POST",
	dataType: "json",
	data: {
		latitude: lat,
		longitude: lng
			},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
			var str = "";

			if(result['data'] == "") {
				str = "Not found!";
			var mynode = document.getElementById("weatherForecast");
                while (mynode.firstChild) {
                 mynode.removeChild(mynode.lastChild);
			var mynode2 = document.getElementById("CurrentWeatherInfo");
                mynode2.style.display="none";
			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="none";
			document.getElementById("countryflag").style.display="none";

                    }
			}
			else {
			if(result['data'][0]['adminName1'] !== ""  && result['data'][0]['adminName1'] !== undefined  && result['data'][0]['adminName1'] !== null ) {
				str = result['data'][0]['adminName1'];
			}
			if(result['data'][0]['adminName2'] !== ""&& result['data'][0]['adminName2'] !== undefined && result['data'][0]['adminName2'] !== null) {
				str = str+", "+result['data'][0]['adminName2'];
			}
            if(result['data'][0]['adminName3'] !== ""&& result['data'][0]['adminName3'] !== undefined && result['data'][0]['adminName3'] !== null) {
				str = str+", "+result['data'][0]['adminName3'];
			}
            if(result['data'][0]['adminName4'] !== ""&& result['data'][0]['adminName4'] !== undefined && result['data'][0]['adminName4'] !== null) {
				str = str+", "+result['data'][0]['adminName4'];
			}
			if(result['data'][0]['adminName5'] !== ""&& result['data'][0]['adminName5'] !== undefined && result['data'][0]['adminName5'] !== null) {
				str = str+", "+result['data'][0]['adminName5'];
			}
			if(str === "") {
				str = "Not found!";
			var mynode = document.getElementById("weatherForecast");
                while (mynode.firstChild) {
                 mynode.removeChild(mynode.lastChild);
                    }
             			var mynode2 = document.getElementById("CurrentWeatherInfo");
                mynode2.style.display="none";  
 			var mynode3 = document.getElementById("countryinformationdetailed");
                mynode3.style.display="none";    
			document.getElementById("countryflag").style.display="none";

			}

			myfunc6(result['data'][0]['adminName1'],result['data'][0]['adminName2'],result['data'][0]['adminName3'],result['data'][0]['adminName4'],result['data'][0]['adminName5'],countrycode);
		}

			document.getElementById("currentLocation").innerHTML = "Area: " + str;

		}
	},
	error:function(result, textStatus, xhr){
		 			document.getElementById("currentLocation").innerHTML = "Area: Not found!";

	}
});
}

function myfunc6(admin1,admin2,admin3,admin4,admin5,countrycode) {

   $.ajax({
	url: "lib/php/currentWeather.php",
	type: "POST",
	dataType: "json",
	data: {
		adminname1: admin1,
		adminname2: admin2,
		adminname3: admin3,
		adminname4: admin4,
		adminname5: admin5,
		countryCode: countrycode
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {

			if(result['data']['cod'] == 200) {
			var mynode = document.getElementById("CurrentWeatherInfo");
                mynode.style.display="block";
				document.getElementById("CurrentWeather").innerHTML = "Current weather: " + result['data']['main']['temp']+ ' &#8457;';
				document.getElementById("feelsLikeWeather").innerHTML = "Feels like: " +result['data']['main']['feels_like']+ ' &#8457;';
				document.getElementById("minWeather").innerHTML = "Min temp: " +result['data']['main']['temp_min']+ ' &#8457;';
				document.getElementById("maxWeather").innerHTML = "Max temp: " +result['data']['main']['temp_max']+ ' &#8457;';
				document.getElementById("WeatherDescription").innerHTML = "Weather description: " +result['data']['weather'][0]['description'];
				
				document.getElementById("humidity").innerHTML = "Humidity: " +result['data']['main']['humidity']+"%";
				document.getElementById("windspeed").innerHTML = "Wind speed: " +result['data']['wind']['speed']+ " mph";
				myfunc7(admin1,admin2,admin3,admin4,admin5,countrycode);

			}
			else {
			var mynode = document.getElementById("CurrentWeatherInfo");
                mynode.style.display="none";
                 myfunc7(admin1,admin2,admin3,admin4,admin5,countrycode);

			}
			
		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});
}


function myfunc7(admin1,admin2,admin3,admin4,admin5,countrycode) {
   $.ajax({
	url: "lib/php/weatherForecast.php",
	type: "POST",
	dataType: "json",
	data: {
		adminname1: admin1,
		adminname2: admin2,
		adminname3: admin3,
		adminname4: admin4,
		adminname5: admin5,
		countryCode: countrycode
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {

			if(result['data']['cod'] == 200) {
				var mintemparr = {};
				var avrhumidity = {};
				var windspeedavr = {};
				var allkeys = [];
				var allDates = [];
				var changeindate = 0;

				for(var i = 0; i < result['data']['list'].length;i++) {
                    var d = new Date(result['data']['list'][i]['dt_txt']);
                   allkeys.push(d.getDate().toString());
                   var monthdate = d.getMonth()+1;
                   allDates.push(d.getDate().toString()+"/"+monthdate);

                    if(i <= 0) {
                    	changeindate = d.getDate();
                    	mintemparr[d.getDate().toString()] = [result['data']['list'][i]['main']['temp_min'],result['data']['list'][i]['main']['temp_max']];
                        avrhumidity[d.getDate().toString()] = [result['data']['list'][i]['main']['humidity']];
                        windspeedavr[d.getDate().toString()] = [result['data']['list'][i]['wind']['speed']];

                    }
                    else if(d.getDate() !== changeindate) {
                    	changeindate = d.getDate();
                    	mintemparr[d.getDate().toString()] = [result['data']['list'][i]['main']['temp_min'],result['data']['list'][i]['main']['temp_max']];
                        avrhumidity[d.getDate().toString()] = [result['data']['list'][i]['main']['humidity']];
                        windspeedavr[d.getDate().toString()] = [result['data']['list'][i]['wind']['speed']];

                    }
                     else if(d.getDate() === changeindate) {
                     mintemparr[d.getDate().toString()].push(result['data']['list'][i]['main']['temp_min'],result['data']['list'][i]['main']['temp_max']);
                     avrhumidity[d.getDate().toString()].push(result['data']['list'][i]['main']['humidity']);
                     windspeedavr[d.getDate().toString()].push(result['data']['list'][i]['wind']['speed']);

                    }
				}

				var uniquekeys = allkeys.filter(onlyUnique);
				var uniquedates = allDates.filter(onlyUnique);
	             var mintmp = [];
				var maxtmp = [];
			    var arrhumidity = [];
				var windspeedarr = [];
				var humidityavrage = 0;
				var windspeedavrage = 0;
				uniquedates[0] = "Today";
				uniquedates[1] = "Tomorrow";

		

				for(var i = 0; i < uniquekeys.length;i++) {
					
                 Array.min = function( array ){
                    return Math.min.apply( Math, array );
                 };
                 Array.max = function( array ){
                    return Math.max.apply( Math, array );
                 };
                 var minimum = Array.min(mintemparr[uniquekeys[i]]);
                 var maximum = Array.max(mintemparr[uniquekeys[i]]);
                 mintmp.push(minimum);
                 maxtmp.push(maximum);
				}

				var counter20 = 0;
				var counter30 = 0;

			for(var i = 0; i < uniquekeys.length;i++) {
				if(i >0) {
				humidityavrage =  humidityavrage /avrhumidity[uniquekeys[counter20]].length;
				arrhumidity.push(Math.floor(humidityavrage));
				humidityavrage = 0;
				counter20++;
			}
				for(var j = 0; j < avrhumidity[uniquekeys[i]].length;j++) {

					humidityavrage = humidityavrage + avrhumidity[uniquekeys[i]][j];
				}
			}

			for(var i = 0; i < uniquekeys.length;i++) {
				if(i >0) {
				windspeedavrage =  windspeedavrage /windspeedavr[uniquekeys[counter30]].length;
				windspeedarr.push(Math.floor(windspeedavrage));
				windspeedavrage = 0;
				counter30++;
			}
				for(var j = 0; j < windspeedavr[uniquekeys[i]].length;j++) {

					windspeedavrage = windspeedavrage + windspeedavr[uniquekeys[i]][j];
				}
			}
			var mynode = document.getElementById("weatherForecast");
                while (mynode.firstChild) {
                 mynode.removeChild(mynode.lastChild);
                    }

         var fbrace = document.createElement("br");
     mynode.appendChild(fbrace);

       var header = document.createElement("h1");
    header.innerHTML = "Weather forecast";
     mynode.appendChild(header);

			for(var i = 0; i < windspeedarr.length;i++) {
					var para1 = document.createElement("p");
					var para3 = document.createElement("p");
					var para4 = document.createElement("p");
					var para5 = document.createElement("p");
					var para6 = document.createElement("p");


					var brace = document.createElement("br");
					var forecastDiv = document.getElementById("weatherForecast");
                    var customdiv = document.createElement("div");
                    var customdiv2 = document.createElement("div");
                    var icon = document.createElement("i");
                     var icon2 = document.createElement("i");
                    var brace = document.createElement("br");
                    var brace2 = document.createElement("br");

                    brace.setAttribute("id","mybrace");
                    customdiv.setAttribute("id","customdiv");

					para1.innerHTML = uniquedates[i];
					para3.innerHTML = mintmp[i] + ' &#8457;';
				    para4.innerHTML = maxtmp[i] + ' &#8457;';
				    para3.style.marginTop="-17px";
				    para5.innerHTML = arrhumidity[i]+"%";
				    para5.style.display = "inline-block";
				    para6.style.display = "inline-block";
				    para6.style.marginTop="-7px";

				    icon.setAttribute("aria-hidden",true);
				    icon.setAttribute("class","fas fa-burn");
				    icon2.setAttribute("aria-hidden",true);
				    icon2.setAttribute("class","fas fa-wind");
				    icon2.style.marginLeft = "10px";
				    para5.style.marginLeft = "5px";
				    para6.style.marginLeft = "5px";

				    para6.innerHTML = windspeedarr[i]+ " mph";
				    para4.style.fontWeight="bold";
					forecastDiv.appendChild(customdiv);
				    customdiv.appendChild(brace2);

				    customdiv.appendChild(para1);
				    customdiv.appendChild(para4);
					customdiv.appendChild(para3);
					customdiv.appendChild(icon);
					customdiv.appendChild(para5);
					customdiv.appendChild(brace);
			             customdiv.appendChild(icon2);
					customdiv.appendChild(para6);
			}

		}
			else {
						var mynode = document.getElementById("weatherForecast");
                while (mynode.firstChild) {
                 mynode.removeChild(mynode.lastChild);
                    }

		}
			
		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});
}


function myfunc8(countryname) {
   $.ajax({
	url: "lib/php/currencyExchange.php",
	type: "POST",
	dataType: "json",
	data: {
		countryName: countryname
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
			var currencycode = "";
			for(var i = 0; i < result['data'].length;i++) {
				if(result['data'][i]['country'] === countryname) {
					currencycode = result['data'][i]['currency_code'];
					break;
				}
			}
	var para2 = document.createElement("p");
	var input2 = document.createElement("input");
	input2.setAttribute("type","number");
	input2.setAttribute("min","1");
	input2.setAttribute("value","1");
	input2.setAttribute("id","inputCurrency");
	input2.setAttribute("onchange","inputOnChange(this)");
	para2.style.display="inline";
	para2.setAttribute("id","currencyoutput");
	var mynode = document.getElementById("CurrencyExchange");
     while (mynode.firstChild) {
        mynode.removeChild(mynode.lastChild);
           }
    var header = document.createElement("h1");
    header.innerHTML = "Currency exchange";
   
     mynode.appendChild(header);
     $.get('https://openexchangerates.org/api/latest.json', {app_id: '0006eb5f1c2c495b8306bfa0b6372f17'}, function(data) {
     storerate = data['rates'][currencycode];
     storecurrencycode = currencycode;
     storerate = (Math.round(storerate * 100) / 100).toFixed(2);
     if(isNaN(storerate)) {
 	para2.innerHTML = "No currency found!";
     	mynode.appendChild(para2);

     }
     else {
 	para2.innerHTML = " [USD] = " + storerate + " ["+currencycode+"]";
     	storerate = data['rates'][currencycode] * input2.value;
     	mynode.appendChild(input2);
     	mynode.appendChild(para2);
     }
    
      });

 



		}
	},
	error:function(result, textStatus, xhr){
		  	para2.innerHTML = "No currency found!";

	}
});
}

function inputOnChange(obj) {
	var storerate2 = storerate * obj.value;
    storerate2 = (Math.round(storerate2 * 100) / 100).toFixed(2);
    document.getElementById("currencyoutput").innerHTML = " [USD] = " + storerate2 + " ["+storecurrencycode+"]";

}


function myfunc9(lat,lng) {
	     $.ajax({
	url: "lib/php/WikipediaLinks.php",
	type: "POST",
	dataType: "json",
	data: {
		latitude: lat,
		longitude: lng
	},
	success: function(result, textStatus, xhr){
			
		if (xhr.status === 200) {
			var mynode = document.getElementById("WikipediaLinks");
            while (mynode.firstChild) {
                 mynode.removeChild(mynode.lastChild);
                    };
       var header = document.createElement("h1");
    header.innerHTML = "Related links";
         var fbrace = document.createElement("br");
     mynode.appendChild(fbrace);    
     mynode.appendChild(header);


     for(var i = 0; i < result['data'].length;i++) {
     	      var customdiv3 = document.createElement("div");
      customdiv3.setAttribute("class","d-flex w-100 justify-content-between");
      customdiv3.setAttribute("id","linkheader");
      var customheader = document.createElement("h5");
      var brace3 = document.createElement("br");
      var brace4 = document.createElement("br");

      customheader.setAttribute("class","mb-1");
      var customanchor =document.createElement("a");
      var custompara =document.createElement("p");
      custompara.setAttribute("class","mb-1");

					customheader.innerHTML = result['data'][i]['title'];
					custompara.innerHTML = result['data'][i]['summary'];
					customanchor.setAttribute('href',"https://"+result['data'][i]['wikipediaUrl']);
             customanchor.target = "_blank";
					customanchor.innerText = "Visit";

					mynode.appendChild(customdiv3);
					customdiv3.appendChild(customheader);
					mynode.appendChild(custompara);
					mynode.appendChild(customanchor);
					mynode.appendChild(brace3);
					mynode.appendChild(brace4);


     }
		}
	},
	error:function(result, textStatus, xhr){
		 
	}
});
}

function myfunc10(lat,lng) {
    $.ajax({
	url: "lib/php/nearbyStreets.php",
	type: "POST",
	dataType: "json",
	data: {
		latitude: lat,
		longitude: lng
	},
	success: function(result, textStatus, xhr){
		if (xhr.status === 200) {
			if(result['data'].hasOwnProperty('streetSegment')) {
				if(result['data']['streetSegment']!= undefined) {
			var streetarr = [];
			var polylinearr = [];
			for(var i = 0; i < result['data']['streetSegment'].length;i++) {
				if(i < 4) {
				if(result['data']['streetSegment'][i]['name'] !== "" || result['data']['streetSegment'][i]['name'] !== null || result['data']['streetSegment'][i]['name'] !== undefined ) {
				streetarr[i] = result['data']['streetSegment'][i]['name'];
			}
				if(result['data']['streetSegment'][i]['line'] !== "" || result['data']['streetSegment'][i]['line'] !== null || result['data']['streetSegment'][i]['line'] !== undefined ) {			
				polylinearr[i] = result['data']['streetSegment'][i]['line'];
			}
		}
		else {
			break;
		}
			}
	     var uniquestreetarr = streetarr.filter(onlyUnique);
	     var str2 = "";
	     for(var i = 0; i < uniquestreetarr.length;i++) {
	     	if(i > 0) {
	     	str2 = str2+", " + uniquestreetarr[i];
	     	}
	     	else {
	     	str2 = str2 + uniquestreetarr[i];
	     	}
	     }
	     var str3 = "";
	      var latlng = {};

	     for(var i = 0; i < polylinearr.length;i++) {
	     	latlng[i] = [];
	     	for(var j = 0; j < polylinearr[i].length;j++) {

	     		if(j === polylinearr[i].length-1) {
	     			str3 = str3+polylinearr[i][j];	     			
	     			latlng[i].push(parseFloat(str3))
	     			str3 = "";
	     		}
	     		else if(polylinearr[i][j] === " ") {
	     		    latlng[i].push(parseFloat(str3))
	     			str3 = "";
	     		}
	     		else if(polylinearr[i][j] === ",") {
	     			latlng[i].push(parseFloat(str3))	     			
	     			str3 = "";
	     		}
	     		else {
	     			str3 = str3+polylinearr[i][j];
	     		}
	     	}
	     }

	     var latlng2 = [];

	     for(var i =0; i < polylinearr.length;i++) {
	     	if(i > 0) {
	     	custompolyline.push(new L.polyline(latlng2, {color: 'red'}));
	     	mymap.addLayer(custompolyline[custompolyline.length-1]);
	     	custompolyline[custompolyline.length-1].addTo(mymap);
	     	latlng2 = [];
	     	}
	     	for(var j = 0; j < latlng[i].length;j = j + 2) {

	     		latlng2.push([latlng[i][j+1],latlng[i][j]]);

	     	}
	     }
	     if(str2==="") {
	     document.getElementById("nearByStreets").innerHTML = "Nearby streets: No nearby streets";
	     }
	     else {
	     document.getElementById("nearByStreets").innerHTML = "Nearby streets: " + str2;
	 }
	 }
	 else {
	 	 document.getElementById("nearByStreets").innerHTML = "Nearby streets: No nearby streets";

	 }
	}
	 else {
        document.getElementById("nearByStreets").innerHTML = "Nearby streets: No nearby streets";

	 }


		}
	},
	error:function(result, textStatus, xhr){
		         document.getElementById("nearByStreets").innerHTML = "Nearby streets: No nearby streets";

	}
});
}






function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

	mymap.on('click', onMapClick);